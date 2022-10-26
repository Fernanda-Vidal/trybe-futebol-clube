import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatchService } from '../interfaces';

export default class MatchService implements IMatchService {
  private model = Match;
  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  async getAllMatches(): Promise<Match[]> {
    const matches = await this.model.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: { exclude: ['id'] },
      }, {
        model: Team, as: 'teamAway', attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  }
}
