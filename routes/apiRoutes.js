//get the workout data from the models
var db = require("../models");

// get the last workout id
module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    });
    
    // Create new workout
    app.post("/api/workouts", async (req, res)=> {
        try{
            const response = await db.Workout.create({type: "workout"})
            res.json(response);
        }
        catch(err){
            console.log("error occurred creating a workout: ", err)
        }
    })

    // Used by api.js to add an exercise to a workout
    app.put("/api/workouts/:id", ({body, params}, res) => {
        const workoutId = params.id;
        let savedExercises = [];
        // gets all the currently saved exercises in the current workout
        db.Workout.find({_id: workoutId})
            .then(dbWorkout => {
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises){
            db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(err, doc){
            if(err){
                console.log(err)
            }

            })
        }
            
    })

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    }); 
};