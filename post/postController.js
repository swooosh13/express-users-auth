const Post = require('../model/postModel');
const User = require('../model/userModel');

module.exports = {
  ok(req, res) {
    res.status(200).json({ message: "ok" });
  },
  async createPost(req, res) {
    const { title, content, userId } = req.body;
    try {
      const user = await User.findOne({
        where: {
          id: userId
        }
      });

      if (!user) {
        return res.status(200).json({
          message: "user not found"
        });
      }

      Post.create({
        title, content, userId
      }).then(post => res.status(200).json({
        message: "ok"
      })).catch(err => res.status(200).json({
        message: err.name
      }));

    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
  async getPostsByParams(req, res) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (!page || !limit) {
      return res.status(400).json({
        message: "incorrect params"
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = (page) * limit;

    const result = {};

    if (endIndex < (await Post.count())) {
      result.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit
      };
    }

    try {
      result.data = await Post.findAll();
      result.totalPages = Math.ceil(result.data.length / limit);
      result.data = result.data.slice(startIndex, endIndex);

      if (!result.data.length) {
        return res.status(200).json({
          message: "zero posts"
        });
      }

      res.status(200).json({
        result
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      })
    }

  }
}