import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MapPin, Send, Phone } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const { data, addMessage } = usePortfolio();
    const { personalInfo } = data;
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState(null); // 'success' | 'error' | null

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const newMessage = {
            name: e.target.name.value,
            email: e.target.email.value,
            text: e.target.message.value
        };

        const success = await addMessage(newMessage);

        setIsSubmitting(false);
        if (success) {
            setSubmitStatus('success');
            e.target.reset();
            setTimeout(() => setSubmitStatus(null), 5000);
        } else {
            setSubmitStatus('error');
        }
    };

    return (
        <div className="section container animate-fade-in">
            <h2 className="section-title">Get In <span className="text-gradient">Touch</span></h2>

            <div className="contact-grid">
                {/* Contact Info */}
                <div className="contact-info">
                    <h3 className="contact-info-title">Let's Talk</h3>
                    <p className="contact-info-text">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="contact-list">
                        <div className="contact-item">
                            <div className="contact-icon-box">
                                <Mail size={24} />
                            </div>
                            <div className="contact-item-details">
                                <h4>Email</h4>
                                <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon-box">
                                <Phone size={24} />
                            </div>
                            <div className="contact-item-details">
                                <h4>Phone</h4>
                                <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon-box">
                                <MapPin size={24} />
                            </div>
                            <div className="contact-item-details">
                                <h4>Location</h4>
                                <span>Ahmedabad</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="glass-panel contact-form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="John Doe"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="john@example.com"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                required
                                placeholder="Hello, I'd like to talk about..."
                                className="form-input"
                                style={{ resize: 'vertical' }}
                            ></textarea>
                        </div>

                        {submitStatus === 'success' && (
                            <div className="form-feedback success">
                                Thanks for your message! It has been sent successfully.
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="form-feedback error">
                                Failed to send message. Please check your connection and try again.
                            </div>
                        )}

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
