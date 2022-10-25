import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  constructor(private matcheService: MatcheService = new MatcheService()) {
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const matches = await this.matcheService.getAllMatches();
    return res.status(200).json(matches);
  }
}
