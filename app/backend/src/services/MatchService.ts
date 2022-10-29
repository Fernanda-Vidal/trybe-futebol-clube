import { StatusCodes } from 'http-status-codes';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import Db from '../database/models/index';
import { IMatchService, INewMatch, IReqGoals, IReqMatch } from '../interfaces';
import HttpException from '../utils/HttpException';
import queryHome from '../database/queries';

export default class MatchService implements IMatchService {
  private model = Match;
  private teamModel = Team;
  private db = Db;

  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.getByInProgress = this.getByInProgress.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.updateGoals = this.updateGoals.bind(this);
    this.leaderBoardHome = this.leaderBoardHome.bind(this);
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

  async updateProgress(id: number): Promise<boolean> {
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

  async updateGoals(req: IReqGoals, idMatch: number): Promise<boolean> {
    const { homeTeamGoals, awayTeamGoals } = req;
    const [lineUpdated] = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id: idMatch } },
    );

    if (lineUpdated <= 0) {
      throw new HttpException('Match not found', StatusCodes.NOT_FOUND);
    }
    return true;
  }

  async leaderBoardHome(): Promise<any> {
    const [board] = await this.db.query(queryHome);
    return board;
  }
}
