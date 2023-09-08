import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import Article from './pages/Article';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/team' element={<Team/>} />
            <Route path='/Article' element={<Article/>} />
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
