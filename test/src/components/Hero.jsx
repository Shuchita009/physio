import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { contactInfo } from '../mock';
import { sendWhatsAppMessage } from '../utils/communication';
import { CheckCircle, GraduationCap, Users, Star } from 'lucide-react';

export const Hero = () => {
  const handleBookConsultation = () => {
    const message = "Dear Dr. SS, I would like to book a consultation. Please contact me to schedule an appointment.";
    sendWhatsAppMessage(contactInfo.phone, message);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-left">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Elite Sports <span className="text-blue-600">Physiotherapy</span> Excellence
        </h1>
        <p className="text-gray-700 max-w-3xl mb-8" style={{ maxWidth: 720, margin: '12px auto 0', color: '#374151', fontSize: '14px', lineHeight: 1.35, textAlign: 'justify' }}>
          Trusted by Olympic athletes and sports champions. Specialized in Manual Physio therapy, Musculoskeletal Rehabilitation, and Sports Injury recovery with international expertise.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <h4 className="font-semibold text-gray-900 flex items-center gap-4 mt-6 mb-3" style={{ fontSize: '14px', lineHeight: 1.35 }}>
          <span>🎓 MPT Australia | Sports & Ortho</span>
        </h4>
        <h4 className="font-semibold text-gray-900 flex items-center gap-4 mt-6 mb-3" style={{ fontSize: '14px', lineHeight: 1.35 }}>
          <span>👥 Elite Athletes | Olympic & National</span>
        </h4>
        <h4 className="font-semibold text-gray-900 flex items-center gap-4 mt-6 mb-3" style={{ fontSize: '14px', lineHeight: 1.35 }}>
          <span>🌟 20+ Years | Sports and Ortho Experience</span>
        </h4>  
        </div>

        <ul className="space-y-3 mb-10 list-none">
          <li className="flex items-center text-gray-700" style={{ fontSize: '14px', lineHeight: 1.35 }}>
            Worked with Saina Nehwal, Lakshya Sen and MC Mary Kom
          </li>

          <li className="flex items-center text-gray-700" style={{ fontSize: '14px', lineHeight: 1.35 }}>
            Provided Physio care across Clinics, Hospital and Sports clubs in Australia
          </li>
                    <li className="flex items-center text-gray-700" style={{ fontSize: '14px', lineHeight: 1.35 }}>
            Certified in Ergonomics from USA
          </li>
        </ul>

        <div className="flex space-x-4 mb-8">
          <Button
            className="bg-blue-700 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            onClick={handleBookConsultation}
          >
            Book Consultation
          </Button>
         <p></p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


