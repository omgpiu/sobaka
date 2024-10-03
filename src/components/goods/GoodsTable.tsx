import { Button, Input, message, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';
import { IGood } from '../../transport';

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
];

interface Props {
  availableGoodsArray?: { id: IGood['id'], name: IGood['name'] }[]
  userGoods: Array<IGood & { inner_id: string }>
}

export const GoodsTable: React.FC<Props> = ({availableGoodsArray = [], userGoods = []}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);


  const addGoods = () => {
    setIsModalVisible(true);
  };

  // Закрытие модального окна
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
    setQuantity(0);
  };

  const handleOk = () => {
    if (!selectedItem || quantity <= 0) {
      message.error('Выберите товар и введите количество');
      return;
    }

    message.success(`Добавлено ${quantity} шт. товара: ${selectedItem}`);

    setIsModalVisible(false);
    setSelectedItem(null);
    setQuantity(0);
  };
  return <div>
    <h2>Goods <Button type="primary" onClick={addGoods}>
      Начислить
    </Button></h2>
    <Table dataSource={userGoods} columns={columns} pagination={{
      total: userGoods.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} элементов`,
      pageSize:5
    }} rowKey={'inner_id'}/>
    <Modal
      title="Добавить товар"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div style={{marginBottom: '16px'}}>
        <Select
          placeholder="Выберите товар"
          style={{width: '100%'}}
          onChange={(value) => setSelectedItem(value)}
        >
          {availableGoodsArray.map((item) => (
            <Select.Option key={item.id} value={item.name}>
              {item.name}
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