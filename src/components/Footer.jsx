import React from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import './Footer.css';

const Footer = () => {
    const { data } = usePortfolio();
    const { personalInfo } = data;

    return (
        <footer className="footer">
            <div className="container footer-container">
                <h2 className="footer-logo">
                    <span className="text-gradient">Sanket</span> Nanera
                </h2>

                <p className="footer-bio">
                    {personalInfo.title || "Frontend Developer building premium digital experiences."}
                </p>

                <div className="footer-socials">
                    {personalInfo.github && (
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                            <Github size={24} />
                        </a>
                    )}
                    {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                            <Linkedin size={24} />
                        </a>
                    )}
                    {personalInfo.twitter && (
                        <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                            <Twitter size={24} />
                        </a>
                    )}
                    {personalInfo.email && (
                        <a href={`mailto:${personalInfo.email}`} className="footer-social-link">
                            <Mail size={24} />
                        </a>
                    )}
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
                    <NavLink to="/admin/login" className="footer-admin-link">Admin</NavLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
