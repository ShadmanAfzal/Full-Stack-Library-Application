import React, { useState, useEffect } from 'react';
import { AppBar } from '../Navbar/Appbar';
import { Formik, Form } from "formik";
import { TextField } from './components/TextField';
import { BASE_URL } from '../../utils/strings';
import { useLocation, useNavigate } from "react-router-dom";
import { GenreSelector } from './components/GenreSelector';
import bookImage from '../../assets/book.jpg';
import "./css/EditBookStyle.css";
import * as Yup from "yup";
import "./css/Book.css"
import { Loader } from './components/Loader';

export const EditBook = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [bookDetails, setBookDetails] = useState({
        id: '',
        title: '',
        author: '',
        description: '',
        photo_url: '',
        genre: '',
    });

    const [isLoading, setLoading] = useState(true);

    const fetchBookDetails = async () => {
        const paramArray = location.pathname.split('/');
        const bookId = paramArray[paramArray.length - 1];
        const bookResponse = await fetch(`${BASE_URL}/books/${bookId}`);

        if (bookResponse.status === 200) {
            const jsonRespone = await bookResponse.json();
            console.log(jsonRespone);

            await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

            setBookDetails({
                id: jsonRespone.data.id,
                title: jsonRespone.data.title,
                author: jsonRespone.data.author,
                description: jsonRespone.data.description,
                photo_url: jsonRespone.data.photo_url,
                genre: jsonRespone.data.genre,

            });


            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBookDetails();
    }, [])


    const validator = Yup.object({
        title: Yup.string()
            .required('Title is required'),
        author: Yup.string()
            .required('Author name required'),
        description: Yup.string()
            .required('Description is required'),
        photo_url: Yup.string().url('Invalid url').required('Image url is required'),
    })

    const onSubmitHandler = async (values, id) => {

        const fetchResult = await fetch(`${BASE_URL}/books/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(values),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        const jsonResult = await fetchResult.json();

        if (jsonResult.success) {
            alert('Book updated successfully');
            return navigate('/');
        }

        alert(jsonResult.message);
    }

    return <>
        {
            isLoading && <Loader />
        }
        <div className='container'>
            <div className='row'>
                <div className='col-md-7'>
                    <div className='book-form'>
                        <h2 className="my-4 font-weight-bold-display-4"> Update books Details</h2>
                        <Formik
                            enableReinitialize
                            initialValues={bookDetails}
                            validationSchema={validator}
                        >
                            {(formik) => {
                                return <Form onSubmit={
                                    (e) => {
                                        e.preventDefault();
                                        if (formik.isValid) {
                                            onSubmitHandler(formik.values, bookDetails.id)
                                        }
                                    }
                                }>
                                    <TextField label="Title" name="title" type="text" />
                                    <TextField label="Author" name="author" type="text" />
                                    <TextField useTextArea label="Description" name="description" type="text" />
                                    <TextField label="Image" name="photo_url" type="url" />
                                    <GenreSelector initialValue={bookDetails.genre} onGenreChange={(genre) => formik.values.genre = genre} />
                                    <button className={`btn w-100 my-2 ${formik.isValid ? 'btn-success' : 'btn-secondary'}`}>Submit</button>
                                </Form>
                            }}
                        </Formik>
                    </div>
                </div>

                <div className='col-md-5'>
                    <img src={bookImage} id='bookImage' className='img-fluid my-auto w-100' alt='bookImage' />
                </div>

            </div>
        </div>
    </>
}