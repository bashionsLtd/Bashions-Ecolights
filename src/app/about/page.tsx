import React from 'react';
import ServicesSection from '../components/pages/homepage/services';
import TeamSection from '../components/pages/homepage/teams';
import AboutUsSection from '../components/pages/about/aboutUsSection';


export default function About() {
  return (
    <>
      <AboutUsSection />
      <ServicesSection />
      <TeamSection />
    </>
  );
}
