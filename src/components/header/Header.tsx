import styles from './Header.module.css';
import React, { useState } from 'react';
import { Button, Input, Layout } from 'antd';

interface Props {
  loading: boolean
  onButtonClick:(usedId:string)=>void

}
export const Header:React.FC<Props> = ({loading,onButtonClick}) => {
  const [userId,setUserId] = useState('289186646')

  const handleInputChange = (e:any) => {
    setUserId(e.target.value);
  };

  const onClickHandler =()=>{
    onButtonClick(userId)
  }

  return (
    <div>
      <Layout.Header className={styles.root}>
        {import.meta.env.VITE_HEADER}
      <Input
        className={styles.input}
        placeholder="User ID"
        value={userId}
        onChange={handleInputChange}
        disabled={loading}
      />
      <Button
        type="primary"
        onClick={onClickHandler}
        loading={loading}
      >
        Get user info
      </Button>
        {import.meta.env.VITE_HEADER_SECOND}
      </Layout.Header>
    </div>)
}