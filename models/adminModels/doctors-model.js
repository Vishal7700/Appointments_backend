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
    type: Buffer
  },
  timeslots: [{
    day: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
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



