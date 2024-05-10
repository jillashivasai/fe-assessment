import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import './accordin.css';

const Accordion = ({  id,title, image, children,  isOpen, disableToggle ,onToggle}) => {


  const toggleAccordion = () => {
    if (!disableToggle) {
      onToggle(id)
    }
  };

  return (
    <div className="accordion">
      <div className={`accordion-header`} >
        <div className={`flex`}>
          <img src={image} className="img" alt={title} />
          <h3>{title}</h3>
        </div>
        {isOpen ? <FaAngleUp  className={disableToggle ? 'disabled' : 'enabled'} onClick={toggleAccordion}/> : <FaAngleDown  onClick={toggleAccordion} className={disableToggle ? 'disabled' : 'enabled'}/>}
      </div>
      {isOpen && <div className="accordion-content" >{children}</div>}
    </div>
  );
};

export default Accordion;
