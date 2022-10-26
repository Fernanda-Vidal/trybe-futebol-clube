import { Request, Response } from 'express';
import { IMatchService } from '../interfaces';

export default class MatcheController {
  constructor(private matchService: IMatchService) {
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const matches = await this.matchService.getAllMatches();
    return res.status(200).json(matches);
  }
}
