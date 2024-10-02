import React, { useState } from 'react';
import { Layout } from 'antd';
import styles from './App.module.css';
import { Header, StarsTable, WebThreeTable, TasksTable, BoostsTable,UserInfo } from './components';

const {Content} = Layout;

const USER = {
  id: 379402843,
  firstName: "Aleksandr",
  lastName: "",
  balance: 52260,
  repaints: 4052,
  score: null,
  language: "ru",
  isPremium: true,
  friends: 3,
  intro: false,
  userPic: "",
  league: "platinum",
}



export const App = () => {

  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <>
      <Header onButtonClick={handleSearch} loading={loading}/>
      <Layout className={styles.container}>
        <Content>
          <UserInfo user={USER}/>
        </Content>
        <Content>
          <div className={styles.tableGrid}>
            <div className={styles.tableBlock}>
              <StarsTable/>
            </div>
            <div className={styles.tableBlock}>
              <WebThreeTable/>
            </div>
            <div className={styles.tableBlock}>
              <TasksTable/>
            </div>
            <div className={styles.tableBlock}>
              <BoostsTable/>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

