//get the mongoose database
const mongoose = require("mongoose");
//get the schema
const Schema = mongoose.Schema;
//create the workout schema
const workoutSchema = new Schema(
  {
    //day field
    day: {
      type: Date,
      default: Date.now
    },    
    //excercise array field
    exercises: [
      {
        //type field
        type: {
          type: String,
          trim: true,
          required: "Enter a exercise type"
        },
        //name field
        name: {
          type: String,
          trim: true,
          required: "Enter a exercise name"
        },
        //duation field
        duration: {
          type: Number,
          required: "Enter a exercise duration in minutes"
        },
        //weight field
        weight: Number,
        //rep field
        reps: Number,
        //sets field
        sets: Number,
        //distance field
        distance: Number
      }
    ]
  },
  {//create virtual field to get the total duration time
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