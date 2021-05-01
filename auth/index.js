const Router = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');
const opts = require('../config/index');

const router = new Router;

router.post('/register', async (req, res) => {
  let {email, password} = req.body;

  let hashedPassword = await bcrypt.hash(password, 7);

  try {
    let candidate = await User.create({
      email, 
      password: hashedPassword,
      username: "user:" + email,
      role: "USER"
    });

    candidate.password = undefined;
    res.status(200).json({
      candidate, message: "ok"
    });
  } catch(e) {
    res.status(500).json({
      message: e.parent.detail
    });
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      return res.status(400).json({
        message: "user not found"
      });
    }

    const validPassword = await bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "invalid password"
      });
    }

    const payload = {email: user.email};
    let token = await jwt.sign(payload, opts.secretOrKey);
    res.status(200).json({
      token
    });
  } catch(e) {
    res.status(500).json({
      message: e
    });
  }
})

module.exports = router;