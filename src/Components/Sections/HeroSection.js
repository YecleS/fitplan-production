import React, { useContext } from 'react';
import '../Styles/HeroSection.css';
import Devider from '../Assets/devider.png';
import HeroImg from '../Assets/hero-img.png';
import ButtonComponents from '../UIComponents/ButtonComponents';
import { UserInfoContext } from '../Pages/Fitplan';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  //Deconstruct the useContext
  const {id, username} = useContext(UserInfoContext);
  const navigate = useNavigate();

  //Dynamically navigate, if theres a username navigate to catalog page
  //if none navigate to sign up page
  const callToAction = () => {
    if(username){
      navigate('/catalog');
    }else {
      navigate('/sign-up')
    }
    
  }

  return (
    <section className='hero-section'>
      <div className='hero-section__wrapper'>
        <div className='hero-section__details-wrapper'>
            <h1 className='hero-section__hero-title'>
                Design, Customize, and Conquer Your Fitness Goals with <span>FitPlan</span>
            </h1>
            <p className='hero-section__hero-subtitle'>
                Explore a diverse range of exercises, build tailored workout routines, and track your progress effortlessly
            </p>
              <ButtonComponents label={username ? 'Catalog': 'Sign Up'} customClass='hero-section__hero-button' onClick={callToAction}/>
        </div>
        <div className='hero-section__img-wrapper'>
            <img src={HeroImg} className='hero-section__hero-img'/>
        </div>
      </div>
      <img src={Devider} className='hero-section__devider-img' />
    </section>
  )
}

export default HeroSection
