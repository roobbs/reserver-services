const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
require("dotenv").config();

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "thisIsAgreatProjectKey",
};

passport.use(
  new JWTstrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  })
);

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback",
};

passport.use(
  new GoogleStrategy(
    googleOptions,
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
