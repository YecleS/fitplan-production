import React from 'react';
import '../Styles/InputFieldComponent.css';

const InputFieldComponent = ({title, variationClass, children}) => {
  return (
    <div className='input-field-component'>
      <div className='input-field-component__wrapper'>
        <h3 className={`input-field-component__field-title ${variationClass}`}>{title}</h3>
        <div className='input-field-component__field-wrapper'>
            {children}
            <p className='input-field-component__error'></p>
        </div>
      </div>
    </div>
  )
}

export default InputFieldComponent
