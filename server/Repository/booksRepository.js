import { Op } from "sequelize";
import db from "../Database/client.js";
import { SortBooks } from "../Services/sortBooks.js";
import BookError from "../utils/error/error.js";

const UUID_REGEX = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const ITEM_PER_PAGE = 5;

export const getBooks = async (currentPage, sortBy) => {

    const result = await db.BookDB.findAll({ raw: true });

    const sortedResult = SortBooks(result, sortBy);

    const paginatedResult = sortedResult.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return { 'totalPage': Math.ceil(result.length / ITEM_PER_PAGE), 'currentPage': currentPage, 'count': paginatedResult.length, data: paginatedResult };
}

export const searchBooks = async (currentPage, searchQuery) => {

    const result = await db.BookDB.findAll({
        raw: true,
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: `%${searchQuery}%`,
                    }
                },
                {
                    description: {
                        [Op.iLike]: `%${searchQuery}%`,
                    }
                },
                {
                    author: {
                        [Op.iLike]: `%${searchQuery}%`,
                    }
                }
            ]
        },
    });

    const paginatedResult = result.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return { 'totalPage': Math.ceil(result.length / ITEM_PER_PAGE), 'currentPage': currentPage, 'count': paginatedResult.length, data: paginatedResult };
}

export const filterBooks = async (currentPage, filterBooks, sortBy) => {

    const result = await db.BookDB.findAll({
        raw: true,
        where: {
            genre: filterBooks
        }
    });

    const sortedResult = SortBooks(result, sortBy);

    const paginatedResult = sortedResult.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return { 'totalPage': Math.ceil(result.length / ITEM_PER_PAGE), 'currentPage': currentPage, 'count': paginatedResult.length, data: paginatedResult };
}

export const addBooks = async (book, userId) => {

    if (!book.genre) {
        book.genre = '';
    }

    const insertedBook = await db.BookDB.create({
        'userId': userId,
        ...book,
    });

    return insertedBook.get();
}

export const updateBooks = async (id, book) => {

    if (UUID_REGEX.test(id) === false) {
        throw new BookError(404, 'Book not found');
    }

    const result = await db.BookDB.update(book, { where: { "id": id }, returning: true });

    return { 'success': true, 'message': 'book details updated successfully', data: result[1] };
}

export const deleteBooks = async (id) => {

    if (UUID_REGEX.test(id) === false) {
        throw new BookError(404, 'Book not found');
    }

    const count = await db.BookDB.destroy({ where: { id: id } });

    if (!count) {
        throw new BookError(404, 'Book not found');
    }

    return { 'success': true, 'message': `Deleted successfully` };

}

export const getBookById = async (id) => {
    if (UUID_REGEX.test(id) === false) {
        throw new BookError(404, 'Book not found');
    }

    const bookDetail = await db.BookDB.findOne({ where: { id: id } })

    if (!bookDetail) {
        throw new BookError(404, 'Book not found');
    }

    return bookDetail.get();
}

export const dowloadBooks = async () => {
    const books = await db.BookDB.findAll({ order: [['modified_date', 'DESC']] });
    return books;
}