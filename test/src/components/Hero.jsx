import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { contactInfo } from '../mock'; 
import { sendWhatsAppMessage } from '../utils/communication';

export const Hero = () => {
  const handleBookConsultation = () => {
    const message = "Dear Dr. SS, I would like to book a consultation. Please contact me to schedule an appointment.";
    sendWhatsAppMessage(contactInfo.phone, message);
  };

  return (
    <section className="section-card" style={{marginTop:18}}>
      <Badge className="hero-badge">Sports Physiotherapist</Badge>
      <h1 className="hero-title" style={{margin:'16px 0 8px 0',fontSize:26,lineHeight:1.1,fontWeight:800,textAlign:'left'}}>Elite Sports <span className="accent" style={{color:'#2563eb'}}>Physiotherapy</span> Excellence</h1>
      <div className="hero-sub" style={{marginBottom:16,textAlign:'left'}}>Trusted by Olympic athletes and sports champions. Specialized in manual therapy, musculoskeletal rehabilitation, and sports injury recovery with international expertise.</div>
      <div style={{display:'flex',gap:10,marginBottom:16}}>
        <Button className="ui-button primary" style={{fontSize:16,padding:'12px 22px',borderRadius:12}} onClick={handleBookConsultation}>Book Consultation</Button>
      </div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <div className="ui-badge outline">MPT Australia</div>
        <div className="ui-badge outline">Elite Athletes</div>
        <div className="ui-badge outline">10+ Years</div>
      </div>
    </section>
  );
};

export default Hero;
