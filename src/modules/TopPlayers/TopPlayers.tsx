import React, { useEffect, useState } from 'react';
import { Image, List, Transition } from 'semantic-ui-react';
import { fetchAllUsers } from '../../dataProvider';
import { User } from '../../types';
import styles from './TopPlayers.module.scss';

const useUsersResult = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetch = () =>
      fetchAllUsers().then(data => {
        const filteredData = data.filter(
          dataItem => 'nickname' in dataItem,
        ) as User[];
        setUsers(filteredData.sort((a, b) => (a < b ? 1 : -1)));
      });
    fetch();
    const intervalId = setInterval(fetch, 5000);
    return () => clearInterval(intervalId);
  }, []);
  return [users];
};

const TopPlayers = () => {
  const [users] = useUsersResult();
  return (
    <>
      <h3>Best WPM</h3>
      <Transition.Group
        inverted
        as={List}
        duration={200}
        divided
        size="huge"
        verticalAlign="middle"
        style={{ textAlign: 'left' }}
      >
        {users.map(user => (
          <List.Item key={user.nickname}>
            <div className={styles.userItem}>
              <Image
                avatar
                src={process.env.PUBLIC_URL + `/${user.gender}.png`}
              />
              <span>{user.nickname}</span>
              <span className={styles.wpmStatus}>
                {user.bestWpm ? user.bestWpm : '-'}
              </span>
            </div>
          </List.Item>
        ))}
      </Transition.Group>
    </>
  );
};

export default React.memo(TopPlayers);
