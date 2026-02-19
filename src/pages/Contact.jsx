import React, { useState } from 'react';
import '../styles/InfoPages.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitStatus('sending');
        
        setTimeout(() => {
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 1500);
    };

    return (
        <div className="info-page-container">
            <h1>Nous contacter</h1>
            <p>Une question ? Une suggestion ? N'hésitez pas à nous écrire via le formulaire ci-dessous.</p>
            
            {submitStatus === 'success' && (
                <div className="status-message success" style={{marginBottom: '2rem'}}>
                    Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.
                </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Nom complet</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Sujet</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="form-textarea"
                        rows="5"
                    ></textarea>
                </div>

                <button type="submit" className="btn-primary" disabled={submitStatus === 'sending'}>
                    {submitStatus === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
                </button>
            </form>

            <div className="contact-info-direct">
                <h3>Autres moyens de contact</h3>
                <p>Email: contact@cafthe.fr</p>
                <p>Téléphone: +33 1 23 45 67 89</p>
                <p>Adresse: 12 Rue du Commerce, 41000 Blois, France</p>
            </div>
        </div>
    );
};

export default Contact;
