import React from 'react';
import HeroSection from '../Sections/HeroSection';
import AboutUsSection from '../Sections/AboutUsSection';
import FeaturesSection from '../Sections/FeaturesSection';
import GettingsStartedSection from '../Sections/GettingsStartedSection';


const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <AboutUsSection />
      <FeaturesSection />
      <GettingsStartedSection />
    </div>
  )
}

export default HomePage
