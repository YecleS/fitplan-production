import React from 'react';
import '../Styles/ButtonComponents.css';

const ButtonComponents = ({label, customClass, onClick }) => {
  return (
    <button className={`button-components__button ${customClass}`} onClick={onClick}>{label}</button>
  )
}

export default ButtonComponents
