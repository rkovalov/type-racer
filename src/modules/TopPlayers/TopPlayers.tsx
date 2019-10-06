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
        setUsers(
          filteredData.sort((a, b) => {
            if (!a.bestWpm) {
              return 1;
            } else if (!b.bestWpm) {
              return -1;
            }
            return Number(b.bestWpm) - Number(a.bestWpm);
          }),
        );
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
      <h3>Top Players</h3>
      <div className={styles.listHeader}>wpm</div>
      <Transition.Group
        inverted
        divided
        relaxed
        as={List}
        duration={200}
        size="large"
        verticalAlign="middle"
        style={{ marginTop: 0 }}
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
