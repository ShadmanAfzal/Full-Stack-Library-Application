import strategy from 'passport-google-oauth20';
import { config } from '../../config/config.js';
import db from '../Database/client.js';

const GoogleStrategy = strategy.Strategy;

export const googleStrategy = new GoogleStrategy({
    clientID: config.Client_ID,
    clientSecret: config.Client_Secret,
    callbackURL: config.CALLBACK_URL,
},
    async function (accessToken, refreshToken, profile, done) {

        const user = await db.UserDB.findCreateFind({
            where: {
                emailId: profile._json.email,
            },
            defaults: {
                emailId: profile._json.email,
                name: profile._json.name,
                photoURL: profile._json.picture,
            },
        })

        console.log(user);

        return done(null, user[0]);
    }
)