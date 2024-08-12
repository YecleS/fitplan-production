import React,{ useState, useEffect, useRef } from 'react';
import '../Styles/LoginPage.css';
import LoginSignUpComponent from '../UIComponents/LoginSignUpComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UIComponents/LoadingSpinner';


const LoginPage = () => {
  //Navigation ref
  const navigate = useNavigate();

  //Dialog ref
  const loadingSpinnerRef = useRef();

  //State for users data fetched from the backend
  const [userData, setUserData] = useState([]);

  //State for the error messages thrown by the yup validation
  const [showPassword, setShowPassword] = useState();

  //Initial values for input fields inside the form
  const [formData, setFormData] = useState ({
    username:'',
    password:''
  });

  //Handle changes when user inputs a value in the fields
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  //Clear the fields
  const clearFields = () => {
    setFormData({
      username:'',
      password:''
    });
  }

  //Pop up message for invalid login
  const errorMessage = (message) => {
    toast.error((message), {
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

  //Toggle the show password icon
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  //Handles the submition of form data
  const submit = async (e) => {
    e.preventDefault();
    const retrieveUserId = localStorage.getItem('id');

    if(retrieveUserId){
      alert('A user is currently logged in, please logout first');
      navigate('/');
    }else {
      if(formData.username.trim().length > 0 && formData.password.trim().length > 0){
        loadingSpinnerRef.current.showModal();
        try {
          const response = await fetch('http://fitplan.onlinewebshop.net/db_getUsers.php', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
          });
          
          const data = await response.json();

          if(data.success){
            localStorage.setItem('id', data.id);
            localStorage.setItem('username', data.username);

            clearFields();
            navigate('/')
          }else {
            errorMessage(data.error);
          }

        }
        catch (error){
          console.error(error);
        }
        finally {
          loadingSpinnerRef.current.close();
        }

      }else {
        loadingSpinnerRef.current.close();
        errorMessage('Invalid Username & Password');
      }
    }
  }

  return (
    <div className='login-page'>
      <LoginSignUpComponent
        buttonLink='/sign-up'
        buttonLabel='Sign Up'
        formTitle='Hi, Welcome Back !' 
      >
        <form className='login-page__form' onSubmit={submit}>
          <div className='login-page__field-wrapper'>
            <input 
              type='text' 
              name='username' 
              placeholder='Username' 
              className='login-page__input'
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className='login-page__field-wrapper'>
            <input 
              type={`${showPassword ? 'text':'password'}`} 
              name='password' 
              placeholder='Password' 
              className='login-page__input'
              value={formData.password}
              onChange={handleChange}
            />
            <i className={`login-page__eye-icon fa-solid fa-eye ${showPassword ? 'login-page__eye-icon-active':''}`} onClick={toggleShowPassword}></i>
          </div>
          <button type='submit' className='login-page__submit'>LogIn</button>
          <Link to='/sign-up' className='login-page__signup-link'>
            <p className='login-page__signup'>Dont Have An Account ? Click Here !</p>
          </Link>
        </form>
      </LoginSignUpComponent>

      <dialog className='login-page__dialog' ref={loadingSpinnerRef}>
        <LoadingSpinner />
      </dialog>
      <ToastContainer /> 
    </div>
  )
}

export default LoginPage
