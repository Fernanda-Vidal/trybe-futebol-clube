import { ITeams } from '../interfaces';
import Team from '../database/models/Team';

export default class TeamService {
  private model = Team;
  constructor() {
    this.getAllTeams = this.getAllTeams.bind(this);
    this.getTeamById = this.getTeamById.bind(this);
  }

  async getAllTeams(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getTeamById(id: number): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
