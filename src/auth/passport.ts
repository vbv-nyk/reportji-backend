import 'dotenv/config'
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
export const initialize_passport = () => {
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:process.env.GOOGLE_SUCCESS_CALLBACK_URI
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        return cb(null, profile);
      }
    ));

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((obj, done) => {
      done(null, obj);
    });
}