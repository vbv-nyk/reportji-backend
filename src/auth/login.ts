
import express from 'express';
import passport from 'passport';

export const router = express.Router();

router.get('/google', 
  passport.authenticate('google', { scope: ['profile'] })
);

router.get('/google/success',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to frontend with user info or token.
    res.send("You've signed in");
  }
);