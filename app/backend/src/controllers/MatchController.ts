import { Request, Response } from 'express';
import { IMatchService } from '../interfaces';

export default class MatcheController {
  constructor(private service: IMatchService) {
    this.getMatches = this.getMatches.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
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

  async updateMatch(req: Request, res: Response): Promise<Response> {
    await this.service.updateMatch(parseInt(req.params.id, 10));
    return res.status(200).json({ message: 'Finished' });
  }
}
