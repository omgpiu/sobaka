import React from 'react';
import { Card, Button, message, Collapse } from 'antd';
import clsx from 'clsx'
import styles from './styles.module.css';
import { IUser, useUserBanMutation, useUserDeleteMutation } from '../../transport';

interface Props {
  user: IUser
}

export const UserInfo: React.FC<Props> = ({user}) => {

  const {banUser} = useUserBanMutation()
  const {deleteUser} = useUserDeleteMutation()

  const handleBan = async () => {
    if(user.UserID){
      await banUser(user.UserID)
      message.warning('User has been banned');
    }

  };

  const handleDelete = async () => {
    if(user.UserID){
      await deleteUser(user.UserID)
      message.warning('User has been deleted');
    }

  };


  const content = (<Card className={styles.cardContainer}>
    <div className={styles.info}>
      <div className={styles.userPic}>
        {user?.userPic ? (
          <img src={user?.userPic} alt="User" className={styles.userPic}/>
        ) : (
          <div className={styles.noPhoto}>No Pic</div>
        )}
        {user?.isBanned && (
          <div className={styles.banned}>
            BANNED
          </div>
        )}
      </div>

      <div className={styles.userInfo}>
        <p><strong>Name:</strong> {user?.firstName} {user?.lastName || "(no last name)"}</p>
        <p><strong>ID:</strong> {user?.UserID}</p>
        <p><strong>Balance:</strong> {user?.Balance} </p>
        <p><strong>Repaints:</strong> {user?.RepaintsTotal}</p>
        <p><strong>League:</strong> {user?.League}</p>
        <p><strong>Language:</strong> {user?.language}</p>
        <p><strong>Friends:</strong> {user?.friends}</p>
        <p><strong>Comment:</strong> {user?.comment ? user.comment : "-"}</p>
        <p><strong>Banned:</strong> {user?.isBanned ? 'Yes' : 'No'}</p>
      </div>
    </div>
    <div className={styles.buttonsContainer}>
      <Button
        className={styles.buttonBan}
        onClick={handleBan}
        disabled={user?.isBanned}
      >
        Ban
      </Button>

      <Button
        className={styles.buttonDelete}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  </Card>)

  const panelHeader = <span
    className={clsx({[styles.collapseHeaderBanned]: user?.isBanned},styles.collapsedHeader)}>{user?.firstName}  {user?.isBanned && '- USER IS BANNED'}</span>

  const items = [
    {
      key: '1',
      label: panelHeader,
      children: content,
    },
  ];

  return <Collapse items={items} defaultActiveKey={['1']}/>

};