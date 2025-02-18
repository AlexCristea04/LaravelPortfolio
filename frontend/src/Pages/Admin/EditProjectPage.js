import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { useAuth } from '../../Axios/AuthentificationContext';

const API_BASE_URL = process.env.REACT_APP_API_GATEWAY_HOST || 'http://127.0.0.1:8000/api';

const EditProjectPage = () => {
    const { projectId } = useParams(); // Extract projectId from URL
    const navigate = useNavigate();
    const { authToken } = useAuth();

    const [formData, setFormData] = useState({
        image_id: '',
        url: '',
        title_en: '',
        description_en: '',
        role_en: '',
        title_fr: '',
        description_fr: '',
        role_fr: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch existing project data
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`);
                const project = response.data;

                // Extract translation data
                const enTranslation = project.translations.find(t => t.language === 'en') || {};
                const frTranslation = project.translations.find(t => t.language === 'fr') || {};

                setFormData({
                    image_id: project.image_id,
                    url: project.url,
                    title_en: enTranslation.title || '',
                    description_en: enTranslation.description || '',
                    role_en: enTranslation.role || '',
                    title_fr: frTranslation.title || '',
                    description_fr: frTranslation.description || '',
                    role_fr: frTranslation.role || '',
                });
            } catch (error) {
                console.error('Error fetching project:', error);
                setShowError(true);
                setErrorMessage('Failed to load project data.');
            }
        };

        fetchProject();
    }, [projectId]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updateData = {
                url: formData.url,
                translations: [
                    { language: 'en', title: formData.title_en, description: formData.description_en, role: formData.role_en },
                    { language: 'fr', title: formData.title_fr, description: formData.description_fr, role: formData.role_fr },
                ],
            };

            await axios.put(`${API_BASE_URL}/projects/${projectId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setShowSuccess(true);
        } catch (error) {
            console.error('Error updating project:', error);
            setShowError(true);
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Project</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Project URL</Form.Label>
                    <Form.Control type="url" name="url" value={formData.url} onChange={handleChange} required />
                </Form.Group>

                <h4>English Version</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title_en" value={formData.title_en} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description_en" value={formData.description_en} onChange={handleChange} rows={3} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" name="role_en" value={formData.role_en} onChange={handleChange} required />
                </Form.Group>

                <h4>French Version</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Title (French)</Form.Label>
                    <Form.Control type="text" name="title_fr" value={formData.title_fr} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description (French)</Form.Label>
                    <Form.Control as="textarea" name="description_fr" value={formData.description_fr} onChange={handleChange} rows={3} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Role (French)</Form.Label>
                    <Form.Control type="text" name="role_fr" value={formData.role_fr} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>

            {/* Success Modal */}
            <Modal show={showSuccess} onHide={() => { setShowSuccess(false); navigate('/admin/panel'); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your project has been updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate('/admin/panel')}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Error Modal */}
            <Modal show={showError} onHide={() => setShowError(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowError(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditProjectPage;
