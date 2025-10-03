const DEFAULT_BACKEND_URL = "https://physio-backend-production-1a1b.up.railway.app";
const BACKEND_URL =
  (process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.trim() !== ""
    ? process.env.REACT_APP_BACKEND_URL
    : DEFAULT_BACKEND_URL);
const API = `${BACKEND_URL}/api`;

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Services API
export const servicesAPI = {
  getAll: async () => {
    try {
      const services = await apiRequest('/services');
      return services;
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const service = await apiRequest(`/services/${id}`);
      return service;
    } catch (error) {
      console.error(`Failed to fetch service with id ${id}:`, error);
      throw error;
    }
  },
};

// Testimonials API  
export const testimonialsAPI = {
  getAll: async () => {
    const data = await apiRequest('/testimonials');
    return data.testimonials || [];
  },
};

// Appointments API
export const appointmentsAPI = {
  create: async (appointmentData) => {
    return await apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },
};

// Contact API
export const contactAPI = {
  create: async (contactData) => {
    return await apiRequest('/contact', {
      method: 'POST', 
      body: JSON.stringify(contactData),
    });
  },
};

// Doctor Info API
export const doctorAPI = {
  getInfo: async () => {
    const data = await apiRequest('/doctor-info');
    return data.doctorInfo || {};
  },
};

// Health check API
export const healthAPI = {
  check: async () => {
    try {
      const response = await apiRequest('/');
      return response;
    } catch (error) {
      return { message: 'API connection failed' };
    }
  },
};
