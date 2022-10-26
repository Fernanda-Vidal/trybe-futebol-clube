import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatchService, INewMatch, IReqMatch } from '../interfaces';
import HttpException from '../utils/HttpException';

export default class MatchService implements IMatchService {
  private model = Match;
  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.getByInProgress = this.getByInProgress.bind(this);
    this.createMatch = this.createMatch.bind(this);
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

  async getByInProgress(search: string):Promise<Match[]> {
    const searchBool = JSON.parse(search);
    const searchMatches = await this.model.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: { exclude: ['id'] },
      }, {
        model: Team, as: 'teamAway', attributes: { exclude: ['id'] },
      }],
      where: { inProgress: searchBool } });
    if (!searchMatches) throw new HttpException('No matches found!', StatusCodes.NOT_FOUND);

    return searchMatches;
  }

  async createMatch(req: IReqMatch): Promise<INewMatch> {
    const newMatch = { ...req, inProgress: true };
    const match = await this.model.create(newMatch);
    return match;
  }
}
