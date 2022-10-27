import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatchService, INewMatch, IReqMatch } from '../interfaces';
import HttpException from '../utils/HttpException';

export default class MatchService implements IMatchService {
  private model = Match;
  private teamModel = Team;

  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.getByInProgress = this.getByInProgress.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
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

  async getTeam(ids: number[]): Promise<boolean> {
    const idExist = await (await (await Promise.all(ids.map((id) => this.teamModel.findByPk(id))))
      .every((team) => team !== null));
    console.log('getTeam', idExist);
    if (!idExist) return false;
    return true;
  }

  async createMatch(req: IReqMatch): Promise<INewMatch> {
    const { homeTeam, awayTeam } = req;

    const message = 'There is no team with such id!';
    const teamExists = await this.getTeam([Number(homeTeam), Number(awayTeam)]);

    if (!teamExists) throw new HttpException(message, StatusCodes.NOT_FOUND);

    const newMatch = { ...req, inProgress: true };
    const match = await this.model.create(newMatch);
    return match;
  }

  async updateMatch(id: number): Promise<boolean> {
    const idExists = await this.model.findByPk(id);
    if (!idExists) throw new HttpException('There is no match with such id', StatusCodes.NOT_FOUND);

    const [lineUpdated] = await this.model.update({ inProgress: false }, {
      where: { id },
    });
    if (lineUpdated <= 0) {
      throw new HttpException('This match has finished', StatusCodes.BAD_REQUEST);
    }
    return true;
  }
}
