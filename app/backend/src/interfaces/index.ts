import Match from '../database/models/Match';

export interface ILogin {
  email: string,
  password: string,
}

export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface IUserService {
  login(user: ILogin): Promise<string>;
}

export interface ITeams {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAllTeams(): Promise<ITeams[]>;
  getTeamById(id: number): Promise<ITeams | null>
}

export interface IReqMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IReqGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchService {
  getAllMatches(): Promise<Match[]>;
  getByInProgress(search: string): Promise<Match[]>;
  createMatch(req: IReqMatch): Promise<INewMatch>;
  updateProgress(id:number): Promise<boolean>;
  updateGoals(req: IReqGoals, id: number): Promise<boolean>;
}

export interface INewMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}
