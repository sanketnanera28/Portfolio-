import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Prevent scroll when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Qualifications', path: '/qualifications' },
        { name: 'Projects', path: '/projects' },
        { name: 'Certificates', path: '/certificates' },
        { name: 'Contact', path: '/contact' },
    ];

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Logo */}
                <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
                    <span className="text-gradient">Sanket</span> Nanera
                </NavLink>

                {/* Desktop Nav */}
                <div className="desktop-nav">
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`mobile-nav-toggle ${mobileMenuOpen ? 'mobile-nav-toggle-open' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'mobile-nav-overlay-open' : ''}`}>
                <ul>
                    {navLinks.map(link => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                onClick={closeMenu}
                                className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
