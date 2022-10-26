import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchesRoute = Router();

matchesRoute.get('/', matchController.getMatches);
matchesRoute.post('/', matchController.createMatch);

export default matchesRoute;
