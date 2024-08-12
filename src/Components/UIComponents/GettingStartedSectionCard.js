import React from 'react';
import '../Styles/GettingStartedSectionCard.css';
import ButtonComponents from '../UIComponents/ButtonComponents';

const GettingStartedSectionCard = ({numberTitle, cardTitle, cardDescription, label, onClick}) => {
  return (
    <div className='getting-started-section-card__card'>
            <div className='getting-started-section-card__card-header'>
                <p className='getting-started-section-card__card-number-title'>{numberTitle}</p>
            </div>
            <div className='getting-started-section-card__card-body'>
                <div className='getting-started-section-card__card-details-wrapper'>
                    <h3 className='getting-started-section-card__card-title'>{cardTitle}</h3>
                    <p className='getting-started-section-card__card-description'>
                        {cardDescription}
                    </p>
                </div>
                <div className='getting-started-section-card__card-button-wrapper'>
                    <ButtonComponents label={label} onClick={onClick}/>
                </div>
            </div>
        </div>
  )
}

export default GettingStartedSectionCard
