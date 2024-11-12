import React from 'react';
import "../styles.css";
import whatwedo2 from '../images/whatwedo2.png';
import ourhistory  from '../images/ourhistory.jpg';
import ourvalues from '../images/ourvalues.png';
import aboutusVideo from "../images/aboutus_animation.mp4";

const About = () => {
    return (
        <div>
                <div className="about-section">
                <video 
                    className="background-video" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline // Ensures video plays inline on mobile devices
                >
                    <source src={aboutusVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="about-header">
                    <h1>About</h1>
                </div>
            </div>

            <div class="about-text-section-container">
                <div class="about-text-section fade-in-up">
                    <div class="about-text-content">
                        <span class="about-text-header">We are Arcadeverse!</span>
                        <br/><br/>
                        <div class="about-text">
                            <p>We are an international digital games and entertainment company in the making.
                            <br/><br/>A leader in multiplayer games, aiming for player count in the billions.
                            <br/><br/>The Retro Game Haven - "to relive the past one more time”</p>
                        </div>    
                    </div>
                </div>
            </div>
            <div>
                <div class="about-block container">
                    <aside class="about-image fade-in-left">
                        <img src={whatwedo2} alt="WhatWeDo"/>
                    </aside>
                    <div class="about-info fade-in-left">
                        <span class="about-title">What We Do</span>
                        <p class="about-description">We develop, publish and distribute multiplayer games. We aim to reach millions of players each month, and for our audience to keep growing.
                            <br/><br/>
                            Our experience, passion, and people provide us with a unique understanding of the digital games space, with extensive worldwide distribution and an internationally recognised brand.</p>
                            <a href="games.html">
                                <button class="about-button">SEE ALL GAMES</button>
                            </a>
                    </div>    
                </div>
                <div class="about-block container">
                    <div class="about-info align-right fade-in-right">
                        <span class="about-title">Our History</span>
                        <p class="about-description">Created in 2024, we made this website as a group project for our subject of Front End Engineering - II. It not only enhanced our skills as programmers, but also provided a sense of teamwork and leadership amongst ourselves.
                            <br/>  <br/>Made by (in no order): <br/>
                            Dipanshu Puri, Gurmehar Bains, Gaurika Pahuja and Bhaagya Sharma.
                        </p>
                        <a href="careers.html">
                            <button class="about-button">CAREER OPPORTUNITIES</button>
                        </a>
                    </div>    
                    <aside class="about-image fade-in-right">
                        <img src={ourhistory} alt="OurHistory"/>
                    </aside>
                </div>
                <div class="about-block container">
                    <aside class="about-image fade-in-left">
                        <img src={ourvalues} alt="OurValues"/>
                    </aside>
                    <div class="about-info fade-in-left">
                        <span class="about-title">Our Values</span>
                        <p class="about-description">Arcadeverse's purpose is to reignite the gamer in everyone by connecting people around the world through retro games.
                            <br/><br/>
                            Our values help us to succeed in creating an employee culture defining everyday actions lived by Arcadeversers and chosen by Arcadeversers. They are an authentic reflection in the way we work and play together, the way we do business, and support our communities.</p>
                            <a href="https://en.wikipedia.org/wiki/Design_thinking">
                                <button class="about-button">LEARN MORE</button>
                            </a>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default About;
