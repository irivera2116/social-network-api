// require dayjs
const dayjs = require("dayjs");
const { Schema, Types } = require("mongoose");

// build the Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      reuqired: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dayjs(timestamp).format("MMM D, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
