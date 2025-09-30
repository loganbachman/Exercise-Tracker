/**
 * Add your first name and last name.
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

app.post('/exercises', asyncHandler(async (req, res) => {
    const {name, reps, weight, unit, date} = req.body;

    if(typeof name !== 'string' || name.length === 0) res.status(400).json({Error: "Invalid Request"});
    if(typeof reps !== 'number' || reps <= 0) res.status(400).json({Error: "Invalid Request"});
    if(typeof weight !== 'number' || weight <= 0) res.status(400).json({Error: "Invalid Request"});
    if(!(unit === "lbs" || unit === "kgs")) res.status(400).json({Error: "Invalid Request"});
    if(!exercises.isDateValid(date)) res.status(400).json({Error: "Invalid Request"});
    
    const exercise = await exercises.createExercise(name, reps, weight, unit, date);
    res.status(201).json(exercise);
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const {name, reps, weight, unit, date} = req.query;
    const result = await exercises.getExerArray(name, reps, weight, unit, date);
    res.status(200).json(result);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercises.getExerId(req.params._id);
    if(!exercise) {
        res.status(404).json({Error: "Invalid Request"});
    } else {
        res.status(200).json(exercise);
    }
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    const {name, reps, weight, unit, date} = req.body;

    if(typeof name !== 'string' || name.length === 0) res.status(400).json({Error: "Invalid Request"});
    if(typeof reps !== 'number' || reps <= 0) res.status(400).json({Error: "Invalid Request"});
    if(typeof weight !== 'number' || weight <= 0) res.status(400).json({Error: "Invalid Request"});
    if(!(unit === "lbs" || unit === "kgs")) res.status(400).json({Error: "Invalid Request"});
    if(!exercises.isDateValid(date)) res.status(400).json({Error: "Invalid Request"});
    
    const upd = await exercises.updateExer(req.params._id, req.body);
    if(!upd) {
        res.status(404).json({Error: "Invalid Request"});
    } else {
        res.status(200).json(upd);
    }
}));

app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const deleted = await exercises.deleteExerById(req.params._id);
    if(!deleted) {
        res.status(404).json({Error: "Invalid Request"});
    } else {
        res.status(204).end();
    }
}));

