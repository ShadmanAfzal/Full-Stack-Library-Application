import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter.get('/login', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

authRouter.get('/google/failure', (req, res) => {
    res.send('Something went wrong');
});

authRouter.get('/google/callback', passport.authenticate(
    'google', {
    failureRedirect: '/auth/google/failure',
    successRedirect: '/',
    failureMessage: true
}));


const isAuthenticated = (req, res, next) => {
    console.log(req.user);
    if (req.isAuthenticated()) return next();

    return res.redirect('/auth/login');
}

export default { authRouter, isAuthenticated };