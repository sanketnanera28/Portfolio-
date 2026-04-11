import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { data } = usePortfolio();
    const { personalInfo } = data;

    return (
        <div className="section animate-fade-in">
            <div className="container home-container">
                {/* Left Side: Text Content */}
                <div className="home-content">
                    <span className="home-greeting">Welcome to my world</span>
                    <h1 className="text-gradient home-name">{personalInfo.name}</h1>
                    <h2 className="home-title">{personalInfo.title}</h2>
                    <p className="home-bio">{personalInfo.bio}</p>

                    <div className="home-actions">
                        <NavLink to="/projects" className="home-btn-primary">
                            Explore Projects <ArrowRight size={20} />
                        </NavLink>
                        <NavLink to="/contact" className="home-btn-secondary">
                            Get In Touch <MessageSquare size={20} />
                        </NavLink>
                    </div>
                </div>

                {/* Right Side: Photo with Dynamic Frame */}
                <div className="home-photo-section">
                    <div className="home-photo-frame">
                        <div className="home-photo-inner">
                            {personalInfo.image ? (
                                <img src={personalInfo.image} alt={personalInfo.name} className="home-photo" />
                            ) : (
                                <div className="photo-placeholder">
                                    <p>No Image Found</p>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Add one in the dashboard</p>
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
