import { useState, useEffect } from 'react';
import axios from 'axios';
import './CertificateList.css';

export default function CertificateList() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio/certificates/`)

            .then(res => {
                setCertificates(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching certificates", err);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    if (loading) return <div className="loader">Loading certificates...</div>;

    if (certificates.length === 0) return null;

    return (
        <section className="section certificates-section reveal" id="certificates">
            <h2 className="section-title">Certifications</h2>
            <div className="certificates-grid">
                {certificates.map(cert => (
                    <div key={cert.id} className="certificate-card">
                        <div className="certificate-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15l-3 3m0 0l-3-3m3 3V9"></path><path d="M12 15l3 3m0 0l3-3m-3 3V9"></path><path d="M5 21h14"></path><path d="M12 3v6"></path></svg>
                        </div>
                        <div className="certificate-content">
                            <h3 className="certificate-title">{cert.title}</h3>
                            <p className="certificate-org">{cert.issuing_organization}</p>
                            <div className="certificate-meta">
                                <span className="certificate-date">{formatDate(cert.issue_date)}</span>
                                {cert.credential_id && (
                                    <span className="certificate-id">ID: {cert.credential_id}</span>
                                )}
                            </div>
                            {cert.certificate_url && (
                                <a
                                    href={cert.certificate_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="certificate-link"
                                >
                                    Verify Credential
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
