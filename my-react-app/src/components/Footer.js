import React from 'react';
import "../styles.css";
import logo from '../images/logo2.jpg';
import icon1 from "../images/icon1.png";
import icon2 from "../images/icon2.png";
import icon3 from "../images/icon3.png";
import icon4 from "../images/icon4.png";
import icon5 from "../images/icon5.png";
import icon6 from "../images/icon6.png";
import icon7 from "../images/icon7.png";
import icon8 from "../images/icon8.png";

const Footer = () => {
    return (
        <footer>
        <div class="footer-content">
            <img src={logo} alt="Logo" class="footer-logo" />
            <div class="footer-links">
                <a href="index.html">Home</a>
                <a href="games.html">Games</a>
                <a href="support.html">Support</a>
                <a href="careers.html">Careers</a>
                <a href="about.html">About</a>
            </div>
            <div class="social-icons">
                <a href="#"><img src={icon1} alt="Twitter Icon" /></a>
                <a href="#"><img src={icon2} alt="Facebook Icon" /></a>
                <a href="#"><img src={icon3} alt="YouTube Icon" /></a>
                <a href="#"><img src={icon4} alt="LinkedIn Icon" /></a>
                <a href="#"><img src={icon5} alt="Instagram Icon" /></a>
                <a href="#"><img src={icon6} alt="Apple Icon" /></a>
                <a href="#"><img src={icon7} alt="Pinterest Icon" /></a>
                <a href="#"><img src={icon8} alt="Github Icon" /></a>
            </div>            
            <div class="footer-bottom">
                <a href="#">Terms and Conditions</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Content and Conduct Policy</a>
                <a href="#">Cookie Policy</a>
                <a href="#">Privacy Settings</a>
                <p>The Retro Game Haven @ Arcadeverse © 2020 - 2024 Arcadeverse Team CU</p>
            </div>
        </div>
    </footer>
    );
}

export default Footer;
