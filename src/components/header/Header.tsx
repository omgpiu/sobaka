import styles from './Header.module.css';
import React, { useState } from 'react';
import { Button, Input, Layout } from 'antd';

interface Props {
  loading: boolean
  onButtonClick:(id:string)=>void

}
export const Header:React.FC<Props> = ({loading,}) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = ()=>{
    onButtonClick(query)
  }
  return (
    <div>
      <Layout.Header className={styles.root}>
      <Input
        placeholder="User ID"
        value={query}
        onChange={handleQueryChange}
        style={{width: 300}}
      />
      <Button
        type="primary"
        onClick={handleSearch}
        loading={loading}
      >
        Get user info
      </Button>
      </Layout.Header>
    </div>)
}