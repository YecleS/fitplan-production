import React,{ useRef, useState } from 'react';
import '../Styles/SignUpPage.css';
import LoginSignUpComponent from '../UIComponents/LoginSignUpComponent';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UIComponents/LoadingSpinner';

const SignUpPage = () => {
  //Navigation ref
  const navigate = useNavigate();

  //Dialog Ref
  const loadingSpinnerRef = useRef();
  
  // State for storing the validation errors
  const[formErrors, setFormErrors] = useState({});

  // State for showing password
  const[passwordShow, setPasswordShow] = useState();

  // State for intial values of fields
  const[formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    email:'',
    username:'',
    password:'',
    confirmPassword:''
  });

  // Clear the values in fields
  const clearFields = () => {
    setFormData({
      firstname:'',
      lastname:'',
      email:'',
      username:'',
      password:'',
      confirmPassword:''
    })
  }

  // Validation schema
  const validationSchema = yup.object().shape ({
    firstname: yup.string().required('Firstname is required').matches(/^[A-Za-z]+$/, 'Firstname can only contain letters'),
    lastname: yup.string().required('Lastname is required').matches(/^[A-Za-z]+$/, 'Lastname can only contain letters'),
    email: yup.string().required('Email is required').email('Enter Valid Email'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required').min(8,'Minimum of 8 characters'),
    confirmPassword: yup.string().required('Password confirmation is required').oneOf([yup.ref('password'), null], 'Passwords do not match')
  }) 

  // Toggling show password
  const toggleShowPassword = () => {
    setPasswordShow(!passwordShow);
  }

  //Handle changes when user inputs a value in the fields
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  //Handles the submition of form data
  const submit = async (e) => {
    e.preventDefault();
    const retrieveUserId = localStorage.getItem('id');
    
    if(retrieveUserId){
      alert('A user is currently logged in, please logout first');
      navigate('/');
    }else {
      loadingSpinnerRef.current.showModal();
      try{ 
        await validationSchema.validate(formData, { abortEarly: false });
        const response = await fetch('http://fitplan.onlinewebshop.net/db_insertUser.php', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const resultData = await response.json();

        if(resultData.success){
          localStorage.setItem('id', resultData.user_id);
          localStorage.setItem('username', resultData.username);
          setFormErrors({});
          clearFields();
          navigate('/')
        }else {
          console.log(resultData.error);
        }
      
      }
      catch(validationErrors){
        const formattedErrors = {};
        validationErrors.inner.forEach((errors) => {
          formattedErrors[errors.path] = errors.message;
        })
        setFormErrors(formattedErrors);
      }
      finally {
        loadingSpinnerRef.current.close();
      }
    }
  }

  return (
    <div className='sign-up-page' onSubmit={submit}>
      <LoginSignUpComponent
        buttonLink='/login'
        buttonLabel='Login'
        formTitle='Hello, Register Now !'
      >
        <form className='sign-up-page__form'>
          <div className='sign-up-page__field-wrapper'>
            <input 
              type='text' 
              name='firstname' 
              placeholder='Firstname' 
              className='sign-up-page__input'
              value={formData.firstname}
              onChange={handleChange} 
            />
            {formErrors && <p className='sign-up-page__error-message'>{formErrors.firstname}</p>}
            
          </div>
          <div className='sign-up-page__field-wrapper'>
            <input 
              type='text' 
              name='lastname' 
              placeholder='Lastname' 
              className='sign-up-page__input'
              value={formData.lastname}
              onChange={handleChange}  
            />
            {formErrors && <p className='sign-up-page__error-message'>{formErrors.lastname}</p>}
          </div>
          <div className='sign-up-page__field-wrapper'>
            <input 
              type='email' 
              name='email' 
              placeholder='Email' 
              className='sign-up-page__input'
              value={formData.email}
              onChange={handleChange}   
            />
            {formErrors && <p className='sign-up-page__error-message'>{formErrors.email}</p>}
          </div>
          <div className='sign-up-page__field-wrapper'>
            <input 
              type='text' 
              name='username' 
              placeholder='Username' 
              className='sign-up-page__input'
              value={formData.username}
              onChange={handleChange}   
            />
            {formErrors && <p className='sign-up-page__error-message'>{formErrors.username}</p>}
          </div>
          <div className='sign-up-page__field-wrapper'>
            <input 
              type={`${passwordShow ? 'text':'password'}`}
              name='password' 
              placeholder='Password' 
              className='sign-up-page__input'
              value={formData.password}
              onChange={handleChange}   
            />
            {formErrors && <p className='sign-up-page__error-message'>{formErrors.password}</p>}
          </div>
          <div className='sign-up-page__field-wrapper'>
            <input 
              type={`${passwordShow ? 'text':'password'}`} 
              name='confirmPassword' 
              placeholder='Confirm Password' 
              className='sign-up-page__input'
              value={formData.confirmPassword}
              onChange={handleChange}   
            />
            <i className={`sign-up-page__eye-icon fa-solid fa-eye ${passwordShow ? 'sign-up-page__eye-icon-active':''}`} onClick={toggleShowPassword}></i>
            {formErrors && <p className='sign-up-page__error-message'>{formErrors.confirmPassword}</p>}
          </div>
          
          <button type='submit' className='sign-up-page__signup'>Sign Up</button>
          <Link to='/login' className='sign-up-page__login-link'>
            <p className='sign-up-page__login'>Already Have An Account ? Click Here !</p>
          </Link>
        </form>
      </LoginSignUpComponent>

      <dialog className='sign-up-page__dialog' ref={loadingSpinnerRef}>
        <LoadingSpinner />
      </dialog>
    </div>
  )
}

export default SignUpPage
