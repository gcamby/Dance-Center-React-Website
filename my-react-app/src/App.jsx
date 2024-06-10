/* Import Packages */
/* --------------------------------------------------------------------------------- */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

/* Import Components */
/* --------------------------------------------------------------------------------- */
import Navbar from './components/Navbar/Navbar';

/* Import Pages */
/* --------------------------------------------------------------------------------- */
import About from'./pages/About';
import Lessons from './pages/Lessons';
import Events from './pages/Events';
import Home from './pages/Home';
import Media from './pages/Media';
import PrivateLessons  from './pages/PrivateLessons';
import GroupClasses from './pages/GroupClasses';

function App() {
  const [message, setMessage] = useState('');

  return (
      <Router >
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/private-lessons" element={<PrivateLessons />} />
          <Route path="/group-lessons" element={<GroupClasses />} />
          <Route path="/events" element={<Events />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
      </Router>
  );
}

export default App;
