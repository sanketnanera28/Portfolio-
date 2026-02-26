import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = usePortfolio();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid password. Please try again.');
        }
    };

    return (
        <div className="section container login-section animate-fade-in">
            <div className="glass-panel login-card">
                <div className="login-icon-wrapper">
                    <Lock size={28} />
                </div>

                <h2 className="login-title">Admin Login</h2>
                <p className="login-subtitle">Secure access to your portfolio data.</p>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            required
                            placeholder="Enter admin password"
                            className={`form-input ${error ? 'form-input-error' : ''}`}
                        />
                        {error && <span className="error-text">{error}</span>}
                    </div>

                    <button type="submit" className="submit-button">
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
