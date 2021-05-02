let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/userModel');

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.API_KEY;
  console.log(opts);

  passport.use(new JwtStrategy(opts, async (jwt_payload, next) => {
    console.log('payload received', jwt_payload);

    const user = await User.findOne({ where: { email: jwt_payload.email } });

    if (user) {
      next(null, user)
    } else {
      next(null, false);
    }
  }))
};
