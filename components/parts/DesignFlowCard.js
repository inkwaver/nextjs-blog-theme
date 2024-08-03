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

// import React from 'react';
// import { ResearchIcon, SitemapIcon, Wireframing, DesignSys, Prototyping } from '../components/Icons/DesignFlowIcons';

// // Original DesignFlowCard component structure
// const DesignFlowCard = ({ title, description, icon }) => {
//   return (
//     <li className="design-flow-card">
//       <div className="icon">
//         {icon}
//       </div>
//       <div className="content">
//         <h3 className="title">{title}</h3>
//         <p className="description">{description}</p>
//       </div>
//     </li>
//   );
// };

// export default DesignFlowCard;
