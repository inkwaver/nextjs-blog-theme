// components/IconWithLabel.js
import React from 'react';

const IconWithLabel = ({ Icon, label }) => (
  <span className="color-n3 body-bg">
    <span className="icon-mid">
      <Icon />
    </span>
    {label}
  </span>
);

export default IconWithLabel;
