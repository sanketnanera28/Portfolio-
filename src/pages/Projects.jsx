import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const Projects = () => {
    const { data } = usePortfolio();
    const { projects } = data;

    return (
        <div className="section container animate-fade-in">
            <h2 className="section-title">My <span className="text-gradient">Projects</span></h2>

            <div className="projects-grid">
                {projects.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)' }}>No projects added yet.</p>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className="glass-panel project-card">
                            <div className="project-image-box">
                                <img
                                    src={project.image || 'https://placehold.co/600x400/1e293b/8b5cf6?text=Project'}
                                    alt={project.title}
                                    className="project-image"
                                    onError={(e) => e.target.src = 'https://placehold.co/600x400/1e293b/8b5cf6?text=Project'}
                                />
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="tech-tags">
                                    {project.technologies?.map((tech, index) => (
                                        <span key={index} className="tech-tag">{tech}</span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: 'var(--text-primary)' }}>
                                            <ExternalLink size={16} /> Live Demo
                                        </a>
                                    )}
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: 'var(--text-secondary)' }}>
                                            <Github size={16} /> Source
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Projects;
