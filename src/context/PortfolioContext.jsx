import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import defaultProfile from '../assets/profile.jpeg';
import {
    doc,
    onSnapshot,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc
} from 'firebase/firestore';

// Initial dummy data as fallback
const initialData = {
    personalInfo: {
        name: "Sanket Nanera",
        title: "Frontend Developer & UI/UX Enthusiast",
        bio: "I specialize in crafting premium, responsive web experiences. Welcome to my personal portfolio where I showcase my projects, skills, and professional journey.",
        email: "sanketnannera143@gmail.com",
        phone: "+91 9662146018",
        image: defaultProfile,
        github: "https://github.com/sanketnanera28",
        linkedin: "https://linkedin.com/in/sanket-nanera",
        instagram: "https://instagram.com/mr_sanket_nanera"
    },
    projects: [
        {
            id: 'proj-1',
            title: "Social Media Platform",
            description: "A comprehensive online platform enabling users to create and share content, manage their presence, and interact with others. Includes post creation, liking, and follow system.",
            technologies: ["Django", "Python", "PostgreSQL"],
            link: "#"
        },
        {
            id: 'proj-2',
            title: "Weather Forecast",
            description: "A real-time weather application with location detection, search capacity, current weather data, and graphical representations of climate trends.",
            technologies: ["React", "Weather API", "CSS"],
            link: "#"
        },
        {
            id: 'proj-3',
            title: "Food Ordering System",
            description: "A fully responsive food ordering system for mobile and desktop. Features cart management, order tracking, and extensive menu management.",
            technologies: ["React.js", "Django", "REST API"],
            link: "#"
        },
        {
            id: 'proj-4',
            title: "Clothing Brand",
            description: "An e-commerce platform for clothing retail providing a huge range of products for all ages. Includes integrated cart and billing systems.",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "#"
        },
        {
            id: 'proj-5',
            title: "Snap Gallery",
            description: "A premium image gallery categorized by themes where users can view and purchase high-quality photography.",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "#"
        },
        {
            id: 'proj-6',
            title: "Chatbox",
            description: "Real-time, peer-to-peer and client-server chat application supporting instant messaging and concurrent connections.",
            technologies: ["Socket.io", "Node.js", "Express"],
            link: "#"
        },
        {
            id: 'proj-7',
            title: "Expense Tracker",
            description: "A personal finance management tool for recording expenses and budget tracing to help users manage their financial goals.",
            technologies: ["Python", "SQLite"],
            link: "#"
        },
        {
            id: 'proj-8',
            title: "Hotel Booking System",
            description: "A robust system for room booking and filtering based on user requirements, integrated with a database management system.",
            technologies: ["Java", "DBMS", "Swing"],
            link: "#"
        },
        {
            id: 'proj-9',
            title: "Shop Management System",
            description: "An inventory and sales system with cart management, item editing, billing printing, and comprehensive error handling.",
            technologies: ["Java", "JDBC", "AWT"],
            link: "#"
        },
        {
            id: 'proj-10',
            title: "Music Playlist",
            description: "A music management app using advanced data structures (De-que) for efficient song management and playlist control.",
            technologies: ["Java", "Data Structures"],
            link: "#"
        },
        {
            id: 'proj-11',
            title: "Airplane Ticket Booking",
            description: "A travel management system for booking tickets with class preferences and automated ticket printing services.",
            technologies: ["Java", "Swing", "MySQL"],
            link: "#"
        }
    ],
    certificates: [
        {
            id: 'cert-1',
            title: "Exploratory Data Analysis for Machine Learning",
            issuer: "IBM",
            date: "Oct 2023",
            link: "#"
        },
        {
            id: 'cert-2',
            title: "HTML, CSS, and Javascript for Web Developers",
            issuer: "Johns Hopkins University",
            date: "Nov 2023",
            link: "#"
        },
        {
            id: 'cert-3',
            title: "Inheritance and Data Structures in Java",
            issuer: "Penn University of Pennsylvania",
            date: "Dec 2023",
            link: "#"
        },
        {
            id: 'cert-4',
            title: "Introduction to Java",
            issuer: "LearnQuest",
            date: "Jan 2024",
            link: "#"
        }
    ],
    qualifications: [
        {
            id: 'qual-1',
            type: 'education',
            title: "BTech in Information Technology",
            institution: "LJ University",
            period: "Nov 2022 - Present",
            description: "Currently pursuing a Bachelor of Technology with a focus on core engineering and software development."
        },
        {
            id: 'qual-2',
            type: 'education',
            title: "HSC & SSC",
            institution: "Shree ML Sheth Eng. Med. School",
            period: "Mar 2020 - Mar 2022",
            description: "Completed secondary and higher secondary education with a strong foundation in science and mathematics."
        },
        {
            id: 'qual-3',
            type: 'experience',
            title: "Business Development Intern",
            institution: "Dvij Infotech LLP",
            period: "Feb 2026 - Aug 2026",
            description: "Dedicated to driving business growth through strategic initiatives, market research, and client relationship management during the internship period."
        }
    ],
    messages: []
};

const PortfolioContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);

    const [isAdminAuth, setIsAdminAuth] = useState(() => {
        return localStorage.getItem('isAdminAuth') === 'true';
    });

    const [adminPassword, setAdminPassword] = useState(() => {
        return localStorage.getItem('adminPassword') || 'admin123';
    });

    // Initialize document helper
    const initializeDoc = async (docRef) => {
        try {
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, initialData);
                console.log("Firestore initialized with default data.");
            }
        } catch (error) {
            console.error("Failed to initialize Firestore:", error);
            // If permissions fail, we just use local initialData which is already set in state
        }
    };

    // Real-time listener for Firestore data
    useEffect(() => {
        const docRef = doc(db, 'portfolio', 'data');
        
        // Initial check and creation
        initializeDoc(docRef);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const firestoreData = docSnap.data();
                // Merge Firestore data with initialData to ensure defaults are preserved
                const mergedData = { 
                    ...initialData, 
                    ...firestoreData,
                    personalInfo: {
                        ...initialData.personalInfo,
                        ...(firestoreData.personalInfo || {})
                    }
                };
                
                // Ensure image fallback
                if (!mergedData.personalInfo.image || mergedData.personalInfo.image === "/src/assets/profile.jpeg") {
                    mergedData.personalInfo.image = defaultProfile;
                }
                
                setData(mergedData);
            }
            setLoading(false);
        }, (error) => {
            console.error("Firestore access error:", error);
            // If permission denied, still stop loading to show fallback data
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Auth functions
    const login = (password) => {
        if (password === adminPassword) {
            setIsAdminAuth(true);
            localStorage.setItem('isAdminAuth', 'true');
            return true;
        }
        return false;
    };

    const changePassword = (newPassword) => {
        setAdminPassword(newPassword);
        localStorage.setItem('adminPassword', newPassword);
    };

    const logout = () => {
        setIsAdminAuth(false);
        localStorage.removeItem('isAdminAuth');
    };

    // Content update functions using Firestore
    const updatePersonalInfo = async (newInfo) => {
        const docRef = doc(db, 'portfolio', 'data');
        try {
            await updateDoc(docRef, { personalInfo: newInfo });
            return true;
        } catch (e) {
            console.error("Error updating personal info:", e);
            return false;
        }
    };

    // Projects
    const addProject = async (project) => {
        const docRef = doc(db, 'portfolio', 'data');
        const newProj = { ...project, id: Date.now().toString() };
        try {
            await updateDoc(docRef, {
                projects: arrayUnion(newProj)
            });
            return true;
        } catch (e) {
            console.error("Error adding project:", e);
            return false;
        }
    };

    const deleteProject = async (id) => {
        const docRef = doc(db, 'portfolio', 'data');
        const projectToDelete = data.projects.find(p => p.id === id);
        if (!projectToDelete) return;
        try {
            await updateDoc(docRef, {
                projects: arrayRemove(projectToDelete)
            });
            return true;
        } catch (e) {
            console.error("Error deleting project:", e);
            return false;
        }
    };

    // Certificates
    const addCertificate = async (cert) => {
        const docRef = doc(db, 'portfolio', 'data');
        const newCert = { ...cert, id: Date.now().toString() };
        try {
            await updateDoc(docRef, {
                certificates: arrayUnion(newCert)
            });
            return true;
        } catch (e) {
            console.error("Error adding certificate:", e);
            return false;
        }
    };

    const deleteCertificate = async (id) => {
        const docRef = doc(db, 'portfolio', 'data');
        const certToDelete = data.certificates.find(c => c.id === id);
        if (!certToDelete) return;
        try {
            await updateDoc(docRef, {
                certificates: arrayRemove(certToDelete)
            });
            return true;
        } catch (e) {
            console.error("Error deleting certificate:", e);
            return false;
        }
    };

    // Qualifications
    const addQualification = async (qual) => {
        const docRef = doc(db, 'portfolio', 'data');
        const newQual = { ...qual, id: Date.now().toString() };
        try {
            await updateDoc(docRef, {
                qualifications: arrayUnion(newQual)
            });
            return true;
        } catch (e) {
            console.error("Error adding qualification:", e);
            return false;
        }
    };

    const deleteQualification = async (id) => {
        const docRef = doc(db, 'portfolio', 'data');
        const qualToDelete = data.qualifications.find(q => q.id === id);
        if (!qualToDelete) return;
        try {
            await updateDoc(docRef, {
                qualifications: arrayRemove(qualToDelete)
            });
            return true;
        } catch (e) {
            console.error("Error deleting qualification:", e);
            return false;
        }
    };

    // Message functions
    const addMessage = async (message) => {
        const docRef = doc(db, 'portfolio', 'data');
        const newMessage = { ...message, id: Date.now().toString(), date: new Date().toISOString() };
        try {
            await updateDoc(docRef, {
                messages: arrayUnion(newMessage)
            });
            return true;
        } catch (e) {
            console.error("Error adding message:", e);
            return false;
        }
    };

    const deleteMessage = async (id) => {
        const docRef = doc(db, 'portfolio', 'data');
        const msgToDelete = data.messages?.find(m => m.id === id);
        if (!msgToDelete) return;
        try {
            await updateDoc(docRef, {
                messages: arrayRemove(msgToDelete)
            });
            return true;
        } catch (e) {
            console.error("Error deleting message:", e);
            return false;
        }
    };

    return (
        <PortfolioContext.Provider value={{
            data,
            loading,
            isAdminAuth,
            login,
            logout,
            updatePersonalInfo,
            addProject,
            deleteProject,
            addCertificate,
            deleteCertificate,
            addQualification,
            deleteQualification,
            addMessage,
            deleteMessage,
            changePassword,
        }}>
            {children}
        </PortfolioContext.Provider>
    );
};
