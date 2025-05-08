const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [String], // contient les 2 userIds de la conversation
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
