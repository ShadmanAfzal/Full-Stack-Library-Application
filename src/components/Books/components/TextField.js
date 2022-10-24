import React from "react";
import { useField, ErrorMessage, Field } from "formik";
import './css/TextFieldStyle.css';

export const TextField = ({ label, useTextArea, ...props }) => {
    const [field, meta] = useField(props);

    if (useTextArea) {
        return <div className="input-container">
            <label htmlFor={field.name} className='text-field-header'>
                {label}
            </label>
            <textarea
                className='text-area'
                rows={3}
                {...field} {...props}
            >
            </textarea>
            <ErrorMessage name={field.name} component="div" className="errorMessage" />
        </div>
    }

    return <div className="input-container">
        <label htmlFor={field.name} className='text-field-header'>
            {label}
        </label>
        <input
            autoComplete={false}
            className='text-field'
            {...field} {...props}
        >
        </input>
        <ErrorMessage name={field.name} component="div" className="errorMessage" />
    </div>
}