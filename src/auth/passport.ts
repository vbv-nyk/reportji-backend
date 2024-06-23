
import passport from "passport" 
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'dotenv/config';

export const initializePassport = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_SUCCESS_CALLBACK_URI
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return cb(null, profile);
  }));

  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      return done(null, user);
    });
  });

  passport.deserializeUser((user, done) => {
    process.nextTick(() => {
      return done(null, user);
    });
  });
};


export const isAuthenticated = (req,res,next) => {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({message: 'unauthorized'});
  }
}