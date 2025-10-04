import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Star, Send } from 'lucide-react';
import { testimonialsAPI } from '../services/api';
import { toast } from '../utils/toast';

export const AddTestimonial = ({ onTestimonialAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    rating: 0,
    comment: '',
    achievement: 'Satisfied Client', // Default for now
    image: '' // Optional
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sport || formData.rating === 0 || !formData.comment) {
      toast.error('Please fill in all required fields (Name, Sport, Rating, Comment)');
      return;
    }

    setIsSubmitting(true);
    try {
      await testimonialsAPI.create(formData);
      toast.success('Thank you for your testimonial! It will be reviewed shortly.');
      setFormData({
        name: '',
        sport: '',
        rating: 0,
        comment: '',
        achievement: 'Satisfied Client',
        image: ''
      });
      if (onTestimonialAdded) {
        onTestimonialAdded(); // Callback to refresh testimonials if needed
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Share Your Experience</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700" style={{ fontSize: '16px', marginBottom: '8px' }}>Name </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Full Name"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {/* <div>
          <label htmlFor="sport" className="block text-sm font-medium text-gray-700" >Your Sport/Activity </label>
          <Input
            type="text"
            id="sport"
            name="sport"
            value={formData.sport}
            onChange={handleInputChange}
            placeholder="e.g., Running, Weightlifting, Daily Life"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating </label>
     
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="cursor-pointer transition-colors duration-200"
                size={16}
                fill={star <= (hoverRating || formData.rating) ? '#f59e0b' : 'none'}
                stroke={star <= (hoverRating || formData.rating) ? '#f59e0b' : '#d1d5db'}
                onClick={() => handleRatingChange(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Testimonial </label>
          <p>
          <Textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Share your experience with Dr. SS..."
            rows={4}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          /> </p>
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Send className="w-2 h-2" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Testimonial'}</span>
        </Button>
      </form>
    </div>
  );
};

export default AddTestimonial;
