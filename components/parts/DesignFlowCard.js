// components/DesignFlowCard.js
import React from 'react';

const DesignFlowCard = ({ Icon, title, description }) => (
  <li className="design-flow-card">
    <span className="icon">
      <Icon />
    </span>
    <h4 className="title-normal">{title}</h4>
    <p>{description}</p>
  </li>
);

export default DesignFlowCard;
