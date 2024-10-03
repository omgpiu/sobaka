import { Layout } from 'antd';
import styles from './style.module.css';
import clsx from 'clsx';
import { GoodsTable, Header, ListWithModal, TransactionsTable, UserInfo, WebThreeTable } from '../../components';
import {  useGetUserQuery } from '../../transport';
import { useState } from 'react';

const {Content} = Layout;

export const Main = () => {
  const [userId,setUserId] = useState('289186646')
  const {isLoading,getUser, userData,goods} = useGetUserQuery()

  const requestHandler = ()=>{
    getUser(userId)
  }


  return (
    <>
      <Header onButtonClick={requestHandler} loading={isLoading} setUserId={setUserId} userId={userId}/>
      <Layout className={styles.container}>
        <Content>
          <UserInfo user={userData?.user}/>
        </Content>
        <Content>
          <div className={styles.tableGrid}>
            <div className={styles.tableBlock}>
              <TransactionsTable/>
            </div>
            <div className={styles.tableBlock}>
              <WebThreeTable/>
            </div>
            <div className={styles.tableBlock}>
              <GoodsTable availableGoodsArray={goods?.goodsArray} userGoods={goods.userGoods}/>
            </div>
            <div className={clsx(styles.tableBlock,styles.lists)}>
              <ListWithModal header={'Boosts'} data={userData?.boostsArray ?? []} onClick={()=>{}}/>
              <ListWithModal header={'Tasks'} data={userData?.tasksArray ?? []}/>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

