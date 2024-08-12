import React, { useEffect, useContext, useState, useRef } from 'react';
import '../Styles/MyRoutinesPage.css';
import { UserInfoContext } from './Fitplan';
import DialogComponent from '../UIComponents/DialogComponent';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from '../UIComponents/LoadingSpinner';
import * as yup from 'yup';

const MyRoutinesPage = () => {
    //Store consume the context
    const { id, username } = useContext(UserInfoContext);
    //Store the fetched routines
    const [fetchedRoutines, setFetchedRoutines] = useState([]);
    //State for filter
    const [scheduleFilter, setScheduleFilter] = useState('');
    //State for displaying errors
    const [formErrors, setFormErrors] = useState({});
    //State for displaying warning message
    const [warningMessage, setWarningMessage] = useState();
    //State for loading
    const [skeletonLoader, setSkeletonLoader] = useState(true);
    //Reference for dialog
    const dialogRef = useRef();
    const dialogSpinnerRef = useRef();

    //State as container for forms
    const [formData, setFormData] = useState({
        routineID: 0,
        schedule: [],
        reps: 0,
        sets: 0,
        time: '00:00'
    })
    
    //useEffect to execute the fetchRoutines function
    useEffect(() => {
        if(!id){
            setWarningMessage('Login or Sign Up first to use  this page');
        }else {
            fetchRoutines();
        }   
    }, [id]);

    
    //Fetch routines from the database
    const fetchRoutines = async () => {
        try {
            const response = await fetch('http://fitplan.onlinewebshop.net/db_getRoutine.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({user_id: id}),
            })
            const data = await response.json();
            setSkeletonLoader(false);
            if(data.success){
                setFetchedRoutines(data.success);
                setWarningMessage('');
            }else {
                setFetchedRoutines([]);
                setWarningMessage('Browse Catalog and add workouts to your routines');
            }
            
        }
        catch(error){
            console.error(error);
        }
    };

    //Pop up message for invalid login
    const message = (message) => {
        toast.success((message), {
        position: "top-right",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }

    const validationSchema = yup.object({
        schedule: yup.array().min(1, 'Must select atleast 1'),
    })

    //Handle change for schedule filter
    const handleFilterChange = (e) => {
        const { value } = e.target;
        setScheduleFilter(value);
    }


    const handleChange = (e) => {  
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }


    const handleScheduleChange = (e) => {
        const { value, checked } = e.target;
        
        if(checked){
            setFormData( prevState => ({
                ...prevState,
                schedule: [...prevState.schedule, value]
            }))
        }else {
            setFormData( prevState => ({
                ...prevState,
                schedule: prevState.schedule.filter(day => day !== value)
            }))
        }
    }


    const formatTime = (minutes, seconds) => {
        const mins = String(minutes).padStart(2, '0');
        const secs = String(seconds).padStart(2, '0');
        
        return `${mins}:${secs}`;
    }


    const handleTimeChange = (e) => {
        const {name, value} = e.target;

        const mins = name === 'mins' ? Number(value) : formData.time.split(':')[0];
        const secs = name === 'secs' ? Number(value) : formData.time.split(':')[1];
        setFormData({
            ...formData,
            time: formatTime(mins, secs)
        })
    }

    const clearFields = () => {
        setFormData({
            routineID: 0,
            schedule: [],
            reps: 0,
            sets: 0,
            time: '00:00'
        })
    }

    //Function to get the information of the selected row
    const rowEdit = (routine_id) => {
        setFormData({
            ...formData,
            routineID: routine_id
        })

        dialogRef.current.showModal();
    }

    const update = async (e) => {
        e.preventDefault();
        dialogSpinnerRef.current.showModal();
        try{
            await validationSchema.validate(formData, {abortEarly: false});
            const response = await fetch('http://fitplan.onlinewebshop.net/db_editRoutine.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if(data.success){
                dialogRef.current.close();
                clearFields();
                fetchRoutines();
                message('Updated Successfully');
            }else {
                console.log(data.error);
            }
        }
        catch(error){
            if (error.name === 'ValidationError') {
                // Handle validation errors
                const formattedErrors = {};
                // Check if `inner` is an array
                if (Array.isArray(error.inner)) {
                    error.inner.forEach((validationError) => {
                        formattedErrors[validationError.path] = validationError.message;
                    });
                }
                setFormErrors(formattedErrors);
            } else {
                // Handle other types of errors (e.g., network errors)
                console.error('Error:', error);
            }
        }
        finally {
            dialogSpinnerRef.current.close();
        }
    }
    
    //Function for deletion of rows
    const rowDelete = async (routine_id) => {
        const isConfirmed = window.confirm('The selected row will be deleted, are you sure you want to proceed ?');
        if(isConfirmed){
            dialogSpinnerRef.current.showModal();
            try {
                const response = await fetch('http://fitplan.onlinewebshop.net/db_deleteRow.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({routineID: routine_id}),
                });

                const data = await response.json();
                if(data.success){
                    message('Deleted Successfully');
                    fetchRoutines();
                }else {
                    console.log(data.error);
                    
                }
            }
            catch(error) {
                console.error(error);
            }
            finally {
                dialogSpinnerRef.current.close();
            }

        }
    }

  return (
    <div className='my-routines-page'>
      <div className='my-routines-page__wrapper'>
        <div className='my-routines-page__header'>
            <h2 className='my-routines-page__title'>Routines</h2>
            <div className='my-routines-page__control-wrapper'>
                <select onChange={handleFilterChange} className='my-routines-page__filter'>
                    <option value=''>All</option>
                    <option value='monday'>Monday</option>
                    <option value='tuesday'>Tuesday</option>
                    <option value='wednesday'>Wednesday</option>
                    <option value='thursday'>Thursday</option>
                    <option value='friday'>Friday</option>
                    <option value='saturday'>Saturday</option>
                    <option value='sunday'>Sunday</option>
                </select>
            </div>
        </div>
        <div className='my-routines-page__body'>
        
            <table className='my-routines-page__table'>
                
                <thead>
                    <tr>
                        <th className='my-routines-page__table-th'>Name</th>
                        <th className='my-routines-page__table-th'>Schedule</th>
                        <th className='my-routines-page__table-th'>Reps</th>
                        <th className='my-routines-page__table-th'>Sets</th>
                        <th className='my-routines-page__table-th'>Time</th>
                        <th className='my-routines-page__table-th'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {skeletonLoader ? 
                         Array.from({length: 4}).map((_, index) => (
                            <tr key={index}>
                                <td><div className='my-routines-page__skeleton-loader-td'></div></td>
                                <td><div className='my-routines-page__skeleton-loader-td'></div></td>
                                <td><div className='my-routines-page__skeleton-loader-td'></div></td>
                                <td><div className='my-routines-page__skeleton-loader-td'></div></td>
                                <td><div className='my-routines-page__skeleton-loader-td'></div></td>
                                <td><div className='my-routines-page__skeleton-loader-td'></div></td>
                            </tr>
                         ))
                        : fetchedRoutines.filter((routines) =>{
                            return (
                                scheduleFilter === '' ? routines: routines.schedule.toLowerCase().includes(scheduleFilter.toLowerCase())
                            );
                        }).map((routines) => (
                            <tr className='my-routines-page__table-tbody-tr' key={routines.routine_id}>
                                <td className='my-routines-page__tbody-td'>{routines.name}</td>
                                <td className='my-routines-page__tbody-td'>{routines.schedule}</td>
                                <td className='my-routines-page__tbody-td'>{routines.repetitions}</td>
                                <td className='my-routines-page__tbody-td'>{routines.sets}</td>
                                <td className='my-routines-page__tbody-td'>{routines.time}</td>
                                <td className='my-routines-page__tbody-td'>
                                    <i className="my-routines-page__icon-td fa-solid fa-pen-to-square" onClick={() => rowEdit(routines.routine_id)}></i>
                                    <i className="my-routines-page__icon-td fa-solid fa-trash" onClick={() => rowDelete(routines.routine_id)}></i>
                                </td>
                            </tr>
                            ))
                        }
                </tbody>
            </table>
            {warningMessage && <p>{warningMessage}</p>}
        </div>
      </div>
      <dialog className='my-routines-page__dialog' ref={dialogSpinnerRef}>
        <LoadingSpinner />
      </dialog>
      <dialog className='my-routines-page__dialog' ref={dialogRef}>
            <DialogComponent
                formData={formData}
                onSubmit={update}
                checkboxOnChange={handleScheduleChange}
                onChange={handleChange}
                handleTimeChange={handleTimeChange}
                formErrors={formErrors}
            />        
      </dialog>
      <ToastContainer /> 
    </div>
  )
}

export default MyRoutinesPage
