
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo2.jpg';

const Navbar = () => {
    return (
        <nav class="navbar">
            <div class="container site-name">
                <div class="logo-name-wrap">
                    <img class="logo" src={logo} alt="logo"/>
                    <div class="site-name">
                        <span> ARCADEVERSE </span> 
                        <div class="subtitle"> THE RETRO GAME HAVEN</div>
                    </div>
                </div>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="games.html">Games</a>
                    <a href="support.html">Support</a>
                    <a href="careers.html">Careers</a>
                    <a href="about.html">About</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
