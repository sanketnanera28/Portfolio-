import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, GraduationCap } from 'lucide-react';
import './Qualifications.css';

const Qualifications = () => {
    const { data } = usePortfolio();
    const { qualifications } = data;

    const education = qualifications.filter(q => q.type === 'education');
    const experience = qualifications.filter(q => q.type === 'experience');

    const renderColumn = (title, icon, items) => (
        <div className="qual-column">
            <h3 className="column-title">
                <span className="column-icon">{icon}</span>
                {title}
            </h3>

            <div className="timeline-container">
                <div className="timeline-line"></div>

                {items.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', marginLeft: '2.5rem' }}>No entries added yet.</p>
                ) : (
                    items.map((item, index) => (
                        <div key={item.id} className="glass-panel timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="timeline-dot"></div>
                            <h4 className="qual-title">{item.title}</h4>
                            <div className="qual-institution">{item.institution}</div>
                            <div className="qual-period">{item.period}</div>
                            <p className="qual-description">{item.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="section container animate-fade-in">
            <h2 className="section-title">My <span className="text-gradient">Qualifications</span></h2>

            <div className="qualifications-grid">
                {renderColumn('Education', <GraduationCap size={24} />, education)}
                {renderColumn('Experience', <Briefcase size={24} />, experience)}
            </div>
        </div>
    );
};

export default Qualifications;
