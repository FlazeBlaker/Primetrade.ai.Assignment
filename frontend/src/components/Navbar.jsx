import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            background: 'var(--bg-secondary)',
            borderBottom: 'var(--glass-border)',
            padding: '1rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                    DevAssignment
                </Link>
                <div>
                    {user ? (
                        <>
                            <span style={{ marginRight: '1rem', color: 'var(--text-secondary)' }}>Hello, {user.username}</span>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline" style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
