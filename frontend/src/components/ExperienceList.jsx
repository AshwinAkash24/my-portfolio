import { useState, useEffect } from 'react';
import axios from 'axios';
import './ExperienceList.css';
import './Modal.css';

export default function ExperienceList() {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedExperience, setSelectedExperience] = useState(null);

    const closeModal = () => setSelectedExperience(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio/experience/`)

            .then(res => {
                setExperience(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching experience", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (loading) return <div className="loader">Loading experience...</div>;

    if (experience.length === 0) return null;

    return (
        <section className="section experience-section reveal" id="experience">
            <h2 className="section-title">Work Experience</h2>
            <div className="experience-timeline">
                {experience.map(exp => (
                    <div key={exp.id} className="experience-item">
                        <div className="experience-header">
                            <h3 className="experience-role">{exp.role}</h3>
                            <span className="experience-duration">{exp.duration}</span>
                        </div>
                        <h4 className="experience-company">{exp.company}</h4>
                        <p className="experience-description">{exp.description}</p>

                        {(exp.problem_statement || exp.task_details || exp.my_solution) && (
                            <button
                                onClick={() => setSelectedExperience(exp)}
                                className="btn-secondary"
                                style={{ marginTop: '1rem', alignSelf: 'flex-start' }}
                            >
                                View Details
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {selectedExperience && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <h2>{selectedExperience.role} at {selectedExperience.company}</h2>

                        <div className="project-details-list modal-details">
                            {selectedExperience.problem_statement && (
                                <div className="detail-item">
                                    <strong>My Approach:</strong>
                                    {selectedExperience.problem_statement}
                                </div>
                            )}
                            {selectedExperience.task_details && (
                                <div className="detail-item">
                                    <strong>The Task:</strong>
                                    {selectedExperience.task_details}
                                </div>
                            )}
                            {selectedExperience.my_solution && (
                                <div className="detail-item">
                                    <strong>Solution:</strong>
                                    {selectedExperience.my_solution}
                                </div>
                            )}
                        </div>

                        {selectedExperience.company_url && (
                            <div className="modal-actions">
                                <a
                                    href={selectedExperience.company_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                    Visit Company Website
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
