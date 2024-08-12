import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/NavLinkComponents.css';

const NavLinkComponents = ({linkTo, customClass, label}) => {
  return (
    <NavLink to={linkTo} className='nav-link-components__link'>
      <p className={`nav-link-components__label ${customClass}`}>{label}</p>
    </NavLink>
  )
}

export default NavLinkComponents
