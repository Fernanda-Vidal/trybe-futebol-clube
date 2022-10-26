import { Request, Response } from 'express';
import { IMatchService } from '../interfaces';

export default class MatcheController {
  constructor(private matchService: IMatchService) {
    this.getMatches = this.getMatches.bind(this);
  }

  async getMatches(req: Request, res: Response): Promise<Response> {
    if (req.query.inProgress) {
      const searchMatches = await this.matchService.getByInProgress(req.query.inProgress as string);
      return res.status(200).json(searchMatches);
    }
    const searchMatches = await this.matchService.getAllMatches();
    return res.status(200).json(searchMatches);
  }
}
