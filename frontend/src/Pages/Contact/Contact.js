import { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
import '../../Languages/i18n.js';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation('contact');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate form submission (replace this with actual API call)
        setTimeout(() => {
            setStatus('success'); // Change to 'error' to simulate an error
        }, 1000);
    };

    return (
        <main className="flex-shrink-0">
            {/* Contact Section */}
            <section className="py-5">
                <div className="container px-5">
                    <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                        <div className="text-center mb-5">
                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3">
                                <AiOutlineMail/>
                            </div>
                            <h1 className="fw-bolder">{t("Title")}</h1>
                            <p className="lead fw-normal text-muted mb-0">{t("Subtitle")}</p>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">
                                <form id="contactForm" onSubmit={handleSubmit}>
                                    {/* Name input */}
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control"
                                            id="name"
                                            type="text"
                                            placeholder="Enter your name..."
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="name">{t("Name")}</label>
                                    </div>

                                    {/* Email input */}
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control"
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="email">{t("Email")}</label>
                                    </div>

                                    {/* Message input */}
                                    <div className="form-floating mb-3">
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        placeholder="Enter your message here..."
                                        style={{ height: '10rem' }}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                        <label htmlFor="message">Message</label>
                                    </div>

                                    {/* Success & Error Messages */}
                                    {status === 'success' && (
                                        <div className="text-center mb-3 text-success">
                                            <div className="fw-bolder">Form submission successful!</div>
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="text-center text-danger mb-3">
                                            Error sending message!
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-lg" id="submitButton" type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
