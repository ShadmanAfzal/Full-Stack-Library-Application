import React, {useState, useEffect } from "react";
import { Route, Routes, HashRouter } from 'react-router-dom';
import { AddBook } from './components/Books/AddBook';
import { EditBook } from './components/Books/EditBook';
import { SearchBooks } from './components/Books/SearchBooks';
import App from './App';

export const Router = () => {
    const [user, setUser] = useState({});

    const getUserDetails = async () => {
        const userResponse = await fetch('/user', {
            method: 'GET',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const user_details = await userResponse.json();

        console.log(user_details);

        setUser(user_details);
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return <HashRouter>
        <Routes>
            <Route path='/' element={<App user={user}/>} />
            <Route path='/add' element={<AddBook />} />
            <Route path='/edit/:id' exact element={<EditBook currentUser={user}/>} />
            <Route path='/search' element={<SearchBooks />} />
        </Routes>
    </HashRouter>;
}