import axios from 'axios';
import { TRepoResponse, IUserPreviewResponse, IUsersLoginsResponse, IUserInfoResponse } from '../types/types';

export const getUsers = async (username: string) => {
  try {
    if (sessionStorage.getItem('login') === username) {
      console.log(sessionStorage.getItem('login'));
      const sessionUser: IUserPreviewResponse[] = JSON.parse(sessionStorage.getItem('user') || '{}');
      return sessionUser;
    } else {
      const res = await axios
        .get<IUsersLoginsResponse>(`https://api.github.com/search/users?q=${username}&per_page=9`)
        .then((res) => res.data.items);
      const user = await Promise.all(
        res.map(async (item) => {
          return await axios.get<IUserPreviewResponse>(`https://api.github.com/users/${item.login}`).then((res) => res.data);
        })
      );
      sessionStorage.setItem('user', JSON.stringify(user));

      console.log(user);
      return user;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUserRepos = async (username: string) => {
  try {
    const user = await axios.get<IUserInfoResponse>(`https://api.github.com/users/${username}`).then((res) => res.data);
    const repos = await axios
      .get<TRepoResponse[]>(`https://api.github.com/users/${username}/subscriptions?per_page=100`)
      .then((res) => res);
    console.log(repos);
    return { ...user, ...repos };
  } catch (e) {
    console.log(e);
  }
};
