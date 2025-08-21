import Workout from '../models/workout.js';

export const createWorkout = async (req, res) => {
    try {
        const workout = new Workout(req.body);
        await workout.save();
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ message: "Error saving workout", error: error.message });
    }
};

export const getDailyWorkouts = async (req, res) => {
    try {
        const { userId, date } = req.params;

        if (!userId || !date) {
            return res.status(400).json({
                success: false,
                message: 'Parameter userId dan date wajib diisi'
            });
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Format tanggal tidak valid. Gunakan YYYY-MM-DD'
            });
        }

        const startDate = new Date(parsedDate.setHours(0, 0, 0, 0));
        const endDate = new Date(parsedDate.setHours(23, 59, 50, 999));

        const workouts = await Workout.find({
            userId,
            createdAt: { $gte: startDate, $lte: endDate }
        }).select('workoutName duration caloriesBurned');

        res.status(200).json({
            success: true,
            date: startDate.toISOString,
            workouts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil riwayat workout harian',
            error: error.message
        });
    }
};

export const getWorkoutTotals = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Parameter userId wajib diisi'
            });
        }

        const totals = await Workout.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: null,
                    totalWorkouts: {$sum: 1},
                    totalCalories: {$sum: '$caloriesBurned'},
                    totalDuration: {$sum: '$duration'}
                }
            }
        ]);

        if (totals.length === 0) {
            return res.status(200).json({
                sucess: true, 
                data: {
                    totalWorkouts: 0,
                    totalCalories: 0,
                    totalDuration: 0
                }
            });
        }

        res.status(200).json({

            sucess: true,
            data: {
                totalWorkouts: totals[0].totalWorkouts,
                totalCalories: totals[0].totalCalories,
                totalDuration: totals[0].totalDuration
            }
        });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: 'Gagal menghitung total workout',
            error: error.message
        });
    }
};


export default { createWorkout, getDailyWorkouts, getWorkoutTotals };