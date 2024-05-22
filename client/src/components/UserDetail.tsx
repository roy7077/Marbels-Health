import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/userdetails.css'
import { User } from './types';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    _id: '',
    name: '',
    emailID: '',
    contactNumber: '',
    DOB: '',
    userDes: ''
  });

  const fetchUser = async () => {
    try {
      //console.log("Fetching user...");
      const response = await fetch(`https://marbels-health.onrender.com/api/v1/userDetails?userID=${id}`);
      const data = await response.json();
      //console.log(data);
      setUser(data.data);
      setFormData(data.data);
     // console.log(formData);
      console.log("User fetched successfully");
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await fetch(`https://marbels-health.onrender.com/api/v1/updateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(formData)
      });
      setIsEditing(false);
      fetchUser();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`https://marbels-health.onrender.com/api/v1/removeUser?userID=${id}`, 
        { method: 'DELETE' });
        navigate('/');
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-detail">
      {isEditing ? (
        <form className="user-detail-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <h2>Edit User</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="emailID">Email ID:</label>
            <input type="email" id="emailID" name="emailID" value={formData.emailID} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="DOB">Date of Birth:</label>
            <input type="date" id="DOB" name="DOB" value={formData.DOB} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="userDes">User Description:</label>
            <textarea id="userDescription" name="userDes" value={formData.userDes} onChange={handleChange} required />
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <h2>User Detail</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email ID:</strong> {user.emailID}</p>
          <p><strong>Contact Number:</strong> {user.contactNumber}</p>
          <p><strong>DOB:</strong> {user.DOB}</p>
          <p><strong>User Description:</strong> {user.userDes}</p>
          <div className="buttons-container">
            <button onClick={() => navigate('/')}>Back</button>
            {!isEditing && (
            <div className='btn'>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            )}
        </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
