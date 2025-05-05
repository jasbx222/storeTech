import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles/global.css';


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
        
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
