import React, { useEffect, useState, useCallback } from 'react';
import { Star } from 'lucide-react';
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
      <Star key={i} size={14} style={{ color: i < rating ? '#f59e0b' : '#e6eaf2', marginRight: 4 }} />
    ))
  );

  return (
    <section className="section-card" style={{marginTop:15}}>
      <div className="mx-auto max-w-4xl p-4">
        <h2 style={{fontSize:22,textAlign:'center', marginBottom: '15px'}}>What Our Clients Say</h2>
        {loading ? (
          <div style={{textAlign:'center',margin:40}}>Loading testimonials…</div>
        ) : error ? (
          <div className="error-message" style={{textAlign:'center', color:'red'}}>{error}</div>
        ) : ( 
          <div style={{display:'flex',flexDirection:'column',gap:18, marginBottom: '250px'}}>
            {testimonials.map((t) => (
              <div key={t.id} style={{background:'#f7fbff',borderRadius:14,boxShadow:'0 2px 8px #e0e7ef22',padding:16,marginBottom:2}}>
                <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:8,textAlign:'left'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'flex-start', fontWeight:700}}>
                    <span>{t.name}</span>
                    <div style={{display:'flex', alignItems:'center'}}>{renderStars(t.rating)}</div>
                  </div>
                  <div style={{color:'#6b7280',fontSize:13}}>{t.sport}</div>
                </div>
                <div style={{fontStyle:'italic',color:'#334155',fontSize:15}}>&ldquo;{t.comment}&rdquo;</div>
              </div>
            ))}
          </div>
        )}
        <AddTestimonial onTestimonialAdded={fetchTestimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
