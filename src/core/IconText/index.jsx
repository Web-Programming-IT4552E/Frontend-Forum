import React from 'react';
import { Space } from 'antd';

const IconText = ({ icon, text, onClick, style }) => (
  <Space style={style} onClick={onClick}>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default IconText;
