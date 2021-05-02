require('dotenv').config();

const express = require('express');
const passport = require('passport');

const app = express();
const userRouter = require('./user/index').userRouter;
const postRouter = require('./post/index').postRouter;
const authRouter = require('./auth/authRouter');

const { db } = require('./db/index');


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/users', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/posts', passport.authenticate('jwt', { session: false }), postRouter);
app.use('/auth', authRouter);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log("app started on port:", PORT);
    })

    db.authenticate()
      .then(() => console.log("db connected"))
      .catch(err => console.log("Error: ", err));
  } catch (e) {
    console.log(e);
  }
}

start();
console.log(process.env.API_KEY);