import { Table } from 'antd';
import { TooltipClipBoard } from '../tooltip';
import { IWebThree } from '../../transport';
import { Empty } from '../empty';



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
      {text: 'Confirmed', value: 'confirmed'},
      {text: 'Pending', value: 'pending'},
      {text: 'Cancelled', value: 'cancelled'},
    ],
    onFilter: (value: any, record: any) => record.status === value,
    sorter: (a: IWebThree, b: IWebThree) => a.status.localeCompare(b.status)
  },
  {
    title: 'Start Date',
    dataIndex: 'dtmStart',
    key: 'dtmStart',
    sorter: (a: IWebThree, b: IWebThree) => a.dtmStart - b.dtmStart,
    render: (timestamp: number) => new Date(timestamp).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})
  },
  {
    title: 'Wallet From',
    dataIndex: 'walletFrom',
    key: 'walletFrom',
    render: (walletFrom: string) => <TooltipClipBoard title={walletFrom}/>,
  },
  {
    title: 'OnChainHash',
    dataIndex: 'onChainHash',
    key: 'onChainHash',
    render: (hash: string) => {
      const href = `https://tonviewer.com/transaction/${hash}`;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          tonviewer.com
        </a>
      );
    }
  },
];

export const WebThreeTable = () => {
  return <div>
    <h2>Транзакции WEB3</h2>
    <Table dataSource={[]} columns={columns} rowKey={'id'}
           locale={{
             emptyText: <Empty/>
           }}
           pagination={{
             total: [].length,
             showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} элементов`,
             pageSize: 5
           }}
    />
  </div>
}