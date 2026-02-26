import React from 'react';
import { ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { data } = usePortfolio();
    const { personalInfo } = data;

    return (
        <div className="section app-container animate-fade-in">
            <div className="container home-container">
                {/* Left Side: Text Content */}
                <div className="home-content">
                    <h2 className="home-greeting">Hello, I'm</h2>
                    <h1 className="text-gradient home-name">{personalInfo.name}</h1>
                    <h3 className="home-title">{personalInfo.title}</h3>
                    <p className="home-bio">{personalInfo.bio}</p>

                    <div className="home-actions">
                        <NavLink to="/projects" className="glass-panel home-btn-primary">
                            View Work <ArrowRight size={18} />
                        </NavLink>
                        <NavLink to="/contact" className="home-btn-secondary">
                            Contact Me
                        </NavLink>
                    </div>
                </div>

                {/* Right Side: Photo */}
                <div className="home-photo-section">
                    <div className="home-photo-frame">
                        <div className="home-photo-inner">
                            {personalInfo.image ? (
                                <img src={personalInfo.image} alt={personalInfo.name} className="home-photo" />
                            ) : (
                                <div className="photo-placeholder">
                                    <p>Your Photo Here</p>
                                    <p style={{ fontSize: '0.8rem' }}>(350x350px)</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
