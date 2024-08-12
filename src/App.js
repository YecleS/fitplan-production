import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Pages/LoginPage';
import SignUpPage from './Components/Pages/SignUpPage';
import Fitplan from './Components/Pages/Fitplan';

function App() {

  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/*' element={<Fitplan />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
