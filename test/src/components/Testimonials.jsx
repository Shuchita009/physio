import React, { useEffect, useState, useCallback } from 'react';
// import { Card, CardContent } from './ui/card'; // Removed as no longer directly used in simplified rendering
// import { Badge } from './ui/badge'; // Removed as no longer directly used in simplified rendering
// import { Button } from './ui/button'; // Removed as no longer directly used in simplified rendering
import { Star } from 'lucide-react'; // Keep Star for rating in AddTestimonial
// import { Quote } from 'lucide-react'; // Removed as no longer directly used
import { testimonialsAPI } from '../services/api';
import { testimonials as mockTestimonials } from '../mock';
import { AddTestimonial } from './AddTestimonial';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const data = await testimonialsAPI.getAll();
      // Ensure data.testimonials is an array, otherwise fallback to mockTestimonials
      const list = Array.isArray(data.testimonials) && data.testimonials.length > 0 ? data.testimonials : mockTestimonials;
      setTestimonials(list);
      setError(null);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setTestimonials(mockTestimonials);
      setError('Failed to load testimonials. Showing mock data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const renderStars = (rating) => (
    Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} style={{ color: i < rating ? '#f59e0b' : '#e6eaf2', marginRight: 4 }} />
    ))
  );

  return (
    <section className="section-card" style={{marginTop:18, padding: '20px', maxWidth: '800px', margin: '18px auto'}}>
      <h2 style={{fontSize:22,textAlign:'center', marginBottom: '20px'}}>What Our Clients Say</h2>
      {loading ? (
        <div style={{textAlign:'center',margin:40}}>Loading testimonials…</div>
      ) : error ? (
        <div className="error-message" style={{textAlign:'center', color:'red'}}>{error}</div>
      ) : ( 
        <div style={{display:'flex',flexDirection:'column',gap:18}}>
          {testimonials.map((t) => (
            <div key={t.id} style={{background:'#f7fbff',borderRadius:14,boxShadow:'0 2px 8px #e0e7ef22',padding:16,marginBottom:2}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <div style={{width:44,height:44,borderRadius:999,background:'linear-gradient(135deg,#3b82f6,#06b6d4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:18}}>{t.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                <div>
                  <div style={{fontWeight:700}}>{t.name}</div>
                  <div style={{color:'#6b7280',fontSize:13}}>{t.sport}</div>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:2,marginBottom:6}}>{renderStars(t.rating)}</div>
              <div style={{fontStyle:'italic',color:'#334155',fontSize:15}}>&ldquo;{t.comment}&rdquo;</div>
            </div>
          ))}
        </div>
      )}
      <div style={{marginTop: 40}}>
        <AddTestimonial onTestimonialAdded={fetchTestimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
