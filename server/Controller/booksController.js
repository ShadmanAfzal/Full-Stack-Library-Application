import Joi from 'joi';

import * as BookRepository from '../Repository/booksRepository.js';
import { BOOK_CATEGORY } from '../utils/enum/bookCategory.js';

import BookError from '../utils/error/error.js';
import { updateBookValidator, booksValidator} from '../utils/validator/booksValidator.js';

export const getBooks = async (req, res, next) => {
    try {
        const currentPage = Number(req.query.page ?? 1);

        const sortBy = req.query.sortBy;

        const books = await BookRepository.getBooks(currentPage, sortBy);

        res.json({ success: true, message: 'ok', ...books });
    } catch (error) {
        return next(new BookError(error.statusCode, error.message));
    }
}

export const addBooks = async (req, res, next) => {
    try {

        const userId = req.user.id;

        const validationResult = booksValidator.validate(req.body);

        if (validationResult.error) {
            return next(new BookError(400, validationResult.error.message));
        }

        const data = await BookRepository.addBooks(req.body, userId);

        res.json({ success: true, data: data, message: 'book added successfully' });

    } catch (error) {
        return next(new BookError(error.statusCode, error.message));
    }
}

export const updateBooks = async (req, res, next) => {
    try {
        const id = req.params.id;

        const validationResult = updateBookValidator.validate(req.body);

        if (validationResult.error) {
            return next(new BookError(400, validationResult.error.message));
        }

        res.json(await BookRepository.updateBooks(id, req.body));
    } catch (error) {
        return next(new BookError(error.statusCode, error.message));
    }
}

export const deleteBooks = async (req, res, next) => {
    try {
        const id = req.params.id;
        res.json(await BookRepository.deleteBooks(id));
    } catch (error) {
        return next(new BookError(error.statusCode, error.message));
    }
}

export const searchBooks = async (req, res, next) => {
    try {
        const currentPage = Number(req.query.page ?? 1);

        const searchQuery = req.body.query;

        if (!searchQuery) {
            return next(new BookError(400, 'query required'));
        }

        res.json(await BookRepository.searchBooks(currentPage, searchQuery));
    } catch (error) {
        return next(new BookError(error.statusCode, error.message));
    }
}

export const filterBooks = async (req, res, next) => {
    try {
        const currentPage = Number(req.query.page ?? 1);

        const sortBy = req.query.sortBy;

        const filterValidator = Joi.object({
            filter: Joi.string().valid(...Object.values(BOOK_CATEGORY))
                .messages({ '*': 'Genre must be one of Comedy, Science fiction, Biography, Triller, Action, Comic, Mystery, Historical' })
        });

        const filterResult = filterValidator.validate(req.body);

        if (filterResult.error) {
            return next(new BookError(400, filterResult.error.message));
        }

        res.json(await BookRepository.filterBooks(currentPage, req.body.filter, sortBy));
    } catch (error) {
        return next(new BookError(error.statusCode, error.message));
    }
}


export const getBookById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await BookRepository.getBookById(id);

        res.json({ success: true, data: result });

    } catch (error) {
        return next(new BookError(error.statusCode, error.message));
    }
}

export const dowloadBooks = async (req, res, next) => {
    try {
        const books = await BookRepository.dowloadBooks();
        res.send(books);
    } catch (error) {
        return next(new BookError(error.statusCode, error.message))
    }
}