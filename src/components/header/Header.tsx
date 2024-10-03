import styles from './Header.module.css';
import React from 'react';
import { Button, Input, Layout } from 'antd';

interface Props {
  loading: boolean
  onButtonClick:()=>void
  setUserId:(id:string)=>void
  userId:string

}
export const Header:React.FC<Props> = ({loading,onButtonClick,setUserId,userId}) => {

  const handleQueryChange = (e:any) => {
    setUserId(e.target.value);
  };

  return (
    <div>
      <Layout.Header className={styles.root}>
      <Input
        placeholder="User ID"
        value={userId}
        onChange={handleQueryChange}
        style={{width: 300}}
        disabled={loading}
      />
      <Button
        type="primary"
        onClick={onButtonClick}
        loading={loading}
        disabled={loading}
      >
        Get user info
      </Button>
      </Layout.Header>
    </div>)
}