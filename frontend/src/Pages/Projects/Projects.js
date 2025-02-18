import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Languages/i18n.js';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = process.env.REACT_APP_API_GATEWAY_HOST || 'http://127.0.0.1:8000/api';
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300"; // Default image if none exists

const Projects = () => {
    const { t, i18n } = useTranslation('projects');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch projects from backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/projects`);
                setProjects(response.data);
            } catch (err) {
                setError("Failed to load projects. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return <div className="text-center py-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-5 text-danger">{error}</div>;
    }

    return (
        <main className="flex-shrink-0">
            {/* Projects Section */}
            <section className="py-5">
                <div className="container px-5 mb-5">
                    <div className="text-center mb-5">
                        <h1 className="display-5 fw-bolder mb-0">
                            <span className="text-gradient d-inline">{t("Projects")}</span>
                        </h1>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-11 col-xl-9 col-xxl-8">
                            {projects.map((project) => {
                                // Get project translation based on current language
                                const translation = project.translations.find(tr => tr.language === i18n.language) || {};
                                return (
                                    <div key={project.id} className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                                        <div className="card-body p-0 d-flex flex-column flex-md-row align-items-center justify-content-between">
                                            <div className="p-5 flex-grow-1">
                                                <h2 className="fw-bolder">{translation.title || "Untitled Project"}</h2>
                                                <p>{translation.description || "No description available."}</p>
                                                <Link to={project.url} target="_blank" className="btn btn-primary">
                                                    {t("Project Link")}
                                                </Link>
                                            </div>
                                            <img
                                                className="img-fluid ms-auto"
                                                src={project.image_url || PLACEHOLDER_IMAGE}
                                                alt={translation.title || "Project"}
                                                style={{
                                                    width: '300px',
                                                    height: '300px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px' // Optional for rounded corners
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-5 bg-gradient-primary-to-secondary text-white">
                <div className="container px-5 my-5">
                    <div className="text-center">
                        <h2 className="display-4 fw-bolder mb-4">{t("Build")}</h2>
                        <Link className="btn btn-outline-light btn-lg px-5 py-3 fs-6 fw-bolder" to="/contact">
                            {t("Contact")}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Projects;
