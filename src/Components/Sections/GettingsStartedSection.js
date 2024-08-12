import React, { useRef, useContext } from 'react';
import '../Styles/GettingStartedSection.css';
import SectionComponent from '../UIComponents/SectionComponent';
import GettingStartedSectionCard from '../UIComponents/GettingStartedSectionCard';
import { useNavigate } from 'react-router-dom';
import ButtonComponents from '../UIComponents/ButtonComponents';
import { UserInfoContext } from '../Pages/Fitplan';

const GettingsStartedSection = () => {
    // useNavigate for navigation
    const navigate = useNavigate();
    //useRef for toggling of the dialog
    const dialogRef = useRef();

    //Deconstruct the useState
    const {id, username} = useContext(UserInfoContext);

    //If theres a username, show modal
    const signUp = () => {
        if(username){
            dialogRef.current.showModal();
        }else {
            navigate('/sign-up')
        }
    }
    
    const browseCatalog = () => {
        navigate('/catalog')
    }

    const routines = () => {
        navigate('/routines')
    }
    
    const contactUs = () => {
        navigate('/contact-us')
    }

  return (
    <SectionComponent
        sectionTitle='Getting Started'
        sectionBodyClass='getting-started-section__body'
    >
        <GettingStartedSectionCard 
            numberTitle='01' 
            cardTitle='Initialize Account' 
            cardDescription='Initialize account to unlock the full potential of FitPlan and start building your personalized workout routine.'
            label='Sign Up'
            onClick={signUp}
        />

        <GettingStartedSectionCard 
            numberTitle='02' 
            cardTitle='Browse Catalog' 
            cardDescription='Explore our extensive catalog of exercises to find the workouts that align with your goals and preferences.'
            label='Browse'
            onClick={browseCatalog}
        />

        <GettingStartedSectionCard 
            numberTitle='03' 
            cardTitle='Choose Exercise' 
            cardDescription='Select and add your chosen exercises to your custom workout plan, tailoring it to your specific needs.'
            label='Routines'
            onClick={routines}
        />

        <GettingStartedSectionCard 
            numberTitle='04' 
            cardTitle='Get In Touch' 
            cardDescription='If you have any questions, feedback, or just want to say hello, feel free to reach out to us. We are here to help and would love to hear from you.'
            label='Contact Us'
            onClick={contactUs}
        />

        <dialog ref={dialogRef} className='getting-started-section__dialog'>
            <p>Account was already initialized. Proceed to other steps</p>
            <ButtonComponents label='Proceed' customClass='getting-started-section__dialog-button' onClick={() => dialogRef.current.close()} />
        </dialog>
    </SectionComponent>
  )
}

export default GettingsStartedSection
