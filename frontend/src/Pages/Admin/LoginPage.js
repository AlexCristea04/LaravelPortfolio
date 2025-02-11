import React, { useState } from 'react';
import { useAuth } from '../../Axios/AuthentificationContext';

const LoginPage = () => {
    const { login, logout, authToken, admin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-3">Admin Login</h3>

                {authToken ? (
                    <>
                        <p className="text-success text-center">
                            Welcome, <strong>{admin?.name}</strong>!
                        </p>
                        <button className="btn btn-danger w-100" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
