import cors from 'cors';
import path from 'path';
import express from "express";

import { config } from "./config/config.js";
import { fileURLToPath } from "url";
import { errorHandler } from "./server/Middleware/errorHandler.js";

import booksRouter from "./server/Router/bookRouter.js";

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, './dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const PORT = config.PORT;

const app = express();

if (config.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);
    app.use(webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
        },
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.json());

app.use(cors());

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => res.sendFile(HTML_FILE));

app.use('/api/v1/books', booksRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on PORT : ${PORT}`));