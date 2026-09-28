export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface IAuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface ILoginResponse extends IAuthUser {
  accessToken: string;
  refreshToken: string;
}
