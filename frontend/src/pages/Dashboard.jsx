import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Input from '../components/Input';

const Dashboard = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Form State
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Electronics'
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data.data);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', formData);
            setFormData({ name: '', description: '', price: '', category: 'Electronics' });
            setShowForm(false);
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete product');
        }
    };

    if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading...</div>;

    return (
        <div className="container fade-in" style={{ padding: '2rem 1rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>manage your products</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add Product'}
                </button>
            </header>

            {showForm && (
                <div className="card" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
                        <Input label="Description" name="description" value={formData.description} onChange={handleChange} required />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <Input label="Price" type="number" name="price" value={formData.price} onChange={handleChange} required />
                            </div>
                            <div style={{ flex: 1 }} className="input-group">
                                <label>Category</label>
                                <select name="category" value={formData.category} onChange={handleChange}>
                                    <option>Electronics</option>
                                    <option>Clothing</option>
                                    <option>Home</option>
                                    <option>Sports</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Create Product</button>
                    </form>
                </div>
            )}

            {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {products.map(product => (
                    <div key={product._id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                            <span style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-color)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.8rem' }}>
                                {product.category}
                            </span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', height: '3rem', overflow: 'hidden' }}>{product.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${product.price}</span>
                            {(user.role === 'admin' || user._id === product.createdBy._id || user._id === product.createdBy) && (
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="btn btn-outline"
                                    style={{ color: 'var(--danger)', borderColor: 'var(--danger)', padding: '0.25rem 0.75rem', fontSize: '0.9rem' }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            By: {product.createdBy?.username || 'Unknown'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
