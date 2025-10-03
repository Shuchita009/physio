import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, IndianRupee, CheckCircle } from 'lucide-react';
import { servicesAPI } from '../services/api';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await servicesAPI.getAll();
        setServices(servicesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
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

  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">
            Professional Services
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Specialized
            <span className="text-teal-600 block">Physiotherapy Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Evidence-based treatments tailored for athletes and individuals seeking optimal physical performance and recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {service.duration}
                  </Badge>
                  <div className="flex items-center text-teal-600 font-semibold">
                    <IndianRupee className="w-4 h-4" />
                    <span className="text-sm">{service.price.replace('₹', '')}</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-teal-600 transition-colors duration-200">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
                <p className="text-gray-600 text-sm">Easy appointment booking with flexible timing to suit your schedule</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Evidence-Based Care</h4>
                <p className="text-gray-600 text-sm">Treatment protocols based on latest research and international standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="w-8 h-8 bg-yellow-500 text-white border-0 rounded-full flex items-center justify-center">
                    ⭐
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Elite Experience</h4>
                <p className="text-gray-600 text-sm">Trusted by Olympic athletes and professional sports organizations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
