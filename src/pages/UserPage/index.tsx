import { FC, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Repo from '../../components/Repo';
import { IUserInfoResponse, TRepoResponse } from '../../types/types';

import styles from './UserPage.module.scss';

interface UserPageProps {
  userData: IUserInfoResponse | undefined;
}

const UserPage: FC<UserPageProps> = ({ userData }) => {
  const [searchRepoQuery, setSearchRepoQuery] = useState('');
  const [debInpValue] = useDebounce(searchRepoQuery, 1000);
  const [searchedValue, setSearchedValue] = useState<TRepoResponse[] | undefined>(userData?.data);

  const SearchRepo = () => {
    return userData?.data.filter(function (el) {
      return el.name.toLowerCase().includes(debInpValue.toLowerCase());
    });
  };

  useEffect(() => {
    if (debInpValue.length === 0) {
      setSearchedValue(userData?.data);
    }
    setSearchedValue(SearchRepo());
  }, [debInpValue, userData?.data]);

  return (
    <div className={styles.user}>
      <div className={styles.user__block}>
        <div className={styles.user__container}>
          <img src={userData?.avatar_url} alt="avatar" />
          <div className={styles.user__info}>
            <span>UserName: {userData?.login}</span>
            <span>Email: {userData?.email}</span>
            <span>Location: {userData?.location}</span>
            <span>Join date: {userData?.created_at.substr(0, 10)}</span>
            <span>Followers: {userData?.followers}</span>
            <span>Following: {userData?.following}</span>
          </div>
        </div>
        <p className={styles.user__biography}>
          Biography:
          <br />
          {userData?.bio}
        </p>
      </div>
      <div className={styles.repos}>
        <input
          value={searchRepoQuery}
          onChange={(e) => setSearchRepoQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search for User's Repository"
          className={styles.repos__input}
        />
        <div className={styles.repos__container}>
          {searchedValue && searchedValue.map((item) => <Repo info={item} key={item.id} />)}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
