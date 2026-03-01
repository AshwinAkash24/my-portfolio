import React from 'react';

export default function ProjectCard({ project, onOpenModal }) {
    // Check if the individual fields exist
    const showDetails = project.problem_statement || project.task_details || project.my_solution;

    return (
        <div className="project-card">
            {project.image_url && (
                <div
                    className="project-image"
                    style={{ backgroundImage: `url(${project.image_url})` }}
                ></div>
            )}
            <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-actions mt-auto">
                    {showDetails && (
                        <button onClick={onOpenModal} className="btn-secondary">
                            View Details
                        </button>
                    )}
                    {project.project_url && !showDetails && (
                        <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            View Project
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
