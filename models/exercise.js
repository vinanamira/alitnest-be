import mongoose from "mongoose";

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },

    exerciseType: { type: String, require: true, enum:['Cardio', 'Strength', 'Workout'] },
    exerciseName: { type: String, require: true },
    druation: { type: Number, require: true }, // minutes
    caloriesBurned: { type: Number, require: true },

    // Strength
    sets: { type: Number },
    reps: { type: Number },
    weigth: { type: Number },

    // Upload
    imgae: { type: String }
}, { timestamps: true });

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;