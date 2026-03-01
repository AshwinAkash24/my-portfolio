import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EducationList.css';

const EducationList = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio/education/`);

                // Sort by end_date descending or start_date descending
                const sortedData = response.data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
                setEducation(sortedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching education:', error);
                setLoading(false);
            }
        };
        fetchEducation();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    if (loading) return <div className="loader">Loading Education...</div>;

    return (
        <section id="education" className="education-section">
            <div className="section-header">
                <h2 className="section-title">Education</h2>
                <div className="section-underline"></div>
            </div>

            <div className="education-grid">
                {education.map((edu) => (
                    <div key={edu.id} className="education-card">
                        <div className="education-card-glass"></div>
                        <div className="education-content">
                            <div className="education-header">
                                <div className="education-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                                </div>
                                <div className="education-titles">
                                    <h3 className="degree-name">{edu.degree}</h3>
                                    <p className="field-study">{edu.field_of_study}</p>
                                </div>
                            </div>

                            <div className="institution-info">
                                <span className="institution-name">{edu.institution}</span>
                                <span className="education-duration">
                                    {formatDate(edu.start_date)} — {edu.is_current ? 'Present' : formatDate(edu.end_date)}
                                </span>
                            </div>

                            {edu.description && (
                                <p className="education-description">{edu.description}</p>
                            )}
                        </div>
                        <div className="card-accent-line"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EducationList;
