import session from 'express-session';
import { config } from '../../config/config.js';

export const express_session = session({
    name: 'session',
    keys: config.SESSION_KEY,
    secret: config.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
})