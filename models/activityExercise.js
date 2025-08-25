import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const activityReferenceSchema = new Schema({
    activityName: { type: String, required: true, unique: true },
    activityType: { type: String, required: true, enum: ['Cardio', 'Strength', 'Workout'] },
    mets: { type: Number, required: true },
});

const ActivityReference = mongoose.model('ActivityReference', activityReferenceSchema);
export default ActivityReference;