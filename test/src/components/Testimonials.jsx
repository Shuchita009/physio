import React, { useEffect, useState, useCallback } from 'react';
import { Star } from 'lucide-react';
import { testimonialsAPI } from '../services/api';
import { testimonials as mockTestimonials } from '../mock';
import { AddTestimonial } from './AddTestimonial';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const CARD_HEIGHT = 100; // px - fixed height per feedback card (reduced)
  const GAP = 12; // px - vertical gap between cards (tighter)

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

  // Auto-rotate the visible testimonials every 5 seconds
  useEffect(() => {
    const len = testimonials.length;
    if (loading || len <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % len);
    }, 5000);
    return () => clearInterval(id);
  }, [loading, testimonials]);

  const renderStars = (rating) => (
    Array.from({ length: 5 }).map((_, i) => (
  <Star key={i} size={12} style={{ color: i < rating ? '#f59e0b' : '#e6eaf2', marginRight: 3 }} />
    ))
  );

  return (
    <section id="testimonials" className="section-card" style={{marginTop:15}}>
      <div className="mx-auto max-w-4xl p-4">
        <h2 style={{fontSize:22,textAlign:'center', marginBottom: '15px'}}>What Our Clients Say</h2>
        {loading ? (
          <div style={{textAlign:'center',margin:40}}>Loading testimonials…</div>
        ) : error ? (
          <div className="error-message" style={{textAlign:'center', color:'red'}}>{error}</div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: GAP,
              marginBottom: 12,
              minHeight: testimonials.length
                ? Math.min(testimonials.length, 2) * CARD_HEIGHT + (Math.min(testimonials.length, 2) - 1) * GAP
                : 0,
            }}
          >
            {(() => {
              const len = testimonials.length;
              if (len === 0) return null;
              const first = testimonials[currentIndex % len];
              const second = len > 1 ? testimonials[(currentIndex + 1) % len] : null;
              const visible = [first, second].filter(Boolean);
              return visible.map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: '#f7fbff',
                    borderRadius: 14,
                    boxShadow: '0 2px 8px #e0e7ef22',
                    padding: 12,
                    marginBottom: 2,
                    height: CARD_HEIGHT,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 6, textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-start', fontWeight: 700 }}>
                      <span style={{ fontSize: 14 }}>{t.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center' }}>{renderStars(t.rating)}</div>
                    </div>
                    {t.sport && <div style={{ color: '#6b7280', fontSize: 12 }}>{t.sport}</div>}
                  </div>
                  <div
                    style={{
                      fontStyle: 'italic',
                      color: '#334155',
                      fontSize: 14,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    &ldquo;{t.comment}&rdquo;
                  </div>
                </div>
              ));
            })()}
          </div>
        )}
        <AddTestimonial onTestimonialAdded={fetchTestimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
