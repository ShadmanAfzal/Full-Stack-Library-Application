import session from 'express-session';
import { config } from '../../config/config.js';

export const express_session = session({
    name: 'session',
    keys: config.SESSION_KEY,
    secret: config.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    // cookie: {
    //     secure: false,
    //     path: 'cookie',
    //     expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 365)
    // }
})