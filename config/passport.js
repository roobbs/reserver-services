require("./database");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "thisIsAgreatProjectKey",
};

const strategy = new JWTstrategy(options, async (payload, done) => {
  try {
    const user = await BlogUser.findById(payload.sub);
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
