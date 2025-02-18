import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Axios/AuthentificationContext';
import {useNavigate} from "react-router-dom";
import {Button, Card} from "react-bootstrap";

const AdminPanel = () => {
    const navigate = useNavigate();
    const { authToken, logout } = useAuth();
    const [testimonials, setTestimonials] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = process.env.REACT_APP_API_GATEWAY_HOST || 'http://127.0.0.1:8000/api';

    // Fetch projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/projects`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setProjects(response.data);
            } catch (err) {
                setError('Failed to load projects');
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        const fetchTestimonials = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/testimonials`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setTestimonials(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch testimonials.");
                setLoading(false);
            }
        };

        fetchProjects();
        fetchTestimonials();
    }, [authToken, API_BASE_URL]);

    // Delete a project
    const handleDelete = async (projectId) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            await axios.delete(`${API_BASE_URL}/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            setProjects(projects.filter((project) => project.id !== projectId)); // Update UI
        } catch (err) {
            console.error('Failed to delete project:', err);
            alert('Error deleting project');
        }
    };

    // Modify a project (Redirect to edit page)
    const handleModify = (projectId) => {
        window.location.href = `/admin/panel/editproject/${projectId}`;
    };

    //TESTIMONIALS
    const handleApprove = async (id) => {
        try {
            await axios.patch(
                `${API_BASE_URL}/testimonials/${id}/approve`,
                {},
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            );
            setTestimonials((prev) =>
                prev.map((t) => (t.id === id ? { ...t, approval: true } : t))
            );
        } catch (error) {
            console.error("Error approving testimonial:", error);
        }
    };

    const handleUnapprove = async (id) => {
        try {
            await axios.patch(
                `${API_BASE_URL}/testimonials/${id}/unapprove`,
                {},
                {
                    headers: { Authorization: `Bearer ${authToken}` },
                }
            );
            setTestimonials((prev) =>
                prev.map((t) => (t.id === id ? { ...t, approval: false } : t))
            );
        } catch (error) {
            console.error("Error unapproving testimonial:", error);
        }
    };

    const handleTestimonialDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            await axios.delete(`${API_BASE_URL}/testimonial/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            setTestimonials((prev) =>
                prev.map((t) => (t.id === id ? { ...t, approval: false } : t))
            );

        } catch (err) {
            console.error('Failed to delete testimonial:', err);
            alert('Error deleting testimonial');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="display-5 fw-bolder mb-4 text-center">
                <span className="text-gradient d-inline">Admin Panel</span>
            </h1>

            <button className="btn btn-danger mb-3 d-inline" onClick={logout}>
                Logout
            </button>

            <h2 className="text-center mb-4">Manage Projects</h2>

            {loading && <p>Loading projects...</p>}
            {error && <p className="text-danger">{error}</p>}

            <button
                className="btn btn-primary mb-3"
                onClick={() => navigate('/admin/panel/createproject')}
            >
                Add Project
            </button>

            <div className="row">
                {projects.map((project) => {
                    // Find the English translation
                    const englishTranslation = project.translations?.find(t => t.language === 'en');

                    return (
                        <div className="col-md-4 mb-4" key={project.id}>
                            <div className="card shadow">
                                <img
                                    src={project.image_url || require('./Ok_-6023.png')}
                                    className="card-img-top"
                                    alt={englishTranslation?.title || 'Project Image'}
                                    style={{height: '200px', objectFit: 'cover'}}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{englishTranslation?.title || 'No Title Available'}</h5>
                                    <p className="card-text">{englishTranslation?.description || 'No Description Available'}</p>
                                    <p className="text-muted">
                                        <small>Created: {new Date(project.created_at).toLocaleDateString()}</small><br/>
                                        <small>Updated: {new Date(project.updated_at).toLocaleDateString()}</small>
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-warning" onClick={() => handleModify(project.id)}>
                                            Modify
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(project.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Approved Testimonials */}
            <section className="mb-5">
                <h2 className="text-center mt-4 mb-4">Approved Testimonials</h2>
                <div className="row">
                    {testimonials
                        .filter((testimonial) => testimonial.approval)
                        .map((testimonial) => (
                            <div key={testimonial.id} className="col-md-4">
                                <Card className="shadow p-3 mb-4">
                                    <Card.Body>
                                        <Card.Title>{testimonial.authorname}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{testimonial.companyname}</Card.Subtitle>
                                        <Card.Text>{testimonial.review}</Card.Text>
                                        <Button variant="danger" onClick={() => handleTestimonialDelete(testimonial.id)} className="me-2">
                                            Delete
                                        </Button>
                                        <Button variant="warning" onClick={() => handleUnapprove(testimonial.id)}>
                                            Unapprove
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                </div>
            </section>

            {/* Unapproved Testimonials */}
            <section>
                <h2 className="text-center mt-4 mb-4">Unapproved Testimonials</h2>
                <div className="row">
                    {testimonials
                        .filter((testimonial) => !testimonial.approval)
                        .map((testimonial) => (
                            <div key={testimonial.id} className="col-md-4">
                                <Card className="shadow p-3 mb-4">
                                    <Card.Body>
                                        <Card.Title>{testimonial.authorname}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{testimonial.companyname}</Card.Subtitle>
                                        <Card.Text>{testimonial.review}</Card.Text>
                                        <Button variant="danger" onClick={() => handleTestimonialDelete(testimonial.id)} className="me-2">
                                            Delete
                                        </Button>
                                        <Button variant="success" onClick={() => handleApprove(testimonial.id)}>
                                            Approve
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default AdminPanel;
