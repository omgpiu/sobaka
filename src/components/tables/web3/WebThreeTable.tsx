import { Table } from 'antd';
import { TooltipClipBoard } from '../../tooltip';
import { ITablePagination, IWebThree } from '../../../transport';
import { Empty } from '../../empty';
import React from 'react';


const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: IWebThree, b: IWebThree) => a.id - b.id,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a: IWebThree, b: IWebThree) => a.amount - b.amount,
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
    sorter: (a: IWebThree, b: IWebThree) => a.currency.localeCompare(b.currency),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: 'Confirmed', value: 'confirmed' },
      { text: 'Pending', value: 'pending' },
      { text: 'Cancelled', value: 'cancelled' },
    ],
    onFilter: (value: any, record: any) => record.status === value,
    sorter: (a: IWebThree, b: IWebThree) => a.status.localeCompare(b.status)
  },
  {
    title: 'Start Date',
    dataIndex: 'dttmStart',
    key: 'dttmStart',
    sorter: (a: IWebThree, b: IWebThree) => a.dttmStart - b.dttmStart,
    render: (timestamp: number) => new Date(timestamp * 1000).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
  },
  {
    title: 'Wallet From',
    dataIndex: 'walletFrom',
    key: 'walletFrom',
    render: (walletFrom: string) => <TooltipClipBoard title={ walletFrom }/>,
  },
  {
    title: 'OnChainHash',
    dataIndex: 'onChainHash',
    key: 'onChainHash',
    render: (hash: string) => {
      const href = `https://tonviewer.com/transaction/${ hash }`;
      return (
        <a href={ href } target="_blank" rel="noopener noreferrer">
          tonviewer.com
        </a>
      );
    }
  },
];


export const WebThreeTable: React.FC<ITablePagination<IWebThree[]>> = ({
  dataSource,
  limit,
  offset,
  updatePagination
}) => {
  return <div>
    <h2>Транзакции WEB3</h2>
    <Table dataSource={ dataSource } columns={ columns } rowKey={ 'id' }
           locale={ {
             emptyText: <Empty/>
           } }
           pagination={ {
             current: Math.floor(offset / limit) + 1,
             pageSize: limit,
             total: 5000,
             showSizeChanger: true,
             pageSizeOptions: [ '20', '50', '100', '500' ],
           } }
           onChange={ (pagination) => {
             updatePagination(pagination.current ?? 0, pagination.pageSize ?? 0)
           } }
    />
  </div>
}