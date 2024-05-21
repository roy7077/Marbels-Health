import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Body from './components/Body';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/createuser" element={<CreateUser/>} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail/>} />
      </Routes>
    </Router>
    {/* <Footer/> */}
    </div>
  );
}

export default App;
