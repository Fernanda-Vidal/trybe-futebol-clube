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
  authenticate(token: string): Promise<string | boolean>;
}

export interface ITeams {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAllTeams(): Promise<ITeams[]>;
  getTeamById(id: number): Promise<ITeams | null>
}
