import Team from '../database/models/Team';
import Matche from '../database/models/Matche';

export default class MatcheService {
  private model = Matche;
  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  async getAllMatches(): Promise<any> {
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
