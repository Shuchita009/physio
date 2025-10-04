import React from 'react';
import './App.css';
import { Contact } from './components/Contact';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import ProfileHero from './components/ProfileHero';
import EducationList from './components/EducationList';
import AboutDr from './components/AboutDr';

function App() {
  return (
    <div className="main-mobile">
      <Header />
      <Hero />
  <ProfileHero />
  <AboutDr />
  <EducationList />
      <Services />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default App;
