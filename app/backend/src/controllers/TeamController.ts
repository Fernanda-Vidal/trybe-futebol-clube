import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpException';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService) {
    this.getAllTeams = this.getAllTeams.bind(this);
    this.getTeamById = this.getTeamById.bind(this);
  }

  async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamService.getAllTeams();
    return res.status(200).json(teams);
  }

  async getTeamById(req: Request, res: Response): Promise<Response> {
    const team = await this.teamService.getTeamById(parseInt(req.params.id, 10));
    if (!team) throw new HttpException('Team not found', StatusCodes.NOT_FOUND);
    return res.status(200).json(team);
  }
}
