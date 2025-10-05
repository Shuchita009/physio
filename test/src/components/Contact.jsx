import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from '../utils/toast';
// Icons removed from this file; footer moved to ContactInfo component
import { appointmentsAPI, servicesAPI } from '../services/api';
// Set the clinic/doctor WhatsApp phone number in international format without + or leading zeros, e.g. '919876543210'
const WHATSAPP_PHONE = '919592948779';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    message: ''
  });

  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const servicesData = await servicesAPI.getAll();
        setServices(servicesData);
      } catch (err) {
        console.error('Error fetching services:', err);
        toast.error('Failed to load services for selection');
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await appointmentsAPI.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        preferredDate: formData.preferredDate,
        message: formData.message
      });

      if (response.success) {
        toast.success(response.message || 'Appointment request sent successfully! Dr. Siddharth will contact you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          preferredDate: '',
          message: ''
        });
      } else {
        toast.error(response.error || 'Failed to submit appointment request');
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast.error('Failed to submit appointment request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppMessage = (data) => {
    const lines = [
      'Appointment Request from website',
      `Name: ${data.name || '-'}`,
      `Phone: ${data.phone || '-'}`,
      `Email: ${data.email || '-'}`,
      `Service: ${data.service || '-'}`,
      `Preferred Date: ${data.preferredDate || '-'}`,
      `Message: ${data.message || '-'}`,
    ];

    // Join with new lines and URL-encode
    return encodeURIComponent(lines.join('\n'));
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error('Please provide at least your name and phone number to send via WhatsApp');
      return;
    }

    // basic email pattern check if email provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please provide a valid email address');
      return;
    }

    const dataForMessage = {
      ...formData,
      service: formData.service || '-',
    };

    const encoded = buildWhatsAppMessage(dataForMessage);
    // Use wa.me for mobile and whatsapp web fallback
    const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;

    // Open in new tab/window
    window.open(waLink, '_blank');
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            
            <span className="text-blue-600 block">Book Your Consultation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start your journey to optimal health and performance? Schedule a consultation 
            with Dr. S S today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
       
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              {/* <CardHeader>
                <CardTitle className="text-2xl text-center mb-2">
                  Schedule Your Appointment
                </CardTitle>
                <p className="text-gray-600 text-center">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </CardHeader> */}
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-base font-semibold text-gray-900">Full Name </label>
<div>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                      /></div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-base font-semibold text-gray-900">Phone Number </label>
                      <div>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                      /></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-base font-semibold text-gray-900">Service </label>
                      <Select onValueChange={handleServiceChange} value={formData.service} disabled={servicesLoading} className="flex-1">
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm">
                          {/* <SelectValue placeholder={servicesLoading ? "Loading services..." : "Select service type"} /> */}
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.title}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <label className="block text-base font-semibold text-gray-900 mb-2">Preferred Date</label>
                    <div>
                    <Input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="h-12 px-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg bg-white"
                    /></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <p>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your condition, symptoms, or specific requirements..."
                      rows={4}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button
                      type="button"
                      size="lg"
                      onClick={handleWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span> Send Appointment on WhatsApp</span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        {/* <div className="mt-16 text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Emergency Sports Injuries?
            </h3>
            <p className="text-red-700 mb-4">
              For urgent sports injuries requiring immediate attention, call our emergency line:
            </p>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              <Phone className="w-4 h-4 mr-2" />
              Emergency: +91 98765 43211
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
};
