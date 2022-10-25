import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const teamController = new TeamController(teamService);
const teamsRoute = Router();

teamsRoute.get('/teams/:id', teamController.getTeamById);
teamsRoute.get('/teams', teamController.getAllTeams);

export default teamsRoute;
