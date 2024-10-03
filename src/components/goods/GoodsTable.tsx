import { Button, message, Table } from 'antd';
import { IGood } from '../../api';

const dataSource = [
  {
    id: 1,
    name: "Restoring charges",
    description: "Instantly restore charges for painting.",
    image_url: "https://npx-cdn.fra1.digitaloceanspaces.com/icons/icon_lightning.png",
    price: 32,
    currency: "XTR",
    isOnePiece: false
  },
  {
    id: 2,
    name: "Dynamite",
    description: "A 5x5 blast. You get pixels.",
    image_url: "https://npx-cdn.fra1.digitaloceanspaces.com/icons/icon_tnt.png",
    price: 64,
    currency: "XTR",
    isOnePiece: false
  },
  {
    id: 4,
    name: "Pipette",
    description: "Copy color from any pixel.",
    image_url: "https://npx-cdn.fra1.cdn.digitaloceanspaces.com/icons/icon_pipette.png",
    price: 128,
    currency: "XTR",
    isOnePiece: true
  },
  {
    id: 5,
    name: "Fast mode",
    description: "Paint pixels with a single touch.",
    image_url: "https://npx-cdn.fra1.cdn.digitaloceanspaces.com/icons/icon_fastmode.png",
    price: 128,
    currency: "XTR",
    isOnePiece: true
  },
  {
    id: 6,
    name: "Paint Can",
    description: "A 3×3 color spot. You get pixels.",
    image_url: "https://npx-cdn.fra1.cdn.digitaloceanspaces.com/icons/icon_paintcan.png",
    price: 32,
    currency: "XTR",
    isOnePiece: false
  }
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    filters: [
      {text: '1', value: 1},
      {text: '2', value: 2},
      {text: '4', value: 4},
      {text: '5', value: 5},
      {text: '6', value: 6},
    ],
    onFilter: (value: any, record: IGood) => record.id === value,
    sorter: (a: IGood, b: IGood) => a.id - b.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filters: [
      {text: 'Restoring charges', value: 'Restoring charges'},
      {text: 'Dynamite', value: 'Dynamite'},
      {text: 'Pipette', value: 'Pipette'},
      {text: 'Fast mode', value: 'Fast mode'},
      {text: 'Paint Can', value: 'Paint Can'},
    ],
    onFilter: (value: any, record: IGood): boolean => record.name === value,
    sorter: (a: IGood, b: IGood) => a.name.localeCompare(b.name),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: 250,
  },
  {
    title: 'Image',
    dataIndex: 'image_url',
    key: 'image_url',
    render: (url: string) => <img src={url} alt="icon" style={{width: 20, height: 20}}/>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: (a: IGood, b: IGood) => a.price - b.price,
    render: (price: number, record: IGood) => `${price} ${record.currency}`,
  },
  {
    title: 'Is One Piece',
    dataIndex: 'isOnePiece',
    key: 'isOnePiece',
    filters: [
      {text: 'Yes', value: true},
      {text: 'No', value: false},
    ],
    onFilter: (value: any, record: IGood) => record.isOnePiece === value,
    render: (isOnePiece: boolean) => (isOnePiece ? 'Yes' : 'No'),
    sorter: (a: IGood, b: IGood) => Number(a.isOnePiece) - Number(b.isOnePiece),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: IGood) => (
      <Button type="link" onClick={() => {
        console.log(text)
        message.success('Copied to clipboard!' + record.id);
      }}>
        Delete
      </Button>
    ),
  },
];

export const GoodsTable = () => {

  const addGoods = () => {

  }

  return <div>
    <h2>Goods <Button type="primary" onClick={addGoods}>
      Начислить
    </Button></h2>
    <Table dataSource={dataSource} columns={columns} pagination={false}/>
  </div>
}