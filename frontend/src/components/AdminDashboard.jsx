import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import './Modal.css';

const API_BASE = `${import.meta.env.VITE_API_URL}/api/portfolio`;


const AdminDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('projects');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Form states
    const [formData, setFormData] = useState({});

    const tabs = [
        { id: 'projects', label: 'Projects', endpoint: '/projects/' },
        { id: 'skills', label: 'Skills', endpoint: '/skills/' },
        { id: 'experience', label: 'Experience', endpoint: '/experience/' },
        { id: 'certificates', label: 'Certificates', endpoint: '/certificates/' },
        { id: 'education', label: 'Education', endpoint: '/education/' },
    ];

    const currentTab = tabs.find(t => t.id === activeTab);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE}${currentTab.endpoint}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`${API_BASE}${currentTab.endpoint}${id}/`);
                fetchData();
            } catch (error) {
                alert('Error deleting item');
            }
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData(item);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({});
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await axios.put(`${API_BASE}${currentTab.endpoint}${editingItem.id}/`, formData);
            } else {
                await axios.post(`${API_BASE}${currentTab.endpoint}`, formData);
            }
            setShowForm(false);
            fetchData();
        } catch (error) {
            alert('Error saving item');
        }
    };

    const renderFormFields = () => {
        switch (activeTab) {
            case 'projects':
                return (
                    <>
                        <input type="text" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        <textarea placeholder="Description" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                        <textarea placeholder="Problem Statement" value={formData.problem_statement || ''} onChange={e => setFormData({ ...formData, problem_statement: e.target.value })} />
                        <textarea placeholder="Task Details" value={formData.task_details || ''} onChange={e => setFormData({ ...formData, task_details: e.target.value })} />
                        <textarea placeholder="My Solution" value={formData.my_solution || ''} onChange={e => setFormData({ ...formData, my_solution: e.target.value })} />
                        <input type="url" placeholder="Image URL" value={formData.image_url || ''} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
                        <input type="url" placeholder="Project URL" value={formData.project_url || ''} onChange={e => setFormData({ ...formData, project_url: e.target.value })} />
                        <input type="url" placeholder="GitHub URL" value={formData.github_url || ''} onChange={e => setFormData({ ...formData, github_url: e.target.value })} />
                    </>
                );
            case 'skills':
                return (
                    <>
                        <input type="text" placeholder="Skill Name" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        <input type="text" placeholder="Category" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
                    </>
                );
            case 'experience':
                return (
                    <>
                        <input type="text" placeholder="Role" value={formData.role || ''} onChange={e => setFormData({ ...formData, role: e.target.value })} required />
                        <input type="text" placeholder="Company" value={formData.company || ''} onChange={e => setFormData({ ...formData, company: e.target.value })} required />
                        <input type="url" placeholder="Company URL (Optional)" value={formData.company_url || ''} onChange={e => setFormData({ ...formData, company_url: e.target.value })} />
                        <input type="text" placeholder="Duration" value={formData.duration || ''} onChange={e => setFormData({ ...formData, duration: e.target.value })} required />
                        <textarea placeholder="Overall Description" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        <textarea placeholder="Problem Statement" value={formData.problem_statement || ''} onChange={e => setFormData({ ...formData, problem_statement: e.target.value })} />
                        <textarea placeholder="Task Details" value={formData.task_details || ''} onChange={e => setFormData({ ...formData, task_details: e.target.value })} />
                        <textarea placeholder="My Solution" value={formData.my_solution || ''} onChange={e => setFormData({ ...formData, my_solution: e.target.value })} />
                    </>
                );
            case 'certificates':
                return (
                    <>
                        <input type="text" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        <input type="text" placeholder="Organization" value={formData.issuing_organization || ''} onChange={e => setFormData({ ...formData, issuing_organization: e.target.value })} required />
                        <input type="date" value={formData.issue_date || ''} onChange={e => setFormData({ ...formData, issue_date: e.target.value })} required />
                        <input type="url" placeholder="Certificate URL" value={formData.certificate_url || ''} onChange={e => setFormData({ ...formData, certificate_url: e.target.value })} />
                        <input type="text" placeholder="Credential ID" value={formData.credential_id || ''} onChange={e => setFormData({ ...formData, credential_id: e.target.value })} />
                    </>
                );
            case 'education':
                return (
                    <>
                        <input type="text" placeholder="Institution" value={formData.institution || ''} onChange={e => setFormData({ ...formData, institution: e.target.value })} required />
                        <input type="text" placeholder="Degree" value={formData.degree || ''} onChange={e => setFormData({ ...formData, degree: e.target.value })} required />
                        <input type="text" placeholder="Field of Study" value={formData.field_of_study || ''} onChange={e => setFormData({ ...formData, field_of_study: e.target.value })} required />
                        <input type="date" value={formData.start_date || ''} onChange={e => setFormData({ ...formData, start_date: e.target.value })} required />
                        <input type="date" value={formData.end_date || ''} onChange={e => setFormData({ ...formData, end_date: e.target.value })} />
                        <textarea placeholder="Description" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        <label className="checkbox-label">
                            <input type="checkbox" checked={formData.is_current || false} onChange={e => setFormData({ ...formData, is_current: e.target.checked })} />
                            Is Current
                        </label>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard-container">
            <header className="dashboard-header">
                <h2>Content Management</h2>
                <div className="header-actions">
                    <button className="btn-logout" onClick={onLogout}>Exit Dashboard</button>
                </div>
            </header>

            <nav className="dashboard-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            <main className="dashboard-content">
                <div className="content-actions">
                    <h3>Manage {currentTab.label}</h3>
                    <button className="btn-add" onClick={handleAdd}>+ Add New {currentTab.label.slice(0, -1)}</button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="data-table-wrapper">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Title/Name</th>
                                    <th>Subdetails</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.title || item.name || item.institution || item.role}</td>
                                        <td>{item.company || item.degree || item.category || item.issuing_organization || item.description?.substring(0, 50) + '...'}</td>
                                        <td className="table-actions">
                                            <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {showForm && (
                <div className="modal-overlay">
                    <div className="admin-modal">
                        <h3>{editingItem ? 'Edit' : 'Add New'} {currentTab.label.slice(0, -1)}</h3>
                        <form onSubmit={handleSubmit} className="admin-form">
                            {renderFormFields()}
                            <div className="form-actions">
                                <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">Cancel</button>
                                <button type="submit" className="btn-save">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
