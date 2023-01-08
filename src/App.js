import React, {useState, useEffect} from 'react';

import { NavBar } from './components/Books/components/Navbar.js';
import { Router } from './Router.js';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import axios from 'axios';

function App() {

  const [user, setUser] = useState({});

    const getUserDetails = async () => {
        
        const response = await axios.get('/user');

        const user = response.data;

        setUser(user);
    }

    useEffect(() => {
        getUserDetails();
    }, [])

  return (
    <>
      <NavBar {...user}/>
      <Router {...user}/>
    </>
  );
}

export default App;
