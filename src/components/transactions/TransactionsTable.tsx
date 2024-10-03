import { Button, message, Table } from 'antd';
import { TooltipClipBoard } from '../tooltip';
import { ITransaction } from '../../transport';


const dataSource = [
  {
    "id": 1964383,
    "user_id": 694414073,
    "total_amount": 35200,
    "currency": "XTR",
    "Good": {
      "id": 1,
      "name": "Restoring charges",
      "description": "Instantly restore charges for painting.",
      "image_url": "https://npx-cdn.fra1.digitaloceanspaces.com/icons/icon_lightning.png",
      "price": 128,
      "currency": "XTR",
      "isOnePiece": false
    },
    "amount": 275,
    "status": "confirmed",
    "timestamp": 1727428277541,
    "signature": "5917aac5b351198d95e031f692e50356b28af06b9b26cbf86eff1905506748d6",
    "tg_pay_charge_id": "stx9jig6upTcLEggAR3vhshHAL-1ykCImMJhztBLRRWYiCb0XcfuuUMvzrRWizkrJSxym5Cux4Vh9rPjJ3xJdhs1tTRQa44knIeL_wWewGj9erYVleCD6HNpMifw9aw98gP"
},
  {
    "id": 19643831,
    "user_id": 694414073,
    "total_amount": 35200,
    "currency": "XTR",
    "Good": {
      "id": 1,
      "name": "Restoring charges",
      "description": "Instantly restore charges for painting.",
      "image_url": "https://npx-cdn.fra1.digitaloceanspaces.com/icons/icon_lightning.png",
      "price": 128,
      "currency": "XTR",
      "isOnePiece": false
    },
    "amount": 275,
    "status": "pending",
    "timestamp": 1727428277541,
    "signature": "5917aac5b351198d95e031f692e50356b28af06b9b26cbf86eff1905506748d6",
    "tg_pay_charge_id": "stx9jig6upTcLEggAR3vhshHAL-1ykCImMJhztBLRRWYiCb0XcfuuUMvzrRWizkrJSxym5Cux4Vh9rPjJ3xJdhs1tTRQa44knIeL_wWewGj9erYVleCD6HNpMifw9aw98gP"
  },
  {
    "id": 196438333,
    "user_id": 694414073,
    "total_amount": 35200,
    "currency": "XTR",
    "Good": {
      "id": 1,
      "name": "Restoring charges",
      "description": "Instantly restore charges for painting.",
      "image_url": "https://npx-cdn.fra1.digitaloceanspaces.com/icons/icon_lightning.png",
      "price": 128,
      "currency": "XTR",
      "isOnePiece": false
    },
    "amount": 275,
    "status": "started",
    "timestamp": 1727428277541,
    "signature": "5917aac5b351198d95e031f692e50356b28af06b9b26cbf86eff1905506748d6",
    "tg_pay_charge_id": "stx9jig6upTcLEggAR3vhshHAL-1ykCImMJhztBLRRWYiCb0XcfuuUMvzrRWizkrJSxym5Cux4Vh9rPjJ3xJdhs1tTRQa44knIeL_wWewGj9erYVleCD6HNpMifw9aw98gP"
  }
]

const columns = [
  {
    title: 'StarsID',
    dataIndex: 'id',
    key: 'id',
    render:(id:number)=><TooltipClipBoard title={id}/>
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
      { text:1, value: 1 },
      { text: 2, value: 2 },
      { text: 4, value: 4 },
      { text: 5, value: 5 },
      { text: 6, value: 6 },
    ],
    onFilter: (value: any, record: ITransaction) => record.Good.id === value,
    sorter: (a:ITransaction, b:ITransaction) => a.id-b.id,
  },
  {
    title: 'G.Name',
    dataIndex: ['Good', 'name'],
    key: 'good_name',
    filters: [
      { text: 'Restoring charges', value: 'Restoring charges' },
      { text: 'Dynamite', value: 'Dynamite' },
      { text: 'Pipette', value: 'Pipette' },
      { text: 'Fast mode', value: 'Fast mode' },
      { text: 'Paint Can', value: 'Paint Can' },
    ],
    onFilter: (value: any, record: ITransaction) => record.Good.name === value,
    sorter: (a:ITransaction, b:ITransaction) => a.Good.name.localeCompare(b.Good.name),
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
      { text: 'Confirmed', value: 'confirmed' },
      { text: 'Pending', value: 'pending' },
      { text: 'Cancelled', value: 'cancelled' },
    ],
    onFilter: (value: any, record: ITransaction) => record.status === value,
    sorter: (a:ITransaction, b:ITransaction) => a.status.localeCompare(b.status)
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (timestamp: number) => <TooltipClipBoard title={new Date(timestamp).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}/>,
    sorter:(a:ITransaction, b:ITransaction) => a.timestamp-b.timestamp
  },
  {
    title: 'Signature',
    dataIndex: 'signature',
    key: 'signature',
    render:(data:string)=><TooltipClipBoard title={data}/>,
  },
  {
    title: 'TG pay charge id',
    dataIndex: 'tg_pay_charge_id',
    key: 'tg_pay_charge_id',
    render:(data:string)=><TooltipClipBoard title={data}/>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: ITransaction) => (
      <Button onClick={() => {
        message.success('Revert transaction: ' + record.id);
      }}>
        Revert
      </Button>
    ),
  },
]


export const TransactionsTable = ()=>{
  return <div>
    <h2>Transactions Stars</h2>
    <Table dataSource={dataSource} columns={columns} pagination={false} rowKey={'id'} />
  </div>
}