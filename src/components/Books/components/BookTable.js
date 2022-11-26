import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import "./css/BookTableStyle.css";

export const BookTable = ({ books, onDelete }) => {

    const naviator = useNavigate();

    const editBook = (book) => {
        naviator(`/edit/${book.id}`);
    }

    return <div className="tab-content table-responsive">
        <table className="table table-hover table-borderless">
            <thead>
                <tr>
                    <th scope="col" className="col-1">#</th>
                    <th scope="col" className="col-2">Title</th>
                    <th scope="col" className="col-2">Author</th>
                    <th scope="col" className="col-5">Description</th>
                    <th scope="col" className="col-1">Genre</th>
                    <th scope="col" className="col-1">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map((book, index) =>
                        <tr key={book.id}>
                            <td scope="row" className="col-1">{index + 1}</td>
                            <td scope="row" className="col-2">{book.title}</td>
                            <td scope="row" className="col-2">{book.author}</td>
                            <td scope="row" className="col-5">{book.description.slice(0, 100)} {book.description.length >= 100 ? '...' : ''}</td>
                            <td scope="row" className="col-1">{book.genre}</td>
                            <td scope="row" className="col-1">
                                <FiEdit onClick={() => editBook(book)} className="icon mx-2" />
                                <FiTrash2 onClick={() => onDelete(book.id)} className="icon" />
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
}