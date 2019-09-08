const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const passport = require('passport');
const Session = require('./db/Controllers/Session');

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_ID,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK,
  scope: ['r_emailaddress', 'r_liteprofile'],
}, ((accessToken, refreshToken, profile, done) => {
  // asynchronous verification, for effect...
  const email = profile.emails[0].value;
  const { id } = profile;
  process.nextTick(() => {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    Session.findOrCreateSession(email, id)
      .then(() => {
        return done(null, profile);
      })
      .catch((err) => {
        console.error(err);
        return done(err, null);
      });
  });
})));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Session.getSessionById(id)
    .then((user) => {
      done(null, user[0]);
    })
    .catch((err) => {
      done(err);
    });
});
