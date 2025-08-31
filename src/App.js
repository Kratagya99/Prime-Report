import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import News from './components/News';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/news/:country/:category" element={<NewsWrapper />} />
      </Routes>
    </Router>
  );
}

// Wrapper component to pass route params to the class-based News component
const NewsWrapper = () => {
  const { country, category } = require('react-router-dom').useParams();
  return <News key={`${country}-${category}`} country={country} category={category} />;
};

export default App;