import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Article from './pages/Articles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

import Testing from './pages/Testing';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/team' element={<Team/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/articles' element={<Article/>}/>
            <Route path='/testing' element={<Testing/>}/>
            <Route path='/articlepage/:articleID' element={<ArticlePage/>}/>
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

//just added 2 more route paths

export default App;
