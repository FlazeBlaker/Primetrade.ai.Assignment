import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 80px)',
            textAlign: 'center'
        }}>
            <h1 className="fade-in" style={{ fontSize: '4rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Next Gen Backend
            </h1>
            <p className="fade-in" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', animationDelay: '0.2s' }}>
                Experience a scalable, secure, and high-performance REST API built with Node.js and MongoDB.
            </p>
            <div className="fade-in" style={{ animationDelay: '0.4s' }}>
                <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}>
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Home;
