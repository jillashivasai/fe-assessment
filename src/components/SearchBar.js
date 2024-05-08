import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './searchbar.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
    <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search celebrities..."
        value={searchTerm}
        onChange={handleChange}
        className='search' 
      />
    </div>
  );
};

export default SearchBar;
