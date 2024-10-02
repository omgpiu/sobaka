import { Table } from 'antd';
import React from 'react';

const dataSource = []; // Заполните свои данные для таблиц
const columns = [
  {title: 'Column 1', dataIndex: 'col1', key: 'col1'},
  {title: 'Column 2', dataIndex: 'col2', key: 'col2'},
];

export const WebThreeTable = ()=>{
  return <div>
    <h2>Транзакции WEB3</h2>
    <Table dataSource={dataSource} columns={columns} pagination={false} />
  </div>
}