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
  login(user: ILogin): string;
  authenticate(token: string): string;
}
