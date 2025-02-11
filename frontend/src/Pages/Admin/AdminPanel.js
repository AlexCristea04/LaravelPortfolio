import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Axios/AuthentificationContext';

const AdminPanel = () => {
    const { authToken } = useAuth();
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

        fetchProjects();
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
        window.location.href = `/admin/editproject/${projectId}`;
    };

    return (
        <div className="container mt-5">
            <h1 className="display-5 fw-bolder mb-4 text-center">
                <span className="text-gradient d-inline">Admin Panel</span>
            </h1>

            <h2 className="text-center mb-4">Manage Projects</h2>

            {loading && <p>Loading projects...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
                {projects.map((project) => {
                    // Find the English translation
                    const englishTranslation = project.translations?.find(t => t.language === 'en');

                    return (
                        <div className="col-md-4 mb-4" key={project.id}>
                            <div className="card shadow">
                                <img
                                    src={require('./Ok_-6023.png')}
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


            <h2 className="text-center mb-4 mt-5">Manage Testimonials</h2>
        </div>
    );
};

export default AdminPanel;
