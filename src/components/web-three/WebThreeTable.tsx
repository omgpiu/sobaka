import { Table } from 'antd';
import React from 'react';
import { TooltipClipBoard } from '../tooltip';

const dataSource = [
  {
    amount: 0.2,
    currency: "TON",
    id: 39,
    userId: 289186646,
    walletFrom: "UQBv3exBKLmQcn2Fm6VlntAInW-je1YP4U59gJxa062NCyMn",
    status: "confirmed",
    onChainHash: "efa02d90e8f14a027444d33b20b977c99db9f89dc1f253ff56e9343df7f5a4c6",
    dtmStart: 1727694735
  },
  {
    amount: 1.5,
    currency: "BTC",
    id: 45,
    userId: 123456789,
    walletFrom: "wallet123",
    status: "pending",
    onChainHash: "abc123hash",
    dtmStart: 1727604735
  }
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
    sorter: (a, b) => a.currency.localeCompare(b.currency),
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
    onFilter: (value, record) => record.status === value,
    sorter: (a, b) => a.status.localeCompare(b.status)
  },
  {
    title: 'Start Date',
    dataIndex: 'dtmStart',
    key: 'dtmStart',
    sorter: (a, b) => a.dtmStart - b.dtmStart,
    render: (timestamp: number) => new Date(timestamp).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
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
    render: (hash: string) => <TooltipClipBoard title={hash}/>
  },
];

export const WebThreeTable = ()=>{
  return <div>
    <h2>Транзакции WEB3</h2>
    <Table dataSource={dataSource} columns={columns} pagination={false} rowKey={'id'}/>
  </div>
}