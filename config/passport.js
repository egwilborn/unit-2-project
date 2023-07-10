const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
//Require your User Model here!
const User = require("../models/user");
// configuring Passport!
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, cb) {
      // a user has logged in via OAuth!
      // refer to the lesson plan from earlier today in order to set this up
      try {
        //find a profile in the db that matches the profile of the user logging in
        //set that profile to user variable
        let user = await User.findOne({ googleId: profile.id });
        //if there's a matching user, provide it to passport
        if (user) return cb(null, user);
        // if theres not matching user,
        user = await User.create({
          userName: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
        });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  const user = await User.findById(id);
  done(null, user); // req.user = user document from the database
  // When you call this done function passport assigns the user document to req.user, which will
  // be availible in every Single controller function, so you always know the logged in user
});
