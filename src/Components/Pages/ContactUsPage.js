import React from 'react';
import '../Styles/ContactUsPage.css';
import IconComponent from '../UIComponents/IconComponent';
import ButtonComponent from '../UIComponents/ButtonComponents';

const ContactUsPage = () => {
  return (
    <div className='contact-us-page'>
      <div className='contact-us-page__wrapper'>
        <div className='contact-us-page__details-wrapper'>
          <h2 className='contact-us-page__details-title'>Get In Touch</h2>
          <p className='contact-us-page__details-description'>
            We’d love to hear from you! Whether you have questions, feedback, or need assistance, our team is here to help. Feel free to reach out to us through the contact form below, or use the provided contact details to get in touch with us directly. We strive to respond to all inquiries promptly and look forward to connecting with you.
          </p>
          <div className='contact-us-page__details-icon-wrapper'>
            <IconComponent
              icon='fa-phone'
              descriptionTitle='Phone'
              description='09217289775'
            />
            <IconComponent
              icon='fa-envelope'
              descriptionTitle='Gmail'
              description='yeclasteven@gmail.com'
            />
            <IconComponent
              icon='fa-house'
              descriptionTitle='Address'
              description='Cabuyao City, Laguna, Philippines'
            />
          </div>
          <div className='contact-us-page__social-links-wrapper'>
            <a href='#' className='contact-us-page__social-icon-wrapper'>
              <i className="contact-us-page__social-icon fa-brands fa-twitter"></i>
            </a>
            <a href='#' className='contact-us-page__social-icon-wrapper'>
              <i className="contact-us-page__social-icon fa-brands fa-facebook"></i>
            </a>
            <a href='#' className='contact-us-page__social-icon-wrapper'>
              <i className="contact-us-page__social-icon fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className='contact-us-page__message-box-wrapper'>
          <input type='text' placeholder='Email' className='contact-us-page__input' />
          <input type='text' placeholder='Phone Number' className='contact-us-page__input' />
          <textarea className='contact-us-page__input textarea' placeholder='message'/>
          <ButtonComponent customClass='contact-us-page__submit' label='Submit'/>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
