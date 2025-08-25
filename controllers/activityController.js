import ActivityExercise from '../models/activityExercise.js';

// Fungsi untuk mengambil semua daftar aktivitas/olahraga
export const getAllActivities = async (req, res) => {
    try {
        const activities = await ActivityExercise.find({});
        res.status(200).json({ success: true, data: activities });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil daftar aktivitas',
            error: error.message
        });
    }
};

// Fungsi untuk mengambil aktivitas berdasarkan tipe 
export const getActivitiesByType = async (req, res) => {
    try {
        const { type } = req.params;
        if (!['Cardio', 'Strength', 'Workout'].includes(type)) {
            return res.status(400).json({ success: false, message: 'Tipe aktivitas tidak valid' });
        }

        const activities = await ActivityExercise.find({ activityType: type });
        res.status(200).json({ success: true, data: activities });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Gagal mengambil daftar ${type}`,
            error: error.message
        });
    }
};


export default { getAllActivities, getActivitiesByType };