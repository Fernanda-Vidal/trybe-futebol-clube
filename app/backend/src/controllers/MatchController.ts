import { Request, Response } from 'express';
import { IMatchService } from '../interfaces';

export default class MatcheController {
  constructor(private service: IMatchService) {
    this.getMatches = this.getMatches.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.updateGoals = this.updateGoals.bind(this);
    this.leaderBoardHome = this.leaderBoardHome.bind(this);
    this.leaderBoardAway = this.leaderBoardAway.bind(this);
  }

  async getMatches(req: Request, res: Response): Promise<Response> {
    if (req.query.inProgress) {
      const searchMatches = await this.service.getByInProgress(req.query.inProgress as string);
      return res.status(200).json(searchMatches);
    }
    const searchMatches = await this.service.getAllMatches();
    return res.status(200).json(searchMatches);
  }

  async createMatch(req: Request, res: Response): Promise<Response> {
    const match = await this.service.createMatch(req.body);
    return res.status(201).json(match);
  }

  async updateProgress(req: Request, res: Response): Promise<Response> {
    await this.service.updateProgress(parseInt(req.params.id, 10));
    return res.status(200).json({ message: 'Finished' });
  }

  async updateGoals(req: Request, res: Response): Promise<Response> {
    await this.service.updateGoals(req.body, parseInt(req.params.id, 10));
    return res.status(200).json({ message: 'Score updated' });
  }

  async leaderBoardHome(req: Request, res: Response): Promise<Response> {
    const board = await this.service.leaderBoardHome();
    return res.status(200).json(board);
  }

  async leaderBoardAway(req: Request, res: Response) {
    const board = await this.service.leaderBoardAway();
    return res.status(200).json(board);
  }
}
