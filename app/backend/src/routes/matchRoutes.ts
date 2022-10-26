import { Router } from 'express';
import MatcheController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchService = new MatchService();
const matcheController = new MatcheController(matchService);
const matchesRoute = Router();

matchesRoute.get('/matches', matcheController.getAllMatches);

export default matchesRoute;
