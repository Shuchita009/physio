import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, IndianRupee, CheckCircle } from 'lucide-react';
import { servicesAPI } from '../services/api';
import { services as mockServices, contactInfo } from '../mock';
import { sendWhatsAppMessage } from '../utils/communication';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await servicesAPI.getAll();
        const data = Array.isArray(servicesData) && servicesData.length > 0 ? servicesData : mockServices;
        setServices(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setServices(mockServices);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <Button 
              className="mt-4" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const handleBookService = (serviceTitle) => {
    const message = `Dear Dr. SS, I am interested in the ${serviceTitle} service. Please contact me to discuss this further and schedule an appointment.`;
    sendWhatsAppMessage(contactInfo.phone, message);
  };

  return (
    <section
      id="services"
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50"
      style={{ paddingTop: '8px', paddingBottom: '24px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8" style={{ marginBottom: '8px' }}>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            
            <span className="text-teal-600 block">Specialized Physiotherapy Services</span>
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontSize: '14px', lineHeight: 1.35, marginTop:2 }}
          >
            Evidence-based treatments tailored for athletes and individuals seeking optimal physical performance and recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md">
                <CardContent className="space-y-3 p-4" style={{ padding: 2 }}>
                  <CardTitle className="text-lg font-bold mb-1 group-hover:text-teal-600 transition-colors duration-200" style={{ fontSize: '14px', lineHeight: 2, marginTop: 6 ,marginBottom: 2}}>
                    {service.title}
                  </CardTitle>
                  <div className="text-gray-600" style={{ fontSize: '14px', lineHeight: 1.35 }}>
                    {service.description}
                  </div>
                
                <div className="space-y-1">
                  <h4 className="font-semibold text-gray-900 flex items-center" style={{ fontSize: '14px', lineHeight: 2, marginTop: 5 ,marginBottom: 0}}>
                    What's Included:
                  </h4>
                  <ul className="list-disc pl-5" style={{ marginTop: 1 }}>
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600"
                        style={{ marginBottom: 0, fontSize: '14px' }}
                      >
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
                  style={{ paddingTop: 8, paddingBottom: 8, marginTop: 8 }}
                  onClick={() => handleBookService(service.title)}
                >
                  Book This Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h3>
              <div className="font-semibold text-gray-900 flex items-center gap-4 mt-6 mb-3" >
                <h4>⏰ Flexible Scheduling</h4>
                <p className="text-gray-600 text-sm" >Easy appointment booking with flexible timing to suit your schedule</p>       
              </div>

              <div className="font-semibold text-gray-900 flex items-center gap-4 mt-6 mb-3">
                <h4>✅	Evidence-Based Care</h4>
                <p className="text-gray-600 text-sm">Treatment protocols based on latest research and international standards</p>       
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <h4>⭐ Elite Experience</h4>
                </div>
                <p className="text-gray-600 text-sm">Trusted by Olympic athletes and professional sports organizations</p>
              </div>
            </div>
          </div>
        </div>

    </section>
  );
};

export default Services;
