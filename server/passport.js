const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("./models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOneAndUpdate(
          { googleId: profile.id },
          {
            $setOnInsert: {
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.email,
            },
          },
          { upsert: true, new: true }
        );

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOneAndUpdate(
          { facebookId: profile.id },
          {
            $setOnInsert: {
              githubkId: profile.id,
              displayName: profile.displayName,
              email: profile.email,
            },
          },
          { upsert: true, new: true }
        );

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOneAndUpdate(
          { facebookId: profile.id },
          {
            $setOnInsert: {
              facebookId: profile.id,
              displayName: profile.displayName,
              email: profile.email,
            },
          },
          { upsert: true, new: true }
        );

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  // try {
  //   const user = await User.findById(user);
  //   done(null, user);
  // } catch (error) {
  //   done(error, null);
  // }
});
