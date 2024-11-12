import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import Careers from './pages/Careers';
import Support from './pages/Support';
import About from "./pages/About";
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <Router>
           <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/support" element={<Support />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;


