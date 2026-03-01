import { useState, useEffect } from 'react'
import axios from 'axios'
import './Global.css'
import './components/Hero.css'
import './components/AdminDashboard.css'
import ProjectList from './components/ProjectList'
import SkillList from './components/SkillList'
import ExperienceList from './components/ExperienceList'
import CertificateList from './components/CertificateList'
import EducationList from './components/EducationList'

import AdminDashboard from './components/AdminDashboard'

function App() {
  const [backendStatus, setBackendStatus] = useState('Connecting...');
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [view, setView] = useState('public'); // 'public' or 'dashboard'

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio/projects/`);

        if (response.status === 200) setBackendStatus('Online');
      } catch (error) {
        setBackendStatus('Offline');
      }
    };
    checkBackend();
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdminAuthenticated(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setView('dashboard'); // Auto-switch to dashboard on login
    } else {
      alert('Invalid Password');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setView('public');
  };

  if (view === 'dashboard' && isAdminAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="portfolio-app">
      <div className="top-contact-bar">
        <div className="contact-container">
          <div className="contact-group left">
            <a href="mailto:ashwinakash242005@gmail.com" className="contact-link">
              <div className="contact-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8 5-8-5"></path></svg>
              </div>
              <span className="contact-text">ashwinakash242005@gmail.com</span>
            </a>
            <div className="contact-divider"></div>
            <a href="tel:+917397067884" className="contact-link">
              <div className="contact-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <span className="contact-text">+91 73970 67884</span>
            </a>
          </div>
          <div className="contact-group right">
            <a href="https://www.linkedin.com/in/ashwin-akash/" target="_blank" rel="noopener noreferrer" className="social-icon-link linkedin" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/AshwinAkash24" target="_blank" rel="noopener noreferrer" className="social-icon-link github" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              <span>GitHub</span>
            </a>

            {!isAdminAuthenticated ? (
              <button
                className="admin-entry-trigger"
                onClick={() => setShowAdminLogin(true)}
                title="Admin Access"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </button>
            ) : (
              <button onClick={() => setView('dashboard')} className="admin-dashboard-link">
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>

      {showAdminLogin && (
        <div className="admin-login-overlay">
          <div className="admin-login-modal">
            <h3>Admin Access</h3>
            <form onSubmit={handleAdminLogin}>
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                autoFocus
              />
              <div className="admin-modal-actions">
                <button type="button" onClick={() => setShowAdminLogin(false)} className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-login">Login</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Ashwin Akash M</h1>
          <p className="hero-role">Aspiring Data Analyst</p>
          <p className="hero-subtitle">
            Aspiring Data Analyst with hands-on experience in SQL, Power BI, Python, and ETL processes. Skilled in
            data cleaning, transformation, exploratory data analysis (EDA), and dashboard development. Experienced
            in building machine learning-based web applications using Django. Passionate about transforming raw data
            into actionable insights to support data-driven decision-making.
          </p>
          <div className="hero-actions">
            <a href="#education" className="btn-secondary">Education</a>
            <a href="#skills" className="btn-primary">Skills</a>
            <a href="#projects" className="btn-secondary">Projects</a>
            <a href="#experience" className="btn-secondary">Experience</a>
            <a href="#certificates" className="btn-secondary">Certificates</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <EducationList />
        <SkillList />
        <ProjectList />
        <ExperienceList />
        <CertificateList />
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Ashwin Akash M. Built with React & Django.</p>
      </footer>
    </div>
  )
}

export default App
