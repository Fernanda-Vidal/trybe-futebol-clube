import { Request, Response } from 'express';
import { IMatcheService } from '../interfaces';

export default class MatcheController {
  constructor(private matcheService: IMatcheService) {
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const matches = await this.matcheService.getAllMatches();
    return res.status(200).json(matches);
  }
}
