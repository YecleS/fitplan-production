import React from 'react';
import Logo from '../Assets/logo.png';
import '../Styles/Footer.css';
import Devider from '../Assets/devider.png'

const Footer = () => {
  return (
    <footer className='footer'>
      <img src={Devider} className='footer__devider-img'/>
      <div className='footer__wrapper'>
        <div className='footer__logo-wrapper'>
          <img src={Logo} className='footer__logo' />
          <p className='footer__logo-name'>Fit<span>Plan</span></p>
        </div>
        <p className='footer__all-rights-reserved'>&copy; 2024 FitPlan. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
