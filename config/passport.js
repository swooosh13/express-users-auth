let JwtStrategy = require('passport-jwt').Strategy;
const opts = require('./index');
const User = require('../model/userModel');

module.exports = (passport) => {
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
