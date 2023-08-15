// require mongoose and dayjs
const dayjs = require("dayjs");
const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reactions');

// build the schema
const thoughtSchema = new Schema(
  {
    thoughtMess: {
      type: String,
      required: "a message is needed",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dayjs(timestamp).format("MMM D, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;
