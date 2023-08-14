const { thoughts, users } = require("../models");

const thoughtController = {
  // get thoughts
  getThoughts(req, res) {
    thoughts
      .find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // get a single thought by id
  getSingleThought(req, res) {
    thoughts
      .findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(450).json({ message: "You are thoughtless!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // create a thought
  createThought(req, res) {
    thoughts
      .create(req.body)
      .then((dbThoughtData) => {
        return users.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(450)
            .json({
              message:
                "Thought was created but the user is nowhere to be found!",
            });
        }
        res.json({ message: "Thought has been created!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // update your thoughts
  updateThought(req, res) {
    thoughts
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(450).json({ message: "No id for this thought." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // delete your thought
  deleteThought(req, res) {
    thoughts
      .findOneandRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(450).json({ message: "No id for this thought." });
        }

        return users.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(450)
            .json({
              message:
                "Thought was created but the user is nowhere to be found!",
            });
        }
        res.json({ message: "Thought had been deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // add a reaction to a thought
  addReaction(req, res) {
    thoughts
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addtoSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(450).json({ message: "No such user exists!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },

  // remove a reaction from a thought
  removeReaction(req, res) {
    thoughts
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(450).json({ message: "No thoughts with this id." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(450).json(err);
      });
  },
};

module.exports = thoughtController;
