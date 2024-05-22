import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/userlist.css'
import { User } from './types';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://marbels-health.onrender.com/api/v1/showAllUsers?page=${currentPage}&limit=${usersPerPage}`);
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data)) {
          setUsers(data.data);
          console.log(data.totalPages); // Check the value of totalPages
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, [currentPage, usersPerPage]);
  
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="user-list">
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="user-cards">
        {filteredUsers.map((user) => (
          <div
            className="user-card"
            key={user._id}
            onClick={() => navigate(`/user/${user._id}`)}
          >
            <h3>{user.name}</h3>
            <p>Email: {user.emailID}</p>
            <p>DOB: {user.DOB}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
    </div>

    </div>
  );
};

export default UserList;
