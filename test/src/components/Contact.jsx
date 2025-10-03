import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from '../utils/toast';
import { MapPin, Phone, Mail, Clock, Send, Linkedin, Instagram, Facebook } from 'lucide-react';
import { contactInfo } from '../mock';
import { appointmentsAPI, servicesAPI } from '../services/api';

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

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Get in Touch
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Book Your
            <span className="text-blue-600 block">Consultation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start your journey to optimal health and performance? Schedule a consultation 
            with Dr. S S today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Clinic Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium text-gray-900">{contactInfo.address.clinic}</p>
                <p className="text-gray-600">{contactInfo.address.street}</p>
                <p className="text-gray-600">
                  {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.pincode}
                </p>
                <p className="text-gray-600">{contactInfo.address.country}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <span>Contact Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">dr.siddharth@example.com</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span>Working Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Mon - Fri:</span>
                  <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                  <span className="text-gray-600">Saturday:</span>
                  <span className="text-gray-900 font-medium">9:00 AM - 2:00 PM</span>
                  <span className="text-gray-600">Sunday:</span>
                  <span className="text-gray-900 font-medium">Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center mb-2">
                  Schedule Your Appointment
                </CardTitle>
                <p className="text-gray-600 text-center">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Service Required</label>
                      <Select onValueChange={handleServiceChange} value={formData.service} disabled={servicesLoading}>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder={servicesLoading ? "Loading services..." : "Select a service"} />
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Preferred Date</label>
                    <Input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your condition, symptoms, or specific requirements..."
                      rows={4}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Appointment Request'}</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 text-center">
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
        </div>
      </div>
      <footer style={{background:'#181f2a',color:'#e5e7eb',padding:'40px 0 0 0',marginTop:40}}>
        <div className="container" style={{maxWidth:900,margin:'0 auto',padding:'0 16px'}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:40,justifyContent:'space-between'}}>
            <div style={{minWidth:260,flex:1}}>
              <div style={{fontWeight:700,fontSize:20,marginBottom:18}}>Contact Information</div>
              <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:8}}>
                <MapPin style={{marginTop:2}}/>
                <div>
                  <div style={{fontWeight:700}}>Sports Physiotherapy Center</div>
                  <div>123 Medical Complex, Bandra West<br/>Mumbai, Maharashtra<br/>400050</div>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <Phone/>
                <span>+91 98765 43210</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
                <Mail/>
                <span>dr.siddharth@example.com</span>
              </div>
              <div style={{fontWeight:700,marginBottom:6}}>Working Hours</div>
              <div style={{display:'flex',gap:32}}>
                <div>
                  <div>Mon - Fri:</div>
                  <div>Saturday:</div>
                  <div>Sunday:</div>
                </div>
                <div>
                  <div>9:00 AM - 6:00 PM</div>
                  <div>9:00 AM - 2:00 PM</div>
                  <div>Closed</div>
                </div>
              </div>
            </div>
            <div style={{minWidth:220,flex:1}}>
              <div style={{fontWeight:700,fontSize:20,marginBottom:18}}>Quick Links</div>
              <div style={{marginBottom:12}}>
                <div><a href="#about" style={{color:'#e5e7eb',textDecoration:'none'}}>About Doctor</a></div>
                <div><a href="#services" style={{color:'#e5e7eb',textDecoration:'none'}}>Services</a></div>
                <div><a href="#testimonials" style={{color:'#e5e7eb',textDecoration:'none'}}>Testimonials</a></div>
                <div><a href="#contact" style={{color:'#e5e7eb',textDecoration:'none'}}>Book Appointment</a></div>
              </div>
              <div style={{fontWeight:700,marginBottom:6}}>Specializations</div>
              <div style={{color:'#b6bbc6'}}>
                <div>Sports Rehabilitation</div>
                <div>Manual Therapy</div>
                <div>Musculoskeletal Therapy</div>
                <div>Performance Optimization</div>
              </div>
            </div>
          </div>
          <hr style={{border:'none',borderTop:'1px solid #232b39',margin:'32px 0 18px 0'}}/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
            <div style={{fontSize:14}}>
              © 2025 Dr. S S. All rights reserved.<br/>
              Trusted by Olympic athletes and sports champions worldwide.
            </div>
            <div style={{display:'flex',gap:12}}>
              <a href="#" style={{background:'#232b39',borderRadius:8,padding:8,display:'inline-flex'}}><Linkedin/></a>
              <a href="#" style={{background:'#232b39',borderRadius:8,padding:8,display:'inline-flex'}}><Instagram/></a>
              <a href="#" style={{background:'#232b39',borderRadius:8,padding:8,display:'inline-flex'}}><Facebook/></a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
