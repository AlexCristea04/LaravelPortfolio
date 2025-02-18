import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import Profile from './profile.png';

const API_BASE_URL = process.env.REACT_APP_API_GATEWAY_HOST || 'http://127.0.0.1:8000/api';

const Home = () => {
    const { t } = useTranslation('home');

    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        authorname: '',
        companyname: '',
        review: '',
    });

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/testimonials`);
                const approvedTestimonials = response.data.filter(t => t.approval === true);
                setTestimonials(approvedTestimonials);
            } catch (err) {
                setError(t("error_testimonials"));
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, [t]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/testimonials`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            setShowModal(false);
            setFormData({ authorname: '', companyname: '', review: '' });
            setTestimonials([...testimonials, formData]); // Won't display until approved
        } catch (err) {
            console.error("Error submitting testimonial:", err);
        }
    };

    return (
        <main className="flex-shrink-0">
            {/* Header Section */}
            <header className="py-5">
                <div className="container px-5 pb-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-xxl-5">
                            <div className="text-center text-xxl-start">
                                <div className="badge bg-gradient-primary-to-secondary text-white mb-4">
                                    <div className="text-uppercase">{t("badge")}</div>
                                </div>
                                <div className="fs-3 fw-light text-muted">{t("greeting")}</div>
                                <h1 className="display-3 fw-bolder mb-5">
                                    <span className="text-gradient d-inline">{t("headline")}</span>
                                </h1>
                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                    <Link className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" to="/resume">
                                        {t("resume")}
                                    </Link>
                                    <Link className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" to="/projects">
                                        {t("projects")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7">
                            <div className="d-flex justify-content-center mt-xxl-0">
                                <div className="profile bg-gradient-primary-to-secondary">
                                    <img className="profile-img" src={Profile} alt="Profile" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* About Me Section */}
            <section className="bg-dark-subtle py-5">
                <div className="container px-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-xxl-8">
                            <div className="text-center my-5">
                                <h2 className="display-5 fw-bolder">
                                    <span className="text-gradient d-inline">{t("about_me_title")}</span>
                                </h2>
                                <p className="lead fw-light mb-4">{t("about_me_intro")}</p>
                                <p className="text-muted">
                                    {t("about_me_desc")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-5">
                <div className="container px-5">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bolder">{t("testimonials")}</h2>
                    </div>
                    {loading ? (
                        <div className="text-center">{t("loading")}</div>
                    ) : error ? (
                        <div className="text-center text-danger">{error}</div>
                    ) : testimonials.length === 0 ? (
                        <div className="text-center">{t("no_testimonials")}</div>
                    ) : (
                        <div className="row g-4">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="col-lg-4 col-md-6">
                                    <div className="card shadow rounded-4 border-0 p-4 h-100 d-flex">
                                        <div className="card-body d-flex flex-column">
                                            <blockquote className="blockquote flex-grow-1">
                                                <p className="fw-light"
                                                   style={{maxHeight: "100px", overflow: "hidden"}}>
                                                    "{testimonial.review}"
                                                </p>
                                                <footer className="blockquote-footer">
                                                    {testimonial.authorname} <br/>
                                                    <cite>{testimonial.companyname}</cite>
                                                </footer>
                                            </blockquote>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Leave a Testimonial Section */}
            <section className="py-5 bg-light text-center">
                <div className="container px-5">
                    <h3 className="fw-bolder">{t("leave_testimonial_prompt")}</h3>
                    <p className="lead">{t("leave_testimonial_cta")}</p>
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        {t("modal_title")}
                    </Button>
                </div>
            </section>

            {/* Testimonial Modal Form */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("modal_title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("name")}</Form.Label>
                            <Form.Control
                                type="text"
                                name="authorname"
                                value={formData.authorname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("company_name")}</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyname"
                                value={formData.companyname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("review")}</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="review"
                                value={formData.review}
                                onChange={handleChange}
                                rows={3}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {t("submit")}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </main>
    );
};

export default Home;
