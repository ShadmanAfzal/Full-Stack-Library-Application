import React, {useState, useEffect } from "react";
import { Route, Routes, HashRouter } from 'react-router-dom';
import { AddBook } from './components/Books/AddBook';
import { EditBook } from './components/Books/EditBook';
import { SearchBooks } from './components/Books/SearchBooks';
import App from './App';
import axios from "axios";
import { Books } from "./components/Books/Books";

export const Router = (props) => {
    return <HashRouter>
        <Routes>
            <Route path='/' element={<Books {...props} exact/>} />
            <Route path='/add' element={<AddBook {...props} exact/>} />
            <Route path='/edit/:id' exact element={<EditBook />} />
            <Route path='/search' element={<SearchBooks />} />
        </Routes>
    </HashRouter>;
}