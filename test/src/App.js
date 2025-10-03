import React from 'react';
import './App.css';
import { Contact } from './components/Contact';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

function App() {
  return (
    <div className="main-mobile">
      <Header />
      <Hero />
      <Services />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default App;
