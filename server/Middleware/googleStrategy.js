import strategy from 'passport-google-oauth20';
import { config } from '../../config/config.js';

const GoogleStrategy = strategy.Strategy;

export const googleStrategy = new GoogleStrategy({
    clientID: config.Client_ID,
    clientSecret: config.Client_Secret,
    callbackURL: config.CALLBACK_URL,
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        return cb(null, profile);
    }
)