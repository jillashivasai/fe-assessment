
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import celebritiesData from './celebritiesData';
import UserCard from './components/UserCard';


function App() {
  const[celebritiesList,setCelebritiesList]=useState(celebritiesData)
  const [filteredCelebrities, setFilteredCelebrities] = useState([]);  

  const handleSearch = (searchTerm) => {
    const filtered = celebritiesList.filter((celebrity) =>
      `${celebrity.first} ${celebrity.last}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCelebrities(filtered);
  };

  useEffect(() => {
    setFilteredCelebrities(celebritiesList);
  }, []);

  
  const handleDelete=(userId)=>{
    const updatedCelebrities=filteredCelebrities.filter((celebrity)=>celebrity.id !== userId);
    setFilteredCelebrities(updatedCelebrities)
  }

  return (
    <div className="App">
      <h1 className='text-center'>Celebrity Manager</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredCelebrities.length > 0
          ? filteredCelebrities.map((eachUser) => <UserCard key={eachUser.id} eachUser={eachUser}  id={eachUser.id} onDelete={handleDelete}/>)
          : (<p>No user found</p>)}
      </ul>
    </div>
  );
}

export default App