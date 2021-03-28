//get the mongoose database
const mongoose = require("mongoose");
//get the schema
const Schema = mongoose.Schema;
//create the workout schema
const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },    
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter a exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter a exercise name"
        },
        duration: {
          type: Number,
          required: "Enter a exercise duration in minutes"
        },
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);
//create the dynamic property total duration to get the total time of excercise
workoutSchema.virtual("totalDuration").get(function() {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});
//create the model from the schema
const Workout = mongoose.model("Workout", workoutSchema);
//export the model
module.exports = Workout;