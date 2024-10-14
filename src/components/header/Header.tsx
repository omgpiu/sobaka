import styles from './Header.module.css';
import React, { useState } from 'react';
import { Button, Input, Layout } from 'antd';
import { useUserToken } from '../../context';

interface Props {
  loading: boolean
  onButtonClick:(usedId:string)=>void

}
export const Header:React.FC<Props> = ({loading,onButtonClick}) => {
  const [userId,setUserId] = useState('')
  const [userToken,setUserToken] = useState('')
  const [_,setLocalToken] = useUserToken()
  const handleInputChange = (e:any) => {
    setUserId(e.target.value);
  };

  const onClickHandler =()=>{
    onButtonClick(userId)
  }

  const handleInputChangeToken = (e:any) => {
    setUserToken(e.target.value);
  };

  const setTokenLocal =()=>{
    localStorage.setItem('token', userToken)
    setLocalToken(userToken)
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
        <Input
          className={styles.input}
          placeholder="Token"
          value={userToken}
          onChange={handleInputChangeToken}
          disabled={loading}
        />
        <Button
          type="primary"
          onClick={setTokenLocal}
          loading={loading}
        >
          set token
        </Button>

        {import.meta.env.VITE_HEADER_SECOND}
      </Layout.Header>
    </div>)
}