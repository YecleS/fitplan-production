import React from 'react';
import '../Styles/FeaturesSection.css';
import SectionComponent from '../UIComponents/SectionComponent';

const FeaturesSection = () => {
  return (
    <SectionComponent
        sectionTitle='Features'
        sectionBodyClass='features-section__body'
    >
        <div className='features-section__card'>
            <div className='features-section__card-header'>
                <i className="features-section__icon fa-solid fa-weight-hanging"></i>
            </div>
            <div className='features-section__card-body'>
                <h3 className='features-section__title'>Various Exercises</h3>
                <p className='features-section__description'>Discover a diverse range of exercises designed to target every muscle group and fitness level.</p>
            </div>
        </div>

        <div className='features-section__card'>
            <div className='features-section__card-header'>
                <i className="features-section__icon fa-solid fa-calendar-days"></i>
            </div>
            <div className='features-section__card-body'>
                <h3 className='features-section__title'>Custom Workout Plans</h3>
                <p className='features-section__description'>Create customized workout routines tailored to your fitness goals and preferences.</p>
            </div>
        </div>

        <div className='features-section__card'>
            <div className='features-section__card-header'>
                <i className="features-section__icon fa-solid fa-medal"></i>
            </div>
            <div className='features-section__card-body'>
                <h3 className='features-section__title'>Workout Mastery</h3>
                <p className='features-section__description'>Master the correct techniques for each exercise with detailed instructions and embedded YouTube videos.</p>
            </div>
        </div>

        <div className='features-section__card'>
            <div className='features-section__card-header'>
                <i className="features-section__icon fa-solid fa-list"></i>
            </div>
            <div className='features-section__card-body'>
                <h3 className='features-section__title'>Organized Selection</h3>
                <p className='features-section__description'>Easily browse and select from a well-organized catalog of workouts. Allowing you to quickly find and choose the workouts that best fit your needs.</p>
            </div>
        </div>
    </SectionComponent>
  )
}

export default FeaturesSection
