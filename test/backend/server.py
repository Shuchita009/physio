from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from bson import ObjectId # Import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'physio_app')]

# Helpers
def _convert_object_ids(value):
    """Recursively convert any bson ObjectId instances to strings."""
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, list):
        return [_convert_object_ids(item) for item in value]
    if isinstance(value, dict):
        return {key: _convert_object_ids(val) for key, val in value.items()}
    return value

def serialize_mongo_document(document: dict) -> dict:
    """Return a copy of the Mongo document safe for JSON: set id, drop _id, stringify ObjectIds."""
    if not document:
        return document
    safe_doc = _convert_object_ids(document.copy())
    if "_id" in safe_doc:
        safe_doc["id"] = safe_doc["_id"]
        safe_doc.pop("_id", None)
    return safe_doc

# Models
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    duration: str
    price: str
    features: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Testimonial(BaseModel):
    id: str = Field(alias="_id", default_factory=lambda: str(uuid.uuid4())) # Change to str and alias _id
    name: str
    sport: str
    achievement: str
    rating: int
    comment: str
    image: str
    isApproved: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

class TestimonialCreate(BaseModel):
    name: str
    sport: str
    achievement: str
    rating: int
    comment: str
    image: str = ""

class AppointmentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: Optional[str] = ""
    preferredDate: Optional[str] = ""
    message: Optional[str] = ""

class Appointment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    preferredDate: str
    message: str
    status: str = "pending"
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str
    subject: Optional[str] = "General Inquiry"

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    subject: str
    isRead: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class DoctorInfo(BaseModel):
    name: str
    title: str
    organization: str
    phone: str
    email: str
    location: str
    experience: str
    patientsHelped: str
    recoveryRate: str

# Initialize FastAPI app
app = FastAPI(
    title="Physiotherapy Services API",
    description="API for managing physiotherapy services, appointments, and contacts",
    version="1.0.0"
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

# Configure CORS from environment
allowed_origins_env = os.environ.get("ALLOWED_ORIGINS", "*")
if allowed_origins_env.strip() == "*":
    cors_allow_origins = ["*"]
else:
    cors_allow_origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize router
router = APIRouter()

# API endpoints
@router.get("/services", response_model=List[Service])
async def get_services():
    try:
        services = await db.services.find().to_list(None)
        # Remove Mongo's _id to avoid leaking ObjectId in responses
        return [serialize_mongo_document(service) for service in services]
    except Exception as e:
        logging.error(f"Error fetching services: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch services")

@router.get("/services/{service_id}", response_model=Service)
async def get_service(service_id: str):
    try:
        service = await db.services.find_one({"id": service_id})
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        return serialize_mongo_document(service)
    except Exception as e:
        logging.error(f"Error fetching service {service_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch service")

# Health
@router.get("/", include_in_schema=False)
async def health():
    return {"status": "ok"}

# Testimonials
@router.get("/testimonials", response_model=dict)
async def get_testimonials():
    try:
        testimonials_cursor = db.testimonials.find({"isApproved": True}).sort("createdAt", -1)
        testimonials = []
        async for doc in testimonials_cursor:
            testimonials.append(serialize_mongo_document(doc))
        return {"testimonials": testimonials}
    except Exception as e:
        logging.error(f"Error fetching testimonials: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")

@router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(payload: TestimonialCreate):
    try:
        testimonial_data = payload.dict()
        # MongoDB automatically adds _id, we can remove 'id' if it was generated by Pydantic's default_factory
        if "id" in testimonial_data: # If id was generated by Pydantic, remove it so MongoDB creates _id
            del testimonial_data["id"]
        result = await db.testimonials.insert_one(testimonial_data)
        # Fetch the created document to ensure it has _id, then convert _id to id string
        created_testimonial_doc = await db.testimonials.find_one({"_id": result.inserted_id})
        if created_testimonial_doc:
            # Keep alias key _id but ensure it's a string for Pydantic to accept
            created = created_testimonial_doc.copy()
            created["_id"] = str(created["_id"])  # stringify ObjectId
            return Testimonial(**created)
        raise HTTPException(status_code=500, detail="Failed to retrieve created testimonial")
    except Exception as e:
        logging.error(f"Error creating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Failed to create testimonial")

# Appointments
@router.post("/appointments", response_model=Appointment)
async def create_appointment(payload: AppointmentCreate):
    try:
        appointment = Appointment(**payload.dict())
        await db.appointments.insert_one(appointment.dict())
        return appointment
    except Exception as e:
        logging.error(f"Error creating appointment: {e}")
        raise HTTPException(status_code=500, detail="Failed to create appointment")

# Contact
@router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    try:
        contact = Contact(**payload.dict())
        await db.contacts.insert_one(contact.dict())
        return contact
    except Exception as e:
        logging.error(f"Error creating contact: {e}")
        raise HTTPException(status_code=500, detail="Failed to create contact")

# Doctor Info
@router.get("/doctor-info", response_model=dict)
async def get_doctor_info():
    try:
        doc = await db.doctor_info.find_one({})
        if not doc:
            default = DoctorInfo(
                name="Dr. Siddharth Sakalle",
                title="Ortho & Sports Physiotherapist",
                organization="",
                phone="",
                email="",
                location="",
                experience="",
                patientsHelped="",
                recoveryRate="",
            )
            return {"doctorInfo": default.dict()}
        return {"doctorInfo": serialize_mongo_document(doc)}
    except Exception as e:
        logging.error(f"Error fetching doctor info: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch doctor info")

# Sample data for testing
SAMPLE_SERVICES = [
    {
        "id": str(uuid.uuid4()),
        "title": "Sports Rehabilitation",
        "description": "Comprehensive rehabilitation program for athletes",
        # "duration": "60 min",
        # "price": "₹2000",
        "features": [
            "Initial Assessment",
            "Personalized Treatment Plan",
            "Progress Tracking",
            "Home Exercise Program"
        ]
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Orthopedic Rehabitation",
        "description": "Treatment for orthopedic conditions and injuries",

        "features": [
            "Physical Assessment",
            "Manual Therapy",
            "Exercise Prescription",
            "Recovery Tips"
        ]
    }
]

# Initialize database with sample data
@app.on_event("startup")
async def init_db():
    if await db.services.count_documents({}) == 0:
        await db.services.insert_many(SAMPLE_SERVICES)
    if await db.testimonials.count_documents({}) == 0:
        await db.testimonials.insert_many([
            {
                "id": str(uuid.uuid4()),
                "name": "R S",
                "sport": "Cricket",
                "achievement": "Satisfied Client",
                "rating": 5,
                "comment": "The ergonomic consultation and movement analysis significantly improved my performance.",
                "image": "",
                "isApproved": True,
                "createdAt": datetime.utcnow(),
            },
            {
                "id": str(uuid.uuid4()),
                "name": "P",
                "sport": "Tennis",
                "achievement": "Satisfied Client",
                "rating": 5,
                "comment": "Post-surgical rehab helped me return stronger after my shoulder surgery.",
                "image": "",
                "isApproved": True,
                "createdAt": datetime.utcnow(),
            },
        ])

# Include router
app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    import socket
    
    def find_free_port(start_port, max_attempts=10):
        for port in range(start_port, start_port + max_attempts):
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            try:
                sock.bind(('0.0.0.0', port))
                sock.close()
                return port
            except OSError:
                sock.close()
                continue
        raise RuntimeError(f"Could not find a free port in range {start_port}-{start_port + max_attempts}")

    try:
        port = find_free_port(5000)
        print(f"Server starting on port {port}")
        uvicorn.run(app, host="127.0.0.1", port=port)
    except Exception as e:
        print(f"Failed to start server: {e}")