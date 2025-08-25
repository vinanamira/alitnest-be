import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActivityExerciseSchema = new Schema({
    activityName: { type: String, required: true, unique: true },
    activityType: { type: String, required: true, enum: ['Cardio', 'Strength', 'Workout'] },
    mets: { type: Number, required: true },
});

const ActivityExercise = mongoose.model('ActivityExercise', ActivityExerciseSchema);
export default ActivityExercise;