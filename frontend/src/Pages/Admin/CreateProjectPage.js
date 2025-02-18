import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Axios/AuthentificationContext';
import { Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_GATEWAY_HOST || 'http://127.0.0.1:8000/api';

const CreateProjectPage = () => {
    const { authToken } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        image: null,
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

    // Handle text inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image upload
    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataObj = new FormData();
            formDataObj.append('image', formData.image);
            formDataObj.append('url', formData.url);

            const translations = [
                { language: 'en', title: formData.title_en, description: formData.description_en, role: formData.role_en },
                { language: 'fr', title: formData.title_fr, description: formData.description_fr, role: formData.role_fr }
            ];

            formDataObj.append('translations', JSON.stringify(translations));

            const response = await axios.post(`${API_BASE_URL}/projects`, formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.status === 200) {
                setShowSuccess(true);
                setTimeout(() => navigate('/admin/panel'), 2000);
            }
        } catch (error) {
            setShowError(true);
            setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create a New Project</h2>

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Image Upload */}
                <Form.Group className="mb-3">
                    <Form.Label>Project Image</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} required />
                </Form.Group>

                {/* Project URL */}
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
                    Submit
                </Button>
            </Form>

            {/* Success Modal */}
            <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your project has been created successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuccess(false)}>Close</Button>
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

export default CreateProjectPage;
