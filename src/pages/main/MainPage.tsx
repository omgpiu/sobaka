import { Layout } from 'antd';
import styles from './style.module.css';
import clsx from 'clsx';
import { GoodsTable, SearchPanel, ListWithModal, StarsTable, UserInfo, WebThreeTable } from '../../components';
import { useUserInfoQuery } from '../../transport';
import { useWeb3TransactionsQuery } from '../../transport/hooks/useWeb3TransactionsQuery.tsx';
import { useStarsTransactionsQuery } from '../../transport/hooks/useStarsTransactionsQuery.tsx';

const { Content } = Layout;

export const MainPage = () => {

  const { isLoading, getUserData, userData, goods } = useUserInfoQuery()
  const { getWeb3Trans, dataSource: web3, web3Limit, web3Offset, updateWeb3Pagination } = useWeb3TransactionsQuery()
  const { getStarsTrans, dataSource: stars, starsLimit, starsOffset, updateStarsPagination } = useStarsTransactionsQuery()

  const requestHandler = (id: string) => {
    getUserData(id)
    getWeb3Trans(id)
    getStarsTrans(id)
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
            <StarsTable
              dataSource={ stars ?? [] }
              offset={ starsOffset }
              limit={ starsLimit }
              updatePagination={ updateStarsPagination }

            />
          </div>
          <div className={ styles.tableBlock }>
            <WebThreeTable
              dataSource={ web3 ?? [] }
              offset={ web3Offset }
              limit={ web3Limit }
              updatePagination={ updateWeb3Pagination }
            />
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

