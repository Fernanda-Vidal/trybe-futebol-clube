import { Router } from 'express';
import matchesMiddleware from '../middlewares/matchesMiddleware';

import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import authMiddleware from '../middlewares/authMiddleware';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchesRoute = Router();

matchesRoute.get('/', matchController.getMatches);
matchesRoute.post('/', authMiddleware, matchesMiddleware, matchController.createMatch);
matchesRoute.patch('/:id/finish', matchController.updateMatch);

export default matchesRoute;
