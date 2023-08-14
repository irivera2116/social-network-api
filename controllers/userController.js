const { users, thoughts } = require("../models");

const userController = {
  // get all users
  getUsers(req, res) {
    users
      .find()
      .select("-__v")
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // get a specific user using id
  getSingleUser(req, res) {
    users
      .findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(400).json({ message: "No such user exists!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    users
      .create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // update an existing user
  updateUser(req, res) {
    users
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        {
          runValidators: true,
          new: true,
        }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(450).json({ message: "No such user exists!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // delete user and their thoughts
  deleteUser(req, res) {
    users
      .findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(450).json({ message: "No such user exists!" });
        }

        return thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and their thoughts have been deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // add a friend
  addFriend(req, res) {
    users
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(450).json({ message: "No such user exists!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // remove a friend
  removeFriend(req, res) {
    users
      .findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(450).json({ message: "No such user exists!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },
};

module.exports = userController;
