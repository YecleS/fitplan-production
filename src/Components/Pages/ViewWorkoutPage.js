import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/ViewWorkoutPage.css';
import ButtonComponents from '../UIComponents/ButtonComponents';
import { UserInfoContext } from './Fitplan';
import DialogComponent from '../UIComponents/DialogComponent';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ViewWorkoutSkeletonLoader from '../UIComponents/ViewWorkoutSkeletonLoader';
import LoadingSpinner from '../UIComponents/LoadingSpinner';

const ViewWorkoutPage = () => {
    //Get the id from the URL
    const {selectedId, selectedName} = useParams();
    //Get the id and username from the useContetxt
    const {id, username} = useContext(UserInfoContext);
    //Reference the dialog
    const dialogRef = useRef();
    const loadingSpinnerRef = useRef();
    //Storage of fetched data
    const [fetchedWorkouts, setFetchedWorkouts]= useState([]); 
    //Storage for errors generated
    const[formErrors, setFormErrors] = useState({});
    //State for skeleton loader
    const[skeletonLoader, setSkeletonLoader] = useState(true);
    //useNavigate for navigation
    const navigate = useNavigate();
    //Storage for data from the input fields
    const [formData, setFormData] = useState({
        user_Id: 0,
        workoutName: '',
        schedule:[],
        reps: 0,
        sets: 0,
        time: '00:00'
    });
    
    //Fetch data from the database
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('http://fitplan.onlinewebshop.net/db_getWorkouts.php');
                const fetchedData = await response.json();
                setFetchedWorkouts(fetchedData);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setSkeletonLoader(false);
            }
        }
        fetchWorkouts();
    }, []);


    //Check if the Id from the URL exist in the database
    const selectedWorkout = fetchedWorkouts.find((workouts) => workouts.id === Number(selectedId));


    //Toggle dialog
    const toggleDialog = () => {
        if(id){
            dialogRef.current.showModal();
        }else {
            alert('Login or Signup First, to add workouts to routines');
        }
        
    }

    //Formats the time
    const formatTime = (minutes, seconds) => {
        const mins = String(minutes).padStart(2, '0');
        const secs = String(seconds).padStart(2, '0');
        return `${mins}:${secs}`;
    }


    //Handle onChange for the time input fields
    const handleTimeChange = (e) => {
        const {name, value} = e.target;
        const mins = name === 'mins' ? Number(value) : formData.time.split(':')[0];
        const secs = name === 'secs' ? Number(value) : formData.time.split(':')[1];

        setFormData({
            ...formData,
            time: formatTime(mins, secs)
        });
    }


    //Handle onChange for other input fields, except for time input fields
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    //Handle the schedule change/checkboxes
    const handleScheduleChange = (e) => {
        const { value, checked } = e.target;
        if(checked){
            setFormData( prevState => ({
                ...prevState,
                user_Id: id,
                workoutName: selectedWorkout.name,
                schedule: [...prevState.schedule, value]
            }));
        }else {
            setFormData( prevState => ({
                ...prevState,
                schedule: prevState.schedule.filter(day => day !== value)
            }))
        }
    }

    //Message
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

    //Validation schema for validating data
    const validationSchema = yup.object({
        schedule:yup.array().min(1, 'Must select atleast 1'),
    })


    //Creat fields
    const clearFields = () => {
        setFormData({
            user_Id: 0,
            workoutName: '',
            schedule: [],
            reps: 0,
            sets: 0,
            time: '00:00'
        })
    }

    //Submit function
    const submit = async (e) => {
        e.preventDefault();
        loadingSpinnerRef.current.showModal();
        try {
            await validationSchema.validate(formData, {abortEarly: false});
            const response = await fetch('http://fitplan.onlinewebshop.net/db_insertRoutine.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json();
            console.log(data);

            clearFields();
            dialogRef.current.close();
            message('Added Successfuly');
        }
        catch(validationErrors) {
            const formattedErrors = {}
            validationErrors.inner.forEach((errors) =>{
                formattedErrors[errors.path] = errors.message;
            })
            setFormErrors(formattedErrors);
        }
        finally {
            loadingSpinnerRef.current.close();
        }
    }

    //Navigate to catalog
    const viewMore = () => {
        navigate('/catalog');
    }

    //Skeleton loader
    if(skeletonLoader){
        return (
            <div className='view-workout-page'>
                <ViewWorkoutSkeletonLoader />
            </div>
        );
    };

    //If theres the id do not exist in the database, return a value
    if(!selectedWorkout) {
        return (
            <div className='view-workout-page'>
                <p>Selected Workout is Unavailabe</p>
            </div>
        );
    };

  return (
    <div className='view-workout-page'>
        <div className='view-workout-page__wrapper'>
            <div className='view-workout-page__video-wrapper'>
                <iframe
                    className='view-workout-page__video' 
                    src={selectedWorkout.video_url} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen >
                </iframe>
            </div>
            <div className='view-workout-page__details-wrapper'>
                <h3 className='view-workout-page__details-title'>{selectedWorkout.name}</h3>
                <p className='view-workout-page__description'>{selectedWorkout.description}</p>
                <p className='view-workout-page__details'>Variation Of: {selectedWorkout.variation_of}</p>
                <p className='view-workout-page__details'>Category: {selectedWorkout.category}</p>
                <p className='view-workout-page__details'>Difficulty: {selectedWorkout.difficulty}</p>
                <p className='view-workout-page__details'>Primary Target Muscle: {selectedWorkout.primary_target_muscle}</p>
                <p className='view-workout-page__details'>Other Target Muscle Groups: {selectedWorkout.other_muscle_groups}</p>
                <ButtonComponents label='Add To Routine' customClass='view-workout-page__add-to-routine' onClick={toggleDialog}/>
                <ButtonComponents label='View More' customClass='view-workout-page__view-more' onClick={viewMore}/>
            </div>
        </div>

        <dialog className='view-workout-page__dialog' ref={loadingSpinnerRef}>
            <LoadingSpinner />
        </dialog>

      <dialog className='view-workout-page__dialog' ref={dialogRef}>
        <DialogComponent 
            formData={formData}
            checkboxOnChange={handleScheduleChange}
            onChange={handleChange}
            handleTimeChange={handleTimeChange}
            onSubmit={submit}
            formErrors={formErrors}
        />
      </dialog>
      <ToastContainer />
    </div>
  )
}

export default ViewWorkoutPage
