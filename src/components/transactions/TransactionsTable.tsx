import { Button, message, Table } from 'antd';
import { TooltipClipBoard } from '../tooltip';
import { ITransaction, useRefundStarMutation } from '../../transport';
import React, { useMemo } from 'react';

interface Props {
  stars:ITransaction[]
}

export const TransactionsTable:React.FC<Props> = ({stars}) => {
  const {refundStar,isError,isSuccess,isPending} =useRefundStarMutation()

  const onCLickHandler = async (recordId:number)=>{
    await refundStar(recordId)
    if (isSuccess){
      message.success('Refund transaction success: ' + recordId);
    }
    if(isError){
      message.error('Refund transaction failed: ' + recordId);
    }


  }

  const columns= useMemo(() => [
    {
      title: 'StarsID',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <TooltipClipBoard title={id}/>,
      sorter: (a: ITransaction, b: ITransaction) => a.id - b.id,
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount: number) => `${amount}`,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'G.ID',
      dataIndex: ['Good', 'id'],
      key: 'good_id',
      filters: [
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 4, value: 4},
        {text: 5, value: 5},
        {text: 6, value: 6},
      ],
      onFilter: (value: any, record: ITransaction) => record.Good.id === value,
      sorter: (a: ITransaction, b: ITransaction) => a.Good.id - b.Good.id,
    },
    {
      title: 'G.Name',
      dataIndex: ['Good', 'name'],
      key: 'good_name',
      filters: [
        {text: 'Restoring charges', value: 'Restoring charges'},
        {text: 'Dynamite', value: 'Dynamite'},
        {text: 'Pipette', value: 'Pipette'},
        {text: 'Fast mode', value: 'Fast mode'},
        {text: 'Paint Can', value: 'Paint Can'},
      ],
      onFilter: (value: any, record: ITransaction) => record.Good.name === value,
      sorter: (a: ITransaction, b: ITransaction) => a.Good.name.localeCompare(b.Good.name),
    },
    {
      title: 'Price',
      dataIndex: ['Good', 'price'],
      key: 'price',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {text: 'Confirmed', value: 'confirmed'},
        {text: 'Pending', value: 'pending'},
        {text: 'Refunded', value: 'refunded'},
      ],
      onFilter: (value: any, record: ITransaction) => record.status === value,
      sorter: (a: ITransaction, b: ITransaction) => a.status.localeCompare(b.status)
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: number) => <TooltipClipBoard
        title={new Date(timestamp).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})}/>,
      sorter: (a: ITransaction, b: ITransaction) => a.timestamp - b.timestamp
    },
    {
      title: 'Signature',
      dataIndex: 'signature',
      key: 'signature',
      render: (data: string) => <TooltipClipBoard title={data}/>,
    },
    {
      title: 'TG pay charge id',
      dataIndex: 'tg_pay_charge_id',
      key: 'tg_pay_charge_id',
      render: (data: string) => <TooltipClipBoard title={data}/>,
    },
    {
      title: 'Action',
      key: 'action',
      width:150,
      align: 'center' as const,
      render: (record: ITransaction) => {
        if(record.status ==='refunded'){
          return <span>Refunded</span>
        }
        if(record.status ==='started') {
          return <span>Started</span>
        }
       return <Button onClick={async () => {
          await onCLickHandler(record.id)
        }} loading={isPending}>
          Refund
        </Button>
      },
    },
  ],[stars,isPending])


  return <div>
    <h2>Transactions Stars</h2>
    <Table dataSource={stars} columns={columns} rowKey={'id'}
           pagination={{
             total: stars.length,
             showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} элементов`,
             pageSize: 5
           }}
    />
  </div>
}