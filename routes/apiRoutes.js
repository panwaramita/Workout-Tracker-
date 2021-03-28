//get the workout data from the models
var db = require("../models/workout.js");

// get the last workout id
module.exports = function (app) {
    app.get("/api/workouts", (req, res) => {
        db.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    // Create new workout
    app.post("/api/workouts", async (req, res) => {
        try {
            const response = await db.create({ type: "workout" })
            res.json(response);
        }
        catch (err) {
            console.log("error occurred creating a workout: ", err)
        }
    })
    // update the workout based on the id
    app.put("/api/workouts/:id", ({ body, params }, res) => {
        const workoutId = params.id;
        let savedExercises = [];
        db.find({ _id: workoutId })
            .then(dbWorkout => {
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });
        //update the workout when user add the excerise
        function updateWorkout(exercises) {
            db.findByIdAndUpdate(workoutId, { exercises: exercises }, function (err, doc) {
                if (err) {
                    console.log(err)
                }
            })
        }
    })
    //get all the workout for all the days
    app.get("/api/workouts/range", (req, res) => {
        db.find({})
            .then(workout => {
                res.json(workout);
            })
            .catch(err => {
                res.json(err);
            });
    });
};