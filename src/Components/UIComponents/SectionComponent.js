import React from 'react';
import '../Styles/SectionComponent.css';

const SectionComponent = ({sectionTitle, sectionBodyClass, children}) => {
  return (
    <section className='section-component'>
        <div className='section-component__wrapper'>
            <div className='section-component__header'>
                <i className="section-component__header-icon fa-solid fa-dumbbell"></i>
                <h2 className='section-component__title'>{sectionTitle}</h2>
            </div>
            <div className={sectionBodyClass}>
                {children}
            </div>
        </div>
    </section>
  )
}

export default SectionComponent
