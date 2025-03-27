// router.js - Menggunakan ESM
import express from 'express';
import multer from 'multer';
import userController from '../controllers/userController.js';
import nutriwise from '../controllers/nutriwiseController.js';
import survey from '../controllers/surveyController.js';
import consultationController from '../controllers/consultationController.js';
import workoutController from '../controllers/workoutController.js';
import dailyGoalsController from '../controllers/dailyGoalsController.js';
import leaderboardController from '../controllers/leaderboardController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ============== Autentikasi ===========
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUserProfile);
router.put('/:id', userController.updateUserProfile);
router.put('/password/:id', userController.updatePassword);

// ============== OpenAI ================
router.post('/nutriwise', upload.single('file'), nutriwise.analyzeFood);

// ============== Daily Goals ===============
router.post('/food', dailyGoalsController.createDailyGoals);

// ============== In App Survey ===============
router.post('/survey', survey.createSurvey);
router.get('/:id', survey.getSurveyById);

// ============== Consultation ===============
router.post('/start', consultationController.startConsultation);
router.post('/message', consultationController.sendMessage);

// ============== Workout ===============
router.post('/workout', workoutController.createWorkout);

// ============== Leaderboard ===============
router.get('/leaderboard', leaderboardController.getLeaderboard);

export default router;