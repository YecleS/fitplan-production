import React, { useEffect, useState, useRef, useContext } from 'react';
import '../Styles/Header.css';
import Logo from '../Assets/logo.png';
import NavLinkComponents from './NavLinkComponents';
import { useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../Pages/Fitplan';

const Header = () => {
    //Destructure the useContext
    const { id, username } = useContext(UserInfoContext)
    //useNavigate hook for navigation
    const navigate = useNavigate();
    //useRef to reference the profile dropdown
    const dropdownProfileRef = useRef(null);
    const navBarRef = useRef(null);
    //State for toggling the profile dropdown
    const [showProfileDropdown, setShowProfileDropdown] = useState();
    //State for toggling nav during responsiveness
    const[showNavbar, setShowNavBar] = useState();

    //For embedding click event listener to the DOM,
    //to close the profile dropdown when clicked outside
    useEffect(() => {
        const handleClick = (e) => {
            if(dropdownProfileRef.current && !dropdownProfileRef.current.contains(e.target)){
                setShowProfileDropdown(false);
            }
            if(navBarRef.current && !navBarRef.current.contains(e.target)){
                setShowNavBar(false);
            }
        }
        document.addEventListener('click', handleClick);
        return() => document.removeEventListener('click', handleClick);
    }, [])

    //For toggling of profile dropdown
    const toggleShowProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown)
    }

    const toggleNavBar = () => {
        setShowNavBar(!showNavbar)
    }

    //logout method
    const logout = () => {
        localStorage.clear();
        navigate('/')
        window.location.reload();
        
    }

    //Login method
    const login = () => {
        localStorage.clear();
        navigate('/login');
    }

    //To navigate to routines page
    const navigateRoutines = () => {
        navigate('/routines')
    }

  return (
    <header className='header'>
      <div className='header__wrapper' ref={navBarRef}>
        <div className='header__logo-wrapper'>
            <img src={Logo} className='header__logo-img'/>
            <p className='header__logo-name'>Fit<span>Plan</span></p>
        </div>

        <nav className={`header__nav-links-wrapper ${showNavbar ? 'header__nav-links-wrapper-active': ''}`}>
            <i className="header__icon fa-solid fa-xmark" onClick={toggleNavBar}></i>
            <NavLinkComponents linkTo='/' label='Home'/>
            <NavLinkComponents linkTo='catalog' label='Catalog'/>
            <NavLinkComponents linkTo='contacts' label='Contact Us'/>
        </nav>

        <div className='header__controls-wrapper'>
            {/*Hide element if theres a username*/}
            <button className={`header__login-button controls-button ${username ? 'hide-element':''}`} onClick={login}>Log In</button>
            
            {/*Hide element if theres no username*/}
            <div className={`header__controls-container ${!username ? 'hide-element':''}`}>
                <div className='header__routine-icon-wrapper'>
                    <i className="header__icon fa-solid fa-dumbbell" onClick={navigateRoutines}></i>
                </div>
                <div className='header__profile-icon-wrapper' ref={dropdownProfileRef}>
                    <i className="header__icon fa-solid fa-circle-user" onClick={toggleShowProfileDropdown} ></i>
                    <i className="header__icon fa-solid fa-caret-down"></i>
                    {showProfileDropdown && 
                        <div className='header__profile-dropdown'>
                            <p className='header__profile-name'>{username}</p>
                            <button className='header__profile-logout' onClick={logout}>Logout</button>
                        </div>
                    }
                </div>
            </div>
            <i className="header__icon fa-solid fa-bars" onClick={toggleNavBar}></i> 
        </div>
      </div>
    </header>
  )
}

export default Header
