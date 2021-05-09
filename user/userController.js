const User = require('../model/userModel');

module.exports = {
  ok(req, res) {
    res.status(200).json({
      message: "ok"
    })
  },
  async getUserByEmail(req, res) {
    const email = req.query.email;
    console.log(email);
    try {
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (user == null) {
        return res.status(200).json({
          message: "user not found", user, email
        });
      }

      res.status(200).json({
        user
      });
    } catch (e) {
      res.status(400).json({
        message: "cannot get user by email", email
      })
    }
  },
  async getUser(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findOne({
        where: {
          id: id
        }
      });

      if (user == null) {
        return res.status(200).json({
          message: "user not found"
        });
      }
      res.status(200).json({
        user
      });
    } catch (e) {
      res.status(400).json({
        message: "cannot get user by id"
      })
    }
  },
  
  async getUsers(req, res) {

    try {
      const users = await User.findAll();

      if (users == null) {
        return res.status(400).json({
          message: "users not found"
        });
      }

      let totalCount = await User.count();

      usersResponse = users.map(user => {
        user.password = null;
        return user;
      });

      return res.status(200).json({
        totalCount, users: usersResponse
      });
    } catch (e) {
      res.status(400).json({
        message: "cannot get users"
      })
    }
  },
  async deleteUserPosts(req, res) {
    const id = req.params.id;
    try {
      const candidate = await User.findOne({ where: { id: id } })
        .then(user => {
          if (!user) return;
          user.getPosts().then(posts => {
            for (post of posts) {
              if (post.userId == id) post.destroy();
            }
          })
        });

      res.status(200).json({
        message: "posts has been deleted."
      })
    } catch (e) {
      res.status(400).json({
        message: e.name
      });
      console.log(e);
    }
  },
  async getUserPosts(req, res) {
    const id = req.params.id;

    try {
      const response = await User.findByPk(id).then(user => {
        if (!user) return res.status(400).json({ message: "user not found" });
        user.getPosts()
          .then(posts => {
            let totalCount = posts.length;
            res.status(200).json({ totalCount, posts });
          })
          .catch(err => console.log(err));
      });
    } catch (e) {
      console.log(e);
    }
  }
};
