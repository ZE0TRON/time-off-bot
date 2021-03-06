const mongoose = require("mongoose");

const timeOffSchema = new mongoose.Schema({
  user_name: String,
  user_id: String,
  policy_name: String,
  date: String
});

// Gets user's time offs from database
timeOffSchema.statics.getTimeOffsByUser = function(userName) {
  return new Promise((resolve, reject) => {
    TimeOff.find({ user_name: userName }, (err, timeOffs) => {
      if (err) {
        reject(err);
      }
      if (timeOffs.length == 0) {
        reject("You have no time off request");
      }
      resolve(timeOffs);
    });
  });
};

// Gets all timeOffs from database
timeOffSchema.statics.getTimeOffs = function() {
  return new Promise((resolve, reject) => {
    TimeOff.find({}, (err, timeOffs) => {
      if (err) {
        reject(err);
      }
      if (timeOffs.length == 0) {
        reject("There is no timeOff request");
      }
      resolve(timeOffs);
    });
  });
};

timeOffSchema.statics.deleteTimeOffs = function(timeOffs) {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < timeOffs.length; i++) {
      const timeOff = timeOff[i];
      try {
        await TimeOff.deleteOne({
          user_id: timeOff.user_id,
          date: timeOff.date,
          policy: timeOff.policy
        });
      } catch (e) {
        reject(e);
      }
    }
    resolve(true);
  });
};

const TimeOff = mongoose.model("TimeOff", timeOffSchema);
module.exports = TimeOff;
