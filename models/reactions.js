// require moment
const moment = require("moment");
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
      type: Data,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format("MMM D, YYYY [at] hh:mm a"),
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
