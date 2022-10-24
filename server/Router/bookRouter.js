import express from 'express';
import * as BookService from '../Controller/booksController.js';

const booksRouter = express.Router();

booksRouter.get('/', BookService.getBooks);

booksRouter.post('/', BookService.addBooks);

booksRouter.get('/download', BookService.dowloadBooks);

booksRouter.get('/:id', BookService.getBookById);

booksRouter.post('/search', BookService.searchBooks);

booksRouter.post('/filter', BookService.filterBooks);

booksRouter.patch('/:id', BookService.updateBooks);

booksRouter.delete('/:id', BookService.deleteBooks);


export default booksRouter;