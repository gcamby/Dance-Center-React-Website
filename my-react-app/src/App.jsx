/* React imports */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
/*Sub-component imports */
/* Pages */
import About from'./pages/About';
import Lessons from './pages/Lessons';
import Events from './pages/Events';
import Home from './pages/Home';
import Media from './pages/Media';
import PrivateLessons  from './pages/PrivateLessons';
import GroupClasses from './pages/GroupClasses';
import Weddings from './pages/Weddings'
import Rentals from './pages/Rentals'
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Navbar from './components/Navbar/Navbar';
/* Library imports */
/* JSON imports */

function App() {
  const [user, setUser] = useState(null);

  return (
      <Router >
      <div className="App"> 
       <Navbar user={user}/>       
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/private-lessons" element={<PrivateLessons />} />
          <Route path="/group-lessons" element={<GroupClasses />} />
          <Route path="/events" element={<Events />} />
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
      </Router>
  );
}

export default App;
