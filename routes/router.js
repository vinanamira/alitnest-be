import express from 'express';
import multer from 'multer';
import userController from '../controllers/userController.js';
import nutriwise from '../controllers/nutriwiseController.js';
import survey from '../controllers/surveyController.js';
import consultationController from '../controllers/consultationController.js';
import leaderboardController from '../controllers/leaderboardController.js';
import dailyGoalsController from '../controllers/dailyGoalsController.js';
import exerciseController from '../controllers/exerciseController.js';
import activityController from '../controllers/activityController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ============== Get Data Umum ===========
router.get('/activities', activityController.getAllActivities);

// ============== Autentikasi ===========
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile/:id', userController.getUserProfile);  
router.put('/profile/:id', userController.updateUserProfile);  
router.put('/profile/password/:id', userController.updatePassword);  

// ============== Nutriwise ================
router.post('/nutriwise', upload.single('file'), nutriwise.analyzeFood);

// ============== Daily Goals ===============
router.post('/daily-goals', dailyGoalsController.upload.single('image'), dailyGoalsController.addMeal);
router.get('/daily-goals/totals/:userId/:date', dailyGoalsController.getDailyTotals);
router.get('/daily-goals/meals/:userId/:date', dailyGoalsController.getDailyMeals);

// ============== In App Survey ===============
router.post('/survey', survey.createSurvey);
router.get('/survey/:userId', survey.getSurveyById);

// ============== Consultation ===============
router.post('/start', consultationController.startConsultation);
router.post('/message', consultationController.sendMessage);

// ============== Exercise ===============
router.get('/activities/:type', activityController.getActivitiesByType);
router.post('/exercises', exerciseController.createExercise);
router.get('/exercises/daily/:userId/:date', exerciseController.getDailyExercises);
router.get('/exercises/totals/:userId/:date', exerciseController.getDailyTotals);

// ============== Leaderboard ===============
router.get('/leaderboard', leaderboardController.getLeaderboard);

export default router;