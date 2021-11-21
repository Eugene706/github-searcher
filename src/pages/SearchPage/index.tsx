import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import User from '../../components/User';
import { getUserRepos, getUsers } from '../../utils/api';
import { IUserInfoResponse, IUserPreviewResponse } from '../../types/types';

import styles from './SearchPage.module.scss';

interface SearchPageProps {
  setPickedUserData: React.Dispatch<React.SetStateAction<IUserInfoResponse | undefined>>;
}

const SearchPage: FC<SearchPageProps> = ({ setPickedUserData }) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(sessionStorage.getItem('login') || '');
  const [debInpValue] = useDebounce(searchQuery, 1000);
  const [searchResult, setSearchResult] = useState<IUserPreviewResponse[] | undefined>();

  useEffect(() => {
    if (debInpValue.length === 0) {
      setSearchResult(undefined);
    } else {
      getUsers(debInpValue).then((res) => setSearchResult(res));
    }
    sessionStorage.setItem('login', debInpValue);
  }, [debInpValue]);

  const getUserInfo = (login: string) => {
    getUserRepos(login).then((res) => setPickedUserData(res));
    navigate('/user');
  };

  return (
    <>
      <div className={styles.search}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search for Users"
          className={styles.search__field}
        />
      </div>
      <div className={styles.search__list}>
        {searchResult && searchResult.map((item) => <User getUserInfo={getUserInfo} userPreview={item} key={item.id} />)}
      </div>
    </>
  );
};

export default SearchPage;
