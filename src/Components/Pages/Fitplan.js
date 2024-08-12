import React, { useEffect, useState, } from 'react';
import Header from '../UIComponents/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import '../Styles/Fitplan.css';
import Footer from '../UIComponents/Footer';
import Catalog from '../Pages/CatalogPage';
import Contacts from '../Pages/ContactUsPage';
import MyRoutinesPage from '../Pages/MyRoutinesPage';
import ViewWorkoutPage from './ViewWorkoutPage';

export const UserInfoContext = React.createContext();

const Fitplan = () => {
  // State for the container of username and id
  const [userInfo, setUserInfo] = useState({
    id: null,
    username: null
  });

  //Retrieve the username from the local storage
  useEffect(() => {
    const retrievedId = localStorage.getItem('id');
    const retrievedUsername = localStorage.getItem('username');
    if(retrievedUsername){
      setUserInfo({id: retrievedId, username: retrievedUsername});
    }
  }, []);

  return (
    <div>
      <UserInfoContext.Provider value={userInfo}>
        <Header/>
          <main>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/view-workout/:selectedId/:selectedName' element={<ViewWorkoutPage />} />
              <Route path='/routines' element={<MyRoutinesPage />} />
            </Routes>
          </main>
        <Footer />
      </UserInfoContext.Provider>
    </div>
  )
}

export default Fitplan
