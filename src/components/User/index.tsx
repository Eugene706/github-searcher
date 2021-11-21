import { FC } from 'react';
import { IUserPreviewResponse } from '../../types/types';
import styles from './User.module.scss';

interface UserProps {
  userPreview: IUserPreviewResponse;
  getUserInfo: (login: string) => void;
}

const User: FC<UserProps> = ({ userPreview, getUserInfo }) => {
  return (
    <div className={styles.user} onClick={() => getUserInfo(userPreview.login)}>
      <div className={styles.user__container}>
        <img className={styles.user__img} src={userPreview.avatar_url} alt="avatar" />
        <span className={styles.user__name}>{userPreview.login}</span>
      </div>
      <span className={styles.user__repos}>Repo {userPreview.public_repos}</span>
    </div>
  );
};

export default User;
