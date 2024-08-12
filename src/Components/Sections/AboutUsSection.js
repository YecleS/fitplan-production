import React from 'react';
import '../Styles/AboutUsPage.css';
import SectionComponent from '../UIComponents/SectionComponent';
import AboutUsImg from '../Assets/about-us-img.png';
import ButtonComponents from '../UIComponents/ButtonComponents';
import { useNavigate } from 'react-router-dom';

const AboutUsSection = () => {
  const navigate = useNavigate();

  const contactUs = () => {
    navigate('/contact-us');
  }

  return (
    <SectionComponent
      sectionTitle='About Us'
      sectionBodyClass='about-us-section__body' 
    >
      <div className='about-us-section__img-wrapper'>
        <img src={AboutUsImg} className='about-us-section__img'/>
      </div>
      <div className='about-us-section__details-wrapper'>
        <h3 className='about-us-section__title'>
          Get Ready To Reach Your Fitness Goals with Fit<span>Plan</span>
        </h3>
        <p className='about-us-section__description'>
          At FitPlan, we believe that fitness should be accessible, enjoyable, and tailored to each individual's unique goals and preferences. Our mission is to empower you to take control of your fitness journey by providing a user-friendly platform where you can explore a wide range of workout exercises and create personalized workout routines that fit your lifestyle.
        </p>
        <div className='about-us-section__button-wrapper'>
            <ButtonComponents customClass='about-us-section__button' label='Contact Us' onClick={contactUs}/> 
        </div>
      </div>
    </SectionComponent>
  )
}

export default AboutUsSection
