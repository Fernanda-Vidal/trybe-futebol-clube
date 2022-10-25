import { Router } from 'express';
import MatcheController from '../controllers/MatcheController';
// import MatcheService from '../services/MatcheService';

// const matcheService = new MatcheService();
const matcheController = new MatcheController();
const matchesRoute = Router();

matchesRoute.get('/matches', matcheController.getAllMatches);

export default matchesRoute;
