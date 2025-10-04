import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header style={{position:'sticky',top:0,zIndex:100,background:'#fff',boxShadow:'0 2px 12px #e0e7ef33',padding:'0'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:60,padding:'0 18px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:38,height:38,borderRadius:12,background:'linear-gradient(135deg,#2563eb,#06b6d4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:18}}>DS</div>
          <div style={{fontWeight:700,fontSize:16}}>Dr. S S</div>
        </div>
        <button aria-label="Menu" style={{background:'none',border:'none',padding:6}} onClick={()=>setOpen(true)}>
          <Menu size={28}/>
        </button>
      </div>
      {open && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(16,23,40,0.92)',zIndex:200,display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',height:60,padding:'0 18px'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:38,height:38,borderRadius:12,background:'linear-gradient(135deg,#2563eb,#06b6d4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:18}}>DS</div>
              <div style={{fontWeight:700,fontSize:16,color:'#fff'}}>Dr. S S</div>
            </div>
            <button aria-label="Close" style={{background:'none',border:'none',padding:6}} onClick={()=>setOpen(false)}>
              <X size={28} color="#fff"/>
            </button>
          </div>
          <nav style={{display:'flex',flexDirection:'column',alignItems:'center',gap:28,marginTop:48}}>
            <a href="#about-dr" onClick={()=>setOpen(false)} style={{color:'#fff',fontSize:20,textDecoration:'none'}}>About Doctor</a>
            <a href="#services" onClick={()=>setOpen(false)} style={{color:'#fff',fontSize:20,textDecoration:'none'}}>Services</a>
            <a href="#testimonials" onClick={()=>setOpen(false)} style={{color:'#fff',fontSize:20,textDecoration:'none'}}>Testimonials</a>
            <a href="#contact" onClick={()=>setOpen(false)} style={{color:'#fff',fontSize:20,textDecoration:'none'}}>Book Appointment</a>
          </nav>
        </div>
      )}
    </header>
  );
};
