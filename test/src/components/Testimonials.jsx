import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Quote } from 'lucide-react';
import { testimonialsAPI } from '../services/api';
import { testimonials as mockTestimonials } from '../mock';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    testimonialsAPI.getAll()
      .then((data) => {
        const list = Array.isArray(data) && data.length > 0 ? data : mockTestimonials;
        setTestimonials(list);
      })
      .catch(() => {
        setTestimonials(mockTestimonials);
        setError(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderStars = (rating) => (
    Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} style={{ color: i < rating ? '#f59e0b' : '#e6eaf2', marginRight: 4 }} />
    ))
  );

  if (loading) return <section className="section-card" style={{marginTop:18}}><div style={{textAlign:'center',margin:40}}>Loading testimonials…</div></section>;
  if (error) return <section className="section-card" style={{marginTop:18}}><div className="error-message">{error}</div></section>;

  return (
    <section className="section-card" style={{marginTop:18}}>
      <span className="hero-badge">Patient Testimonials</span>
      <h2 className="hero-title" style={{margin:'12px 0 8px 0',fontSize:22,textAlign:'left'}}>Trusted by <span className="accent">Elite Athletes</span></h2>
      <div className="hero-sub" style={{marginBottom:12,textAlign:'left'}}>Read what Olympic medalists and professional athletes say about their experience with Dr. S S's physiotherapy services.</div>
      <div style={{display:'flex',flexDirection:'column',gap:18}}>
        {testimonials.map((t) => (
          <div key={t.id} style={{background:'#f7fbff',borderRadius:14,boxShadow:'0 2px 8px #e0e7ef22',padding:16,marginBottom:2}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
              <div style={{width:44,height:44,borderRadius:999,background:'linear-gradient(135deg,#3b82f6,#06b6d4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:18}}>{t.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
              <div>
                <div style={{fontWeight:700}}>{t.name}</div>
                <div style={{color:'#6b7280',fontSize:13}}>{t.sport} • {t.achievement}</div>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:2,marginBottom:6}}>{renderStars(t.rating)}</div>
            <div style={{fontStyle:'italic',color:'#334155',fontSize:15}}>&ldquo;{t.comment}&rdquo;</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:18,textAlign:'center'}}>
        <span className="hero-badge">Trusted by Leading Sports Organizations</span>
      </div>
    </section>
  );
};

export default Testimonials;
