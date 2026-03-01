import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import './ProjectList.css';
import './Modal.css';

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    const closeModal = () => setSelectedProject(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio/projects/`)

            .then(res => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching projects", err);
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

    if (loading) return <div className="loader">Loading projects...</div>;

    return (
        <section className="section projects-section reveal" id="projects">
            <h2 className="section-title">My Projects</h2>
            <div className="projects-grid">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onOpenModal={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/* Modal Overlay rendered outside the project cards */}
            {selectedProject && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <h2>{selectedProject.title}</h2>

                        <div className="project-details-list modal-details">
                            {selectedProject.problem_statement && (
                                <div className="detail-item">
                                    <strong>Problem:</strong> {selectedProject.problem_statement}
                                </div>
                            )}
                            {selectedProject.task_details && (
                                <div className="detail-item">
                                    <strong>Task:</strong> {selectedProject.task_details}
                                </div>
                            )}
                            {selectedProject.my_solution && (
                                <div className="detail-item">
                                    <strong>My Solution:</strong> {selectedProject.my_solution}
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            {selectedProject.project_url && (
                                <a
                                    href={selectedProject.project_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    View Project
                                </a>
                            )}
                            {selectedProject.github_url && (
                                <a
                                    href={selectedProject.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    GitHub Repository
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
