export interface IUsersLoginsResponse {
  items: {
    login: string;
  }[];
}

export interface IUser extends IUserPreviewResponse {
  email: string | null;
  location: string | null;
  created_at: string;
  followers: number;
  following: number;
  bio: string | null;
}

export interface IUserPreviewResponse {
  id: number;
  login: string;
  avatar_url: string;
  public_repos: number;
}

export interface IUserInfoResponse {
  id: number;
  login: string;
  avatar_url: string;
  public_repos: number;
  email: string | null;
  location: string | null;
  created_at: string;
  followers: number;
  following: number;
  bio: string | null;
  data: TRepoResponse[];
}

export type TRepoResponse = {
  id: number;
  name: string;
  forks_count: number;
  watchers_count: number;
  html_url: string;
};
