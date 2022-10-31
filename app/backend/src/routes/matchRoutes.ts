import { Router } from 'express';
import matchesMiddleware from '../middlewares/matchesMiddleware';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import authMiddleware from '../middlewares/authMiddleware';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchesRoute = Router();

matchesRoute.get('/matches', matchController.getMatches);
matchesRoute.post('/matches', authMiddleware, matchesMiddleware, matchController.createMatch);
matchesRoute.patch('/matches/:id', matchController.updateGoals);
matchesRoute.patch('/matches/:id/finish', authMiddleware, matchController.updateProgress);
matchesRoute.get('/leaderboard/home', matchController.leaderBoardHome);
matchesRoute.get('/leaderboard/away', matchController.leaderBoardAway);
matchesRoute.get('/leaderboard', matchController.leaderBoard);

export default matchesRoute;
