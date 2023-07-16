import React from 'react';
import classes from './styles.module.scss';
import PageContainer from '../../containers/PageContainer';
import { Button, Form, Input, Row, Col } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
export const Register = () => {
  const handleFinish = (value) => {
    console.log(value);
  };
  return (
    <PageContainer>
      <Row justify="center" className={classes.container}>
        <Col xs={22} md={16} lg={10}>
          <Row justify="center" className={classes.content}>
            <Col span={24}>
              <h3 className={classes.title}>REGISTER</h3>
              <Form
                size="large"
                onFinish={(value) => handleFinish(value)}
                requiredMark={false}
                layout="vertical"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Email is required!',
                    },
                  ]}
                >
                  <Input prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Password is required!',
                    },
                  ]}
                >
                  <Input prefix={<LockOutlined />} type="password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Register
                  </Button>
                  <div className={classes.link}>
                    Already has an account?{' '}
                    <Link
                      to="/login"
                      style={{ marginLeft: '3px', color: 'blue' }}
                    >
                      Login
                    </Link>
                  </div>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageContainer>
  );
};
