const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  speciality: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  profilePhoto: {
    data: Buffer,
    contentType: String
  },
  timeslots: [{
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    }
  }],
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    comment: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    }
  }]

});

module.exports = mongoose.model("Doctor", doctorSchema);
