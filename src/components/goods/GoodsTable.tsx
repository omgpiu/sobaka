import { Button, Input, message, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';
import { IGood, IGoodsExtended, IParamsAddGoods, useAddGoods } from '../../transport';
import { Empty } from '../empty';



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
    onFilter: (value: any, record: IGoodsExtended) => record.id === value,
    sorter: (a: IGood, b: IGood) => a.id - b.id,
    width: 50
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
    width: 250
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: (a: IGoodsExtended, b: IGoodsExtended) =>{
      return a.quantity - b.quantity
    },
    width:60
  },
  {
    title: 'Image',
    dataIndex: 'image_url',
    key: 'image_url',
    render: (url: string) => <img src={url} alt="icon" style={{width: 20, height: 20}}/>,
    width: 60
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: (a: IGoodsExtended, b: IGoodsExtended) => a.price.amount - b.price.amount,
    render: (price: IGoodsExtended['price']) => `${price.amount} ${price.currency}`},
  {
    title: 'One piece',
    dataIndex: 'isOnePiece',
    key: 'isOnePiece',
    filters: [
      {text: 'Yes', value: true},
      {text: 'No', value: false},
    ],
    onFilter: (value: any, record: IGoodsExtended) => record.isOnePiece === value,
    render: (isOnePiece: boolean) => (isOnePiece ? 'Yes' : 'No'),
    sorter: (a: IGood, b: IGood) => Number(a.isOnePiece) - Number(b.isOnePiece),
    width: 150
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

interface Props {
  availableGoodsArray?: { id: IGood['id'], name: IGood['name'] }[]
  userGoods: Array<IGoodsExtended>
}

export const GoodsTable: React.FC<Props> = ({availableGoodsArray = [], userGoods = []}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: IGood['id'], name: IGood['name'] } | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const { addGoods} = useAddGoods()

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
    setQuantity(0);
  };

  const sendRequest = () => {
    if (!selectedItem || quantity <= 0) {
      message.error('Выберите товар и введите количество');
      return;
    }
    const params: Omit<IParamsAddGoods, 'userId'> = {
      goods: {
        quantity,
        name: selectedItem.name,
        id: selectedItem.id,
      }
    }

    addGoods(params).then(() => {
      message.success("Добавлено: " + params.goods.quantity + ' ' + params.goods.name);
    }).catch(() => {
      message.error(params.goods.name + ' не были добавлены, смотри консоль');
    })

    setIsModalVisible(false);
    setSelectedItem(null);
    setQuantity(0);
  };

  return <div>
    <h2>Goods
      <Button type="primary" onClick={openModal}>
        Начислить
      </Button>
    </h2>
    <Table dataSource={userGoods} columns={columns}
           locale={{
             emptyText: <Empty/>
           }}
           rowKey={'id'}/>
    <Modal
      title="Добавить товар"
      open={isModalVisible}
      onOk={sendRequest}
      onCancel={handleCancel}
    >
      <div style={{marginBottom: '16px'}}>
        <Select
          placeholder="Выберите товар"
          style={{width: '100%'}}
          onChange={(value: string, selectedCust) => {
            //@ts-ignore antd pidorasy
            const id = selectedCust.key
            setSelectedItem({
              name: value,
              id: Number(id)
            })
          }}
          allowClear
          value={selectedItem?.name}
        >
          {availableGoodsArray.map((item) => (
            <Select.Option key={item.id} value={item.name}>
              {item.name} / id = {item.id}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Input
        type="number"
        placeholder="Введите количество"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min={1}
      />
    </Modal>
  </div>
}