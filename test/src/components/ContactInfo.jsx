import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <footer style={{background:'#181f2a',color:'#e5e7eb',padding:'24px 0 16px 0',marginTop:8}}>
      <div className="container" style={{maxWidth:900,margin:'0 auto',padding:'0 16px'}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:16,justifyContent:'space-between'}}>
          <div style={{minWidth:260,flex:1}}>
            <div style={{fontWeight:700,fontSize:20,marginBottom:12}}>Contact Information</div>
            <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:6}}>
              <MapPin style={{marginTop:2}}/>
              <div>
                <div style={{fontWeight:700}}>blu wellness center</div>
                <div>Murugesh Mudaliar Rd, Frazer Town<br/>Bengaluru, Karnataka<br/>560005</div>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
              <Phone/>
              <span>+919592948779</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
              <Mail/>
              <span>physio.siddharth@gmail.com</span>
            </div>
            <div style={{fontWeight:700,marginBottom:4}}>Specializations</div>
            <div style={{color:'#b6bbc6'}}>
              <div>Sports Rehabilitation</div>
              <div>Manual Therapy</div>
              <div>Musculoskeletal Therapy</div>
              <div>Performance Optimization</div>
            </div>
          </div>
        </div>
        <hr style={{border:'none',borderTop:'1px solid #232b39',margin:'16px 0 12px 0'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{fontSize:13,lineHeight:1.4}}>
            © 2025 Dr. Siddharth Sakalle. All rights reserved.<br/>
            Trusted by Olympic athletes and sports champions worldwide.
          </div>
          <div style={{display:'flex',gap:10}}>
            <a href="https://www.linkedin.com/in/siddharth-sakalle-b0a2ba8a/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" style={{background:'#232b39',borderRadius:8,padding:8,display:'inline-flex'}} aria-label="LinkedIn">
              <Linkedin color="#e5e7eb" size={18} />
            </a>
            <a href="https://www.instagram.com/siddharthsakalle/" target="_blank" rel="noopener noreferrer" style={{background:'#232b39',borderRadius:8,padding:8,display:'inline-flex'}} aria-label="Instagram">
              <Instagram color="#e5e7eb" size={18} />
            </a>
            <a href="https://www.facebook.com/siddharth.sakalle/" target="_blank" rel="noopener noreferrer" style={{background:'#232b39',borderRadius:8,padding:8,display:'inline-flex'}} aria-label="Facebook">
              <Facebook color="#e5e7eb" size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactInfo;
