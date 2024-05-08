// Accordion.js
import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import './accordin.css';

const Accordion = ({ id, title, image,children, handleAccordionToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    handleAccordionToggle(id); 
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <div className='flex'>
          <img src={image} className='img' alt={title}/>
          <h3>{title}</h3>
        </div>
        {isOpen ? <FaAngleUp /> : <FaAngleDown/>}
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
