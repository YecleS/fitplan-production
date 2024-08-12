import React from 'react';
import '../Styles/DialogComponent.css';

const DialogComponent = ({formData, onSubmit, checkboxOnChange, onChange, handleTimeChange, formErrors}) => {

  return (
    <div className='dialog-component'>
        <form className='dialog-component__form' onSubmit={onSubmit}>
            <div className='dialog-component__fieldset-wrapper schedule-wrapper'>
                <h3 className='dialog-component__title'>Schedule</h3>
                <div className='dialog-component__field-wrapper'>
                    <label className='dialog-component__checkbox-label'>
                        <input 
                            type='checkbox'
                            name='schedule'
                            value='monday'
                            onChange={checkboxOnChange}
                            checked={formData.schedule.includes('monday')}
                        />
                        Monday
                    </label>
                    <label className='dialog-component__checkbox-label'>
                        <input 
                            type='checkbox'
                            name='schedule'
                            value='tuesday'
                            onChange={checkboxOnChange}
                            checked={formData.schedule.includes('tuesday')}
                        />
                        Tuesday
                    </label>
                    <label className='dialog-component__checkbox-label'>
                        <input 
                            type='checkbox'
                            name='schedule'
                            value='wednesday'
                            onChange={checkboxOnChange}
                            checked={formData.schedule.includes('wednesday')}
                        />
                        Wednesday
                    </label>
                    <label className='dialog-component__checkbox-label'>
                        <input 
                            type='checkbox'
                            name='schedule'
                            value='thursday'
                            onChange={checkboxOnChange}
                            checked={formData.schedule.includes('thursday')}
                        />
                        Thursday
                    </label>
                    <label className='dialog-component__checkbox-label'>
                        <input 
                            type='checkbox'
                            name='schedule'
                            value='friday'
                            onChange={checkboxOnChange}
                            checked={formData.schedule.includes('friday')}
                            />
                        Friday
                    </label>
                    <label className='dialog-component__checkbox-label'>
                        <input 
                            type='checkbox'
                            name='schedule'
                            value='saturday'
                            onChange={checkboxOnChange}
                            checked={formData.schedule.includes('saturday')}
                            />
                        Saturday
                    </label>
                    <label className='dialog-component__checkbox-label'>
                        <input 
                            type='checkbox'
                            name='schedule'
                            value='sunday'
                            onChange={checkboxOnChange}
                            checked={formData.schedule.includes('sunday')}
                            />
                        Sunday
                    </label>
                    {formErrors && <p className='dialog-component__error'>{formErrors.schedule}</p>}
                    </div>
                </div>

                <div className='dialog-component__fieldset-wrapper'>
                    <h3 className='dialog-component__title'>Repetition</h3>
                    <div className='dialog-component__field-wrapper'>
                        <input 
                            type='number'
                            name='reps'
                            value={formData.reps}
                            onChange={onChange}
                            className='dialog-component__input'
                            min='0'
                        />
                        {formErrors && <p className='dialog-component__error'>{formErrors.reps}</p>}
                    </div>
                </div>

                <div className='dialog-component__fieldset-wrapper'>
                    <h3 className='dialog-component__title'>Sets</h3>
                    <div className='dialog-component__field-wrapper'>
                        <input 
                            type='number'
                            name='sets'
                            value={formData.sets}
                            onChange={onChange}
                            className='dialog-component__input'
                            min='0'
                        />
                        {formErrors && <p className='dialog-component__error'>{formErrors.reps}</p>}
                    </div>
                </div>

                <div className='dialog-component__fieldset-wrapper'>
                        <h3 className='dialog-component__title time-title'>Time <span>*Leave Blank if None</span></h3>
                        <div className='dialog-component__time-field-wrapper'>
                            <p className='dialog-component-label-mins'>Mins</p>
                            <input 
                                type='number' 
                                name='mins'
                                value={formData.time.split(':')[0]}
                                onChange={handleTimeChange}
                                className='dialog-component__input time-field'
                                min='0'
                                max='60' 
                            />
                            <span>:</span>
                            <p className='dialog-component-label-secs'>Secs</p>
                            <input 
                                type='number' 
                                name='secs'
                                value={formData.time.split(':')[1]}
                                onChange={handleTimeChange}
                                className='dialog-component__input time-field'
                                min='0'
                                max='60'  
                            />
                        </div>
                    </div>
                <button type='submit' className='dialog-component__submit'>Submit</button>
        </form>
    </div>
  )
}

export default DialogComponent
