import React, { createContext, useState, useEffect, useContext } from 'react';

// Initial dummy data
const initialData = {
    personalInfo: {
        name: "Sanket Nanera",
        title: "Frontend Developer & UI/UX Enthusiast",
        bio: "I specialize in crafting premium, responsive web experiences. Welcome to my personal portfolio where I showcase my projects, skills, and professional journey.",
        email: "sanket@example.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
    },
    projects: [
        {
            id: "1",
            title: "E-Commerce Dashboard",
            description: "A premium admin dashboard for e-commerce platforms with real-time analytics.",
            technologies: ["React", "Tailwind CSS", "Recharts"],
            link: "https://example.com/project1",
            image: "https://placehold.co/600x400/1e293b/8b5cf6?text=Dashboard"
        },
        {
            id: "2",
            title: "Finance Tracker App",
            description: "Personal finance management application with intuitive data visualization.",
            technologies: ["Next.js", "TypeScript", "Framer Motion"],
            link: "https://example.com/project2",
            image: "https://placehold.co/600x400/1e293b/3b82f6?text=Finance+App"
        }
    ],
    certificates: [
        {
            id: "1",
            title: "Advanced React Patterns",
            issuer: "Frontend Masters",
            date: "Oct 2023",
            link: "https://example.com/cert1",
            image: "https://placehold.co/400x300/1e293b/ec4899?text=React+Cert"
        },
        {
            id: "2",
            title: "UI/UX Design Professional",
            issuer: "Google Coursera",
            date: "Aug 2023",
            link: "https://example.com/cert2",
            image: "https://placehold.co/400x300/1e293b/8b5cf6?text=UI+UX+Cert"
        }
    ],
    qualifications: [
        {
            id: "1",
            type: "education",
            title: "Bachelor of Computer Science",
            institution: "University Name",
            period: "2019 - 2023",
            description: "Graduated with honors, focusing on Web Technologies and Human-Computer Interaction."
        }
    ],
    messages: []
};

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        // Try to load from Local Storage first
        const savedData = localStorage.getItem('portfolioData');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error("Failed to parse local storage data", e);
                return initialData;
            }
        }
        return initialData;
    });

    const [isAdminAuth, setIsAdminAuth] = useState(() => {
        return localStorage.getItem('isAdminAuth') === 'true';
    });

    // Save to local storage whenever data changes
    useEffect(() => {
        localStorage.setItem('portfolioData', JSON.stringify(data));
    }, [data]);

    // Auth functions
    const login = (password) => {
        // Basic password check for the demo
        if (password === 'admin123') {
            setIsAdminAuth(true);
            localStorage.setItem('isAdminAuth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdminAuth(false);
        localStorage.removeItem('isAdminAuth');
    };

    // Content update functions
    const updatePersonalInfo = (newInfo) => {
        setData(prev => ({ ...prev, personalInfo: newInfo }));
    };

    // Projects
    const addProject = (project) => {
        setData(prev => ({
            ...prev,
            projects: [...prev.projects, { ...project, id: Date.now().toString() }]
        }));
    };

    const updateProject = (id, updatedProject) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.map(p => p.id === id ? { ...p, ...updatedProject } : p)
        }));
    };

    const deleteProject = (id) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.id !== id)
        }));
    };

    // Certificates
    const addCertificate = (cert) => {
        setData(prev => ({
            ...prev,
            certificates: [...prev.certificates, { ...cert, id: Date.now().toString() }]
        }));
    };

    const updateCertificate = (id, updatedCert) => {
        setData(prev => ({
            ...prev,
            certificates: prev.certificates.map(c => c.id === id ? { ...c, ...updatedCert } : c)
        }));
    };

    const deleteCertificate = (id) => {
        setData(prev => ({
            ...prev,
            certificates: prev.certificates.filter(c => c.id !== id)
        }));
    };

    // Qualifications
    const addQualification = (qual) => {
        setData(prev => ({
            ...prev,
            qualifications: [...prev.qualifications, { ...qual, id: Date.now().toString() }]
        }));
    };

    const updateQualification = (id, updatedQual) => {
        setData(prev => ({
            ...prev,
            qualifications: prev.qualifications.map(q => q.id === id ? { ...q, ...updatedQual } : q)
        }));
    };

    const deleteQualification = (id) => {
        setData(prev => ({
            ...prev,
            qualifications: prev.qualifications.filter(q => q.id !== id)
        }));
    };

    // Message functions
    const addMessage = (message) => {
        setData(prev => ({
            ...prev,
            messages: [...(prev.messages || []), { ...message, id: Date.now().toString(), date: new Date().toISOString() }]
        }));
    };

    const deleteMessage = (id) => {
        setData(prev => ({
            ...prev,
            messages: (prev.messages || []).filter(m => m.id !== id)
        }));
    };

    return (
        <PortfolioContext.Provider value={{
            data,
            isAdminAuth,
            login,
            logout,
            updatePersonalInfo,
            addProject,
            updateProject,
            deleteProject,
            addCertificate,
            updateCertificate,
            deleteCertificate,
            addQualification,
            updateQualification,
            deleteQualification,
            addMessage,
            deleteMessage,
        }}>
            {children}
        </PortfolioContext.Provider>
    );
};
