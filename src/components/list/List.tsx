import React, { useState } from 'react';
import { Modal, Table, Input } from 'antd';
import styles from './styles.module.css';
import { Empty } from '../empty';

interface Props {
  header: string;
  data: {
    id: string;
    name: string;
    value: number | boolean;
  }[];
  onClick?: (name: string, newValue: number | boolean) => void;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: Props['data'][number], b: Props['data'][number]) => a.name.localeCompare(b.name)
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    sorter: (a: any, b: any) => {
      if (typeof a.value === 'boolean' && typeof b.value === 'boolean') {
        return a.value === b.value ? 0 : a.value ? 1 : -1;
      }
      return a.value - b.value;
    },
    render: (value: number | string) => String(value),
  }
];

export const ListWithModal: React.FC<Props> = ({header, data, onClick}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState<number | boolean>(false); // Состояние для значения
  const [selectedItem, setSelectedItem] = useState<{ name: string, value: number | boolean } | null>(null);


  const handleRowClick = (record: { name: string, value: number | boolean }) => {
    setSelectedItem(record);
    setInputValue(record.value);
    setIsModalVisible(true);
  };


  const handleOk = () => {
    if (onClick && selectedItem) {
      onClick(selectedItem.name, inputValue);
      setIsModalVisible(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setInputValue(isNaN(Number(newValue)) ? (newValue === 'true') : Number(newValue));
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2>{header}</h2>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          total: data.length,
          showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} элементов`,
          pageSize:5
        }}
        rowKey={'id'}
        onRow={(record) => ({
          onClick: () => onClick && handleRowClick(record),
          style: onClick ? {cursor: 'pointer'} : undefined
        })}
        locale={{
          emptyText: <Empty/>
        }}
      />

      {selectedItem && (
        <Modal
          title={`Edit boost: ${selectedItem.name}`}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          open={isModalVisible}
        >
          <Input
            placeholder="Update value"
            value={String(inputValue)}
            onChange={handleChange}
          />
        </Modal>
      )}
    </div>
  );
};