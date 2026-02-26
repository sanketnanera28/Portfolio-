import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, ExternalLink } from 'lucide-react';
import './Certificates.css';

const Certificates = () => {
    const { data } = usePortfolio();
    const { certificates } = data;

    return (
        <div className="section container animate-fade-in">
            <h2 className="section-title">My <span className="text-gradient">Certificates</span></h2>

            <div className="certificates-grid">
                {certificates.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>No certificates added yet.</p>
                ) : (
                    certificates.map(cert => (
                        <div key={cert.id} className="glass-panel cert-card">
                            <div className="cert-image-box">
                                <img
                                    src={cert.image || 'https://placehold.co/400x300/1e293b/ec4899?text=Certificate'}
                                    alt={cert.title}
                                    className="cert-image"
                                    onError={(e) => e.target.src = 'https://placehold.co/400x300/1e293b/ec4899?text=Certificate'}
                                />
                                <div className="cert-badge">
                                    <Award size={20} />
                                </div>
                            </div>

                            <div className="cert-content">
                                <h3 className="cert-title">{cert.title}</h3>
                                <div className="cert-meta">
                                    <span className="cert-issuer">{cert.issuer}</span>
                                    <span className="cert-date">{cert.date}</span>
                                </div>

                                {cert.link && (
                                    <div className="cert-footer">
                                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                                            <ExternalLink size={16} /> View Credential
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Certificates;
