import React from 'react';
import '../Styles/IconComponent.css';

const IconComponent = ({icon, descriptionTitle, description}) => {
  return (
    <div className='icon-component'>
        <div className='icon-component__icon-wrapper'>
            <i className={`icon-component__icon fa-solid ${icon}`}></i>
        </div>
        <div className='icon-component__description-wrapper'>
            <p className='icon-component__description-title'>{descriptionTitle}</p>
            <p className='icon-component__description'>{description}</p>
        </div>
    </div>
  )
}

export default IconComponent
