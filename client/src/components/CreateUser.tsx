import React, { useState } from 'react';
import '../style/createuser.css';

const CreateUser= () => {
  const [formData, setFormData] = useState({
    name: '',
    emailID: '',
    contactNumber: '',
    DOB: '',
    userDes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('User created successfully!');
        setFormData({
          name: '',
          emailID: '',
          contactNumber: '',
          DOB: '',
          userDes: ''
        });
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the user');
    }
  };

  return (
    <div className="create-user">
      <form className="create-user-form" onSubmit={handleSubmit}>
        <h2>Create User</h2>
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
          <label htmlFor="userDescription">User Description:</label>
          <textarea id="userDescription" name="userDes" value={formData.userDes} onChange={handleChange} required />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
