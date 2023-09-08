import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
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
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
