import { Layout } from 'antd';
import styles from './style.module.css';
import clsx from 'clsx';
import { GoodsTable, SearchPanel, ListWithModal, StarsTable, UserInfo, WebThreeTable } from '../../components';
import { useUserInfoQuery } from '../../transport';

const { Content } = Layout;

export const MainPage = () => {

  const { isLoading, getUserData, userData, goods, stars ,web3} = useUserInfoQuery()

  const requestHandler = (id: string) => {
    getUserData(id)
  }

  return (
    <Layout className={ styles.container }>
      <SearchPanel onButtonClick={ requestHandler } loading={ isLoading }/>
        <Content>
          <UserInfo user={ userData?.user! ?? {} }/>
        </Content>
        <Content>
          <div className={ styles.tableGrid }>
            <div className={ styles.tableBlock }>
              <StarsTable stars={ stars ?? [] }/>
            </div>
            <div className={ styles.tableBlock }>
              <WebThreeTable dataSource={web3 ?? []}/>
            </div>
            <div className={ styles.tableBlock }>
              <GoodsTable availableGoodsArray={ goods?.goodsArray } userGoods={ goods.userGoods }/>
            </div>
            <div className={ clsx(styles.tableBlock, styles.lists) }>
              <ListWithModal header={ 'Boosts' } data={ userData?.boostsArray ?? [] } onClick={ () => {
              } }/>
              <ListWithModal header={ 'Tasks' } data={ userData?.tasksArray ?? [] }/>
            </div>
          </div>
        </Content>

    </Layout>
  );
};

