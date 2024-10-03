import React from 'react';
import { Card, Button, message, Collapse } from 'antd';
import clsx from 'clsx'
import styles from './styles.module.css';
import { IUser, useUserBanMutation, useUserDeleteMutation } from '../../transport';

interface Props {
  user?: IUser
}

export const UserInfo: React.FC<Props> = ({user={}}) => {

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
        {user.UserPic ? (
          <img src={user.UserPic} alt="User" className={styles.userPic}/>
        ) : (
          <div className={styles.noPhoto}>No Pic</div>
        )}
        {user.IsBanned && (
          <div className={styles.banned}>
            BANNED
          </div>
        )}
      </div>

      <div className={styles.userInfo}>
        <p><strong>Name:</strong> {user.FirstName} {user.LastName || "(no last name)"}</p>
        <p><strong>ID:</strong> {user.UserID}</p>
        <p><strong>Balance:</strong> {user.Balance} </p>
        <p><strong>Repaints:</strong> {user.Repaints}</p>
        <p><strong>League:</strong> {user.League}</p>
        <p><strong>Language:</strong> {user.Language}</p>
        <p><strong>Friends:</strong> {user.Friends}</p>
        <p><strong>Status:</strong> {user.IsPremium ? 'Premium' : 'Standard'}</p>
        <p><strong>Intro Completed:</strong> {user.Intro ? 'Yes' : 'No'}</p>
        <p><strong>Banned:</strong> {user.IsBanned ? 'Yes' : 'No'}</p>
      </div>
    </div>
    <div className={styles.buttonsContainer}>
      <Button
        className={styles.buttonBan}
        onClick={handleBan}
        disabled={user.IsBanned}
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
    className={clsx({[styles.collapseHeaderBanned]: user.IsBanned},styles.collapsedHeader)}>{user.FirstName}  {user.IsBanned && '- USER IS BANNED'}</span>

  const items = [
    {
      key: '1',
      label: panelHeader,
      children: content,
    },
  ];

  return <Collapse items={items} defaultActiveKey={['1']}/>

};