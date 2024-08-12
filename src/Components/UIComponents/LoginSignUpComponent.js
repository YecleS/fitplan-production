import React from 'react';
import '../Styles/LoginSignUpComponent.css';
import LoginImg from '../Assets/login-signup.png';
import Logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';

const LoginSignUpComponent = ({buttonLabel, buttonLink, formTitle, children}) => {
  return (
    <div className='login-signup'>

      <div className='login-signup__img-wrapper'>
        <div className='login-signup__img-header'>
            <div className='login-signup__logo-wrapper'>
                <img src={Logo} className='login-signup__logo'/>
                <p className='login-signup__logo-name'>Fit<span>Plan</span></p>
            </div>
            <Link to={buttonLink}>
                <button className='login-signup__navigation-button'>{buttonLabel}</button>
            </Link>
        </div>
        <img src={LoginImg} className='login-signup__img'/>
      </div>
      
      <div className='login-signup__form-wrapper'>
        <div className='login-signup__form-header'>
            <img src={Logo} className='login-signup__logo'/>
            <h2 className='login-signup__form-title'>{formTitle}</h2>
        </div>
        {children}
      </div>
    </div>
  )
}

export default LoginSignUpComponent
