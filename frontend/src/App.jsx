import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Article from './pages/Articles';
import ArticlePage from './pages/ArticlePage';
import AuthorPage from './pages/AuthorPage';
import GenrePage from './pages/GenrePage';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import './styles/App.css';

import Test from './pages/Test';

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <ScrollToTop/>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/team' element={<Team/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/articles' element={<Article/>}/>
            <Route path='/articles/:articleLink' element={<ArticlePage/>}/>
            <Route path='/authors/:authorLink' element={<AuthorPage/>}/>
            <Route path='/genres/:genre' element={<GenrePage/>}/>
            <Route path='/search' element={<SearchResults/>}/>
            <Route path='/test' element={<Test/>}/>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
