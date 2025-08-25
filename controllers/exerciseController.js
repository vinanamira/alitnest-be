import Exercise from '../models/exercise.js';

// --- RUMUS PERHITUNGAN KALORI ---
const calculateCalories = (duration, mets, userWeight) => {
    if (!duration || !mets || !userWeight) return 0;
    return (duration * (mets * 3.5 * userWeight)) / 200;
};

export const createExercise = async (req, res) => {
    try {
        const { userId, exerciseType, exerciseName, duration, sets, reps, weight, metsValue, userWeight } = req.body;

        // Validasi Input
        if (!userId || !exerciseType || !exerciseName || !duration) {
             return res.status(400).json({ message: "Input tidak lengkap: userId, exerciseType, exerciseName, dan duration wajib diisi." });
        }
        
        let calories = 0;

        if (exerciseType === 'Cardio') {
            // Untuk Cardio, kalori dihitung otomatis pakai rumus METs
            // `userWeight` harus didapat dari request body atau dari database User
            // `metsValue` spesifik untuk setiap exercise, dikirim dari frontend
            if (!metsValue || !userWeight) {
                return res.status(400).json({ message: "Untuk Cardio, metsValue dan userWeight wajib diisi." });
            }
            calories = calculateCalories(duration, metsValue, userWeight);

        } else if (exerciseType === 'Workout') {
            // Untuk Workout, kalori sudah ditentukan dari awal, jadi langsung diambil dari request
            if (!req.body.caloriesBurned) {
                return res.status(400).json({ message: "Untuk Workout, caloriesBurned wajib diisi." });
            }
            calories = req.body.caloriesBurned;

        } else if (exerciseType === 'Strength') {
            // Perhitungan kalori untuk Strength bisa menggunakan METs juga.
            // Nilai METs untuk strength training umumnya 3.5 - 6.0
            // Di sini kita asumsikan `metsValue` juga dikirim dari frontend.
            if (!metsValue || !userWeight) {
                return res.status(400).json({ message: "Untuk Strength, metsValue dan userWeight wajib diisi." });
            }
            calories = calculateCalories(duration, metsValue, userWeight);
        }

        const newExercise = new Exercise({
            userId,
            exerciseType,
            exerciseName,
            duration,
            caloriesBurned: Math.round(calories), // Dibulatkan 
            sets,
            reps,
            weight
        });

        await newExercise.save();
        res.status(201).json(newExercise);

    } catch (error) {
        res.status(500).json({ message: "Error saving exercise", error: error.message });
    }
};

export const getDailyExercises = async (req, res) => {
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
        const endDate = new Date(parsedDate.setHours(23, 59, 59, 999));

        // Mengambil semua exercise pada hari itu
        const exercises = await Exercise.find({
            userId,
            createdAt: { $gte: startDate, $lte: endDate }
        });

        // Mengelompokkan hasil sesuai dengan tampilan di dokumen
        const groupedExercises = {
            Cardiovascular: [],
            Strength: [],
            Workout: []
        };
        
        let totalCaloriesCardio = 0;
        let totalCaloriesWorkout = 0;

        exercises.forEach(ex => {
            if (ex.exerciseType === 'Cardio') {
                groupedExercises.Cardiovascular.push(ex);
                totalCaloriesCardio += ex.caloriesBurned;
            } else if (ex.exerciseType === 'Strength') {
                groupedExercises.Strength.push(ex);
            } else if (ex.exerciseType === 'Workout') {
                groupedExercises.Workout.push(ex);
                totalCaloriesWorkout += ex.caloriesBurned;
            }
        });

        res.status(200).json({
            success: true,
            date: startDate.toISOString().split('T')[0], // format YYYY-MM-DD
            totals: {
                totalCardioCalories: totalCaloriesCardio,
                totalWorkoutCalories: totalCaloriesWorkout
            },
            data: groupedExercises
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil riwayat exercise harian',
            error: error.message
        });
    }
};

export const getDailyTotals = async (req, res) => {
    try {
        const { userId, date } = req.params; // Mengambil berdasarkan tanggal juga

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
        
        const startDate = new Date(new Date(date).setHours(0, 0, 0, 0));
        const endDate = new Date(new Date(date).setHours(23, 59, 59, 999));

        const totals = await Exercise.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId), // Pastikan userId adalah ObjectId
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCalories: { $sum: '$caloriesBurned' },
                    totalDuration: { $sum: '$duration' } // total durasi dalam menit
                }
            }
        ]);

        if (totals.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    totalCalories: 0,
                    totalDuration: 0 // dalam menit
                }
            });
        }

        res.status(200).json({
            success: true,
            data: {
                totalCalories: totals[0].totalCalories,
                totalDuration: totals[0].totalDuration // dalam menit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghitung total exercise harian',
            error: error.message
        });
    }
};

export default { createExercise, getDailyExercises, getDailyTotals };