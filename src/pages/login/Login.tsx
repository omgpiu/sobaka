import React from 'react';
import { Button, Form, Input, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './styles.module.css'
import { Empty } from '../../components/empty';
import { useAuth } from '../../context';
import { Navigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const { login, loading, isAuthent } = useAuth()

  const onFinish = async (values: { token: string }) => {
    await login(values.token)
  };

  if (loading) {
    return <div className={ styles.root }>
      <Empty/>
    </div>
  }

  if (isAuthent) {
    return <Navigate to="/" replace/>;
  }


  const cardTitle = <div className={ styles.cardTitle }>
    <div>Login</div>
    <Empty/>
  </div>


  return (
    <div className={ styles.root }>
      <Card
        title={ cardTitle }
        className={ styles.card }>
        <Form
          name="login_form"
          initialValues={ { remember: true } }
          onFinish={ onFinish }
        >
          <Form.Item
            name="token"
            rules={ [ { required: true, message: 'Please input your token' } ] }
          >
            <Input
              prefix={ <UserOutlined/> }
              placeholder="Login"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={ loading } block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

