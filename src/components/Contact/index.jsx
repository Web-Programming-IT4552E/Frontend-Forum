import React from 'react';
import { Card, Typography, Button, Space } from 'antd';

const { Title } = Typography;

const Contact = () => {
  return (
    <Card>
      <Space direction="vertical">
        <Title style={{ marginBottom: 'initial' }} level={4}>
          We're here
        </Title>
        <Typography>
          Our door is always open for a good cup of coffee anyplace, anytime,
          anybody.
        </Typography>
        <Button style={{ marginTop: '4px' }} block type="primary">
          <a href="https://candleinthewindshop.xyz/" target="_blank">
            Contact Us Now!
          </a>
        </Button>
      </Space>
    </Card>
  );
};

export default Contact;
