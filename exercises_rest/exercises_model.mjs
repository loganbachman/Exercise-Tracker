/**
 * Add your first name and last name.
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

const Exercise = mongoose.model(EXERCISE_DB_NAME, exerciseSchema);

/**
 * Create an exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {Number} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
};

function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

const getExerArray = async (name, reps, weight, unit, date) => {
    const filters = {};
    if(name && typeof name === "string") filters.name = name;
    if(reps && typeof reps === "number") filters.reps = reps;
    if(weight && typeof weight === "weight") filters.weight = weight;
    if(unit && (unit === "lbs" || unit === "kgs")) filters.unit = unit;
    if(date && isDateValid(date)) filters.date = date;

    const exercises = await Exercise.find(filters);
    return exercises;
};

const getExerId = async (id) => {
    return await Exercise.findById(id);
};

const updateExer = async(id, updateData) => {
    return await Exercise.findByIdAndUpdate(id, updateData);
};

const deleteExerById = async (id) => {
    return await Exercise.findByIdAndDelete(id);
}

export { connect, createExercise, isDateValid, getExerArray, 
        getExerId, updateExer, deleteExerById};