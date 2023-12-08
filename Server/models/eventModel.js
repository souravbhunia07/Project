const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Event Title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Event Description"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Event", eventSchema);
