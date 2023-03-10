import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { utils, writeFile } from "xlsx";

import { BASE_URL } from "../../utils/strings";
import { BookTable } from "./components/BookTable";
import { Dropdown } from "../../utils/Dropdown";
import { Pagination } from "@mui/material";
import { BOOK_CATEGORY, SORT_BY } from "../../utils/enum";
import { HiDownload, HiPlus } from 'react-icons/hi'
import axios from "axios";



export const Books = (currentUser) => {

    const navigator = useNavigate();

    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [filter, setFilter] = useState(null);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState();

    const onDeleteHanlder = async ({id, userId}) => {

        if(userId !== currentUser.id) return;

        const deleteResult = await fetch(`${BASE_URL}/books/${id}`, { method: 'DELETE' })

        const jsonResult = await deleteResult.json();

        if (jsonResult.success) {
            const filteredBooks = books.filter(book => book.id !== id);
            setBooks(filteredBooks);
            return alert("Book deleted successfully");
        }

        alert(jsonResult.message)
    }

    const downloadBooks = async () => {

        const downloadResult = await fetch(`${BASE_URL}/books/download`);

        const downloadResponse = await downloadResult.json();

        if (downloadResult.status === 200) {
            const worksheet = utils.json_to_sheet(downloadResponse);
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, "Sheet1");
            writeFile(workbook, "DataSheet.xlsx");
        }
    }

    async function fetchBooks(page) {

        let response;

        if (sortBy) {
            response = await fetch(`${BASE_URL}/books?sortBy=${sortBy}&page=${page}`);
        } else {
            response = await fetch(`${BASE_URL}/books?page=${page}`);
        }


        const responseBody = await response.json();

        const books = responseBody.data;

        setTotalPage(responseBody.totalPage);

        setBooks(books);
    }

    const fetchFilterBooks = async (page) => {

        if (!filter) return;

        let uri;

        if (sortBy) {
            uri = `${BASE_URL}/books/filter?sortBy=${sortBy}&page=${page}`;
        }
        else {
            uri = `${BASE_URL}/books/filter?page=${page}`;
        }

        const response = await axios.post(uri, {filter});

        const { data } = response;

        const books = data.data;

        setTotalPage(data.totalPage);

        setBooks(books);
    }

    const filterHandler = (filter) => {
        setFilter(filter);
        setPage(1);
    }

    const sortHandler = (sortBy) => {
        setSortBy(sortBy);
        setPage(1);
    }

    useEffect(() => {
        if (filter) {
            fetchFilterBooks(1);
        }
        else {
            fetchBooks(1);
        }
    }, [sortBy]);

    useEffect(() => {
        fetchFilterBooks(1);
    }, [filter]);

    useEffect(() => {
        fetchBooks(1);
    }, []);

    return <div className="container my-2" id="container">
        <div className="d-flex justify-content-end">
            <div className="d-flex gap-2">
                <Dropdown title={'Sort By'} id="sort" filterHandler={sortHandler} values={SORT_BY} />
                <Dropdown title={'Filter By'} filterHandler={filterHandler} values={BOOK_CATEGORY} />
                <button
                    className="btn btn-sm bg-dark text-white"
                    onClick={downloadBooks}>
                    <HiDownload />
                    Export
                </button>
                <button
                    className="btn btn-sm bg-dark text-white"
                    onClick={() => {
                        navigator('/add')
                    }}>
                    <HiPlus />
                    Add Books
                </button>
            </div>
        </div>
        <BookTable books={books} onDelete={onDeleteHanlder} currentUser={currentUser} />
        <div className="d-flex justify-content-center">
            <Pagination
                count={totalPage}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={(_, page) => {
                    setPage(page);
                    if (filter) {
                        fetchFilterBooks(page);
                    }
                    else {
                        fetchBooks(page);
                    }
                }} />
        </div>
    </div>
}