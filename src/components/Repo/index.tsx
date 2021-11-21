import { FC } from 'react';
import { TRepoResponse } from '../../types/types';
import styles from './Repo.module.scss';

interface RepoProps {
  info: TRepoResponse;
}

const Repo: FC<RepoProps> = ({ info }) => {
  return (
    <div className={styles.repo} onClick={() => window.open(info.html_url)}>
      <span className={styles.repo__name}>{info.name}</span>
      <div className={styles.repo__info}>
        <span>{info.forks_count} Forks</span>
        <span>{info.watchers_count} Stars</span>
      </div>
    </div>
  );
};

export default Repo;
