import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Axios/AuthentificationContext';

import './Shared/global.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';

// Importing pages
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import Projects from './Pages/Projects/Projects';
import Resume from './Pages/Resume/Resume';
import LoginPage from './Pages/Admin/LoginPage';
import ProtectedRoute from './Axios/ProtectedRoute';
import AdminPanel from './Pages/Admin/AdminPanel';

function App() {
    console.log(process.env.REACT_APP_API_GATEWAY_HOST);

    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Navbar />
                    <main className="content">
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/resume" element={<Resume />} />
                            <Route path="/admin/login" element={<LoginPage />} />

                            {/* Protected routes */}
                            <Route
                                path="/admin/panel"
                                element={
                                    <ProtectedRoute>
                                        <AdminPanel />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
