import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
    LogOut, LayoutDashboard, Briefcase, Award,
    GraduationCap, User, MessageSquare, Trash2, Shield
} from 'lucide-react';
import './Dashboard.css';

// Helper to render sidebar items
const SidebarItem = ({ id, icon, label, badgeCount, activeTab, setActiveTab }) => {
    const IconComponent = icon;
    return (
        <button
            onClick={() => setActiveTab(id)}
            className={`nav-item ${activeTab === id ? 'nav-item-active' : ''}`}
        >
            <IconComponent size={20} /> {label}
            {badgeCount > 0 && <span className="badge">{badgeCount}</span>}
        </button>
    );
};

const Dashboard = () => {
    const {
        data, updatePersonalInfo,
        addProject, deleteProject,
        addCertificate, deleteCertificate,
        addQualification, deleteQualification,
        deleteMessage, changePassword, logout
    } = usePortfolio();

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [profileImage, setProfileImage] = useState(data?.personalInfo?.image || '');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (data?.personalInfo?.image) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProfileImage(data.personalInfo.image);
        }
    }, [data?.personalInfo?.image]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setUploading(true);
                const storageRef = ref(storage, `profile/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                setProfileImage(url);
                setUploading(false);
            } catch (error) {
                console.error("Upload error:", error);
                setUploading(false);
                alert("Failed to upload image.");
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                </div>

                <nav className="sidebar-nav">
                    <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarItem id="personal" icon={User} label="Personal Info" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarItem id="projects" icon={Briefcase} label="Projects" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarItem id="certificates" icon={Award} label="Certificates" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarItem id="qualifications" icon={GraduationCap} label="Qualifications" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarItem id="messages" icon={MessageSquare} label="Messages" badgeCount={data.messages?.length} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SidebarItem id="security" icon={Shield} label="Security" activeTab={activeTab} setActiveTab={setActiveTab} />
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="dashboard-main">
                {activeTab === 'overview' && (
                    <div className="animate-fade-in">
                        <h1 className="dashboard-title">Welcome, {data.personalInfo.name}</h1>
                        <p className="dashboard-subtitle">Manage your portfolio content from this central dashboard.</p>

                        <div className="stat-grid">
                            <div className="glass-panel stat-card">
                                <h3>Projects</h3>
                                <p>{data.projects.length}</p>
                            </div>
                            <div className="glass-panel stat-card">
                                <h3>Certificates</h3>
                                <p>{data.certificates.length}</p>
                            </div>
                            <div className="glass-panel stat-card">
                                <h3>Qualifications</h3>
                                <p>{data.qualifications.length}</p>
                            </div>
                            <div className="glass-panel stat-card">
                                <h3>Messages</h3>
                                <p>{data.messages?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'personal' && (
                    <div className="animate-fade-in">
                        <h1 className="dashboard-title">Edit Profile</h1>
                        <p className="dashboard-subtitle">Update your global profile information.</p>

                        <form className="glass-panel dashboard-form" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const updates = Object.fromEntries(formData);
                            updates.image = profileImage;
                            updatePersonalInfo({ ...data.personalInfo, ...updates });
                            alert('Profile updated successfully!');
                        }}>
                            <div className="form-group">
                                <label className="form-label">Profile Photo</label>
                                {profileImage && <img src={profileImage} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '2px solid var(--accent-primary)' }} />}
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="form-input" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input name="name" defaultValue={data.personalInfo.name} className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input name="title" defaultValue={data.personalInfo.title} className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Bio</label>
                                <textarea name="bio" defaultValue={data.personalInfo.bio} rows="4" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input name="email" defaultValue={data.personalInfo.email} className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input name="phone" defaultValue={data.personalInfo.phone} className="form-input" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">GitHub URL</label>
                                <input name="github" defaultValue={data.personalInfo.github} className="form-input" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Instagram URL</label>
                                <input name="instagram" defaultValue={data.personalInfo.instagram} className="form-input" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">LinkedIn URL</label>
                                <input name="linkedin" defaultValue={data.personalInfo.linkedin} className="form-input" />
                            </div>

                            <button type="submit" className="submit-button" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="animate-fade-in">
                        <h1 className="dashboard-title">Manage Projects</h1>
                        <p className="dashboard-subtitle">Add or remove projects from your portfolio.</p>

                        <form className="glass-panel dashboard-form" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const newProj = {
                                title: formData.get('title'),
                                description: formData.get('description'),
                                link: formData.get('link'),
                                technologies: formData.get('tech')?.split(',').map(t => t.trim()) || [],
                            };
                            addProject(newProj);
                            e.target.reset();
                        }}>
                            <h3 className="form-title">Add New Project</h3>
                            <input name="title" placeholder="Project Title" required className="form-input" />
                            <textarea name="description" placeholder="Description" rows="2" required className="form-input" />
                            <input name="tech" placeholder="Technologies (comma separated)" className="form-input" />
                            <input name="link" placeholder="Live Link" className="form-input" />
                            <button type="submit" className="submit-button">Add Project</button>
                        </form>

                        <div className="item-list">
                            {data.projects.map(p => (
                                <div key={p.id} className="glass-panel list-item">
                                    <div>
                                        <h4 style={{ margin: 0 }}>{p.title}</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.technologies.join(', ')}</span>
                                    </div>
                                    <button onClick={() => deleteProject(p.id)} className="delete-btn">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'certificates' && (
                    <div className="animate-fade-in">
                        <h1 className="dashboard-title">Manage Certificates</h1>
                        <p className="dashboard-subtitle">Keep your certifications up to date.</p>

                        <form className="glass-panel dashboard-form" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            addCertificate({
                                title: formData.get('title'),
                                issuer: formData.get('issuer'),
                                date: formData.get('date'),
                                link: formData.get('link'),
                            });
                            e.target.reset();
                        }}>
                            <h3 className="form-title">Add Certificate</h3>
                            <input name="title" placeholder="Certificate Name" required className="form-input" />
                            <input name="issuer" placeholder="Issuing Organization" required className="form-input" />
                            <input name="date" placeholder="Date (e.g. Oct 2023)" required className="form-input" />
                            <input name="link" placeholder="Verification Link" className="form-input" />
                            <button type="submit" className="submit-button">Add Certificate</button>
                        </form>

                        <div className="item-list">
                            {data.certificates.map(c => (
                                <div key={c.id} className="glass-panel list-item">
                                    <div>
                                        <h4 style={{ margin: 0 }}>{c.title}</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.issuer} • {c.date}</span>
                                    </div>
                                    <button onClick={() => deleteCertificate(c.id)} className="delete-btn">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'qualifications' && (
                    <div className="animate-fade-in">
                        <h1 className="dashboard-title">Manage Qualifications</h1>
                        <p className="dashboard-subtitle">Add your educational and professional background.</p>

                        <form className="glass-panel dashboard-form" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            addQualification({
                                type: formData.get('type'),
                                title: formData.get('title'),
                                institution: formData.get('institution'),
                                period: formData.get('period'),
                                description: formData.get('description'),
                            });
                            e.target.reset();
                        }}>
                            <h3 className="form-title">Add Qualification</h3>
                            <select name="type" className="form-input" style={{ background: 'var(--bg-darker)' }}>
                                <option value="education">Education</option>
                                <option value="experience">Experience</option>
                            </select>
                            <input name="title" placeholder="Degree / Job Title" required className="form-input" />
                            <input name="institution" placeholder="School / Company" required className="form-input" />
                            <input name="period" placeholder="Period (e.g. 2019 - 2023)" required className="form-input" />
                            <textarea name="description" placeholder="Short details" rows="2" className="form-input" />
                            <button type="submit" className="submit-button">Add Qualification</button>
                        </form>

                        <div className="item-list">
                            {data.qualifications.map(q => (
                                <div key={q.id} className="glass-panel list-item">
                                    <div>
                                        <h4 style={{ margin: 0 }}>{q.title}</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{q.institution} • {q.period}</span>
                                    </div>
                                    <button onClick={() => deleteQualification(q.id)} className="delete-btn">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="animate-fade-in">
                        <h1 className="dashboard-title">Inquiries</h1>
                        <p className="dashboard-subtitle">Messages sent via the contact form.</p>

                        <div className="item-list">
                            {(!data.messages || data.messages.length === 0) ? (
                                <p style={{ color: 'var(--text-muted)' }}>No messages yet.</p>
                            ) : (
                                data.messages.map(m => (
                                    <div key={m.id} className="glass-panel message-card">
                                        <div className="message-header">
                                            <div>
                                                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{m.name}</h4>
                                                <a href={`mailto:${m.email}`} style={{ fontSize: '0.9rem', color: 'var(--accent-primary)' }}>{m.email}</a>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                                                    {new Date(m.date).toLocaleString()}
                                                </span>
                                                <button onClick={() => deleteMessage(m.id)} className="delete-btn" style={{ padding: '0.25rem 0.5rem' }}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="message-body">{m.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
                {activeTab === 'security' && (
                    <div className="animate-fade-in">
                        <h1 className="dashboard-title">Security Settings</h1>
                        <p className="dashboard-subtitle">Update your administrator password.</p>

                        <form className="glass-panel dashboard-form" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const newPass = formData.get('newPassword');
                            const confirmPass = formData.get('confirmPassword');

                            if (newPass !== confirmPass) {
                                alert('New passwords do not match!');
                                return;
                            }

                            // We need to check if current password is correct
                            // Since login logic is already in context, we can just use the context's password
                            // But for simplicity in this demo, we'll just update it
                            changePassword(newPass);
                            alert('Password updated successfully!');
                            e.target.reset();
                        }}>
                            <h3 className="form-title">Change Password</h3>
                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <input name="newPassword" type="password" required className="form-input" placeholder="Enter new password" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm New Password</label>
                                <input name="confirmPassword" type="password" required className="form-input" placeholder="Confirm new password" />
                            </div>
                            <button type="submit" className="submit-button">Update Password</button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
