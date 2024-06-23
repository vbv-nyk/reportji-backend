
import express from 'express'

export const router = express.Router();
import passport from 'passport'


router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/success',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to frontend with user info or token.
    res.send("You've signed in");
  }
);
