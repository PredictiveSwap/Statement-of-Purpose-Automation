'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import SOPForm from '@/components/SOPForm';
import SOPResult from '@/components/SOPResult';
import StatusMessage from '@/components/StatusMessage';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    text: '',
    type: 'info',
    visible: false
  });
  const [sopContent, setSopContent] = useState('');
  const [userName, setUserName] = useState('');
  
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preload Ollama status check
    checkOllamaStatus();
  }, []);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const checkOllamaStatus = async () => {
    try {
      setStatusMessage({
        text: 'Checking Ollama connection...',
        type: 'info',
        visible: true
      });

      const response = await axios.get('/api/check-ollama');
      
      if (response.data.success) {
        setStatusMessage({
          text: `Connected to Ollama successfully! Model: ${response.data.model}`,
          type: 'success',
          visible: true
        });
        
        setTimeout(() => {
          setStatusMessage(prev => ({ ...prev, visible: false }));
        }, 3000);
      } else {
        setStatusMessage({
          text: `Error connecting to Ollama: ${response.data.error}`,
          type: 'error',
          visible: true
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage({
        text: 'Error checking Ollama connection. Please ensure the service is running.',
        type: 'error',
        visible: true
      });
    }
  };

  const generateSOP = async (formData: FormData) => {
    setLoading(true);
    setSopContent('');
    setProgress(0);
    setCurrentStep('Initializing SOP generation...');
    
    // Extract user name for downloads
    const name = formData.get('name') as string;
    setUserName(name);

    // Simulate progress with detailed steps
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 3, 95);
        
        // Update current step based on progress
        if (newProgress < 10) {
          setCurrentStep('Connecting to Ollama AI...');
        } else if (newProgress < 20) {
          setCurrentStep('Preparing your personal data...');
        } else if (newProgress < 40) {
          setCurrentStep('Generating SOP introduction...');
        } else if (newProgress < 60) {
          setCurrentStep('Creating educational background section...');
        } else if (newProgress < 75) {
          setCurrentStep('Working on career goals and aspirations...');
        } else if (newProgress < 90) {
          setCurrentStep('Finalizing your statement of purpose...');
        } else {
          setCurrentStep('Preparing document for download...');
        }
        
        return newProgress;
      });
    }, 400);

    try {
      const response = await axios.post('/api/generate', formData);
      
      clearInterval(progressInterval);
      setProgress(100);
      setCurrentStep('SOP successfully generated!');
      
      setTimeout(() => {
        setLoading(false);
        
        if (response.data.success) {
          setSopContent(response.data.sop);
          
          // Scroll to result
          setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        } else {
          setStatusMessage({
            text: `Error generating SOP: ${response.data.error}`,
            type: 'error',
            visible: true
          });
        }
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      clearInterval(progressInterval);
      setLoading(false);
      setCurrentStep('');
      
      setStatusMessage({
        text: 'Error generating SOP. Please try again.',
        type: 'error',
        visible: true
      });
    }
  };

  const downloadSOP = async (format: 'docx' | 'pdf' | 'txt') => {
    if (!sopContent) {
      alert('Please generate an SOP first.');
      return;
    }

    const formData = new FormData();
    formData.append('sop_content', sopContent);
    formData.append('name', userName || 'User');

    try {
      const response = await axios.post(`/api/download-${format}`, formData, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data]);
      saveAs(blob, `SOP_${userName.replace(/\s+/g, '_') || 'User'}.${format}`);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error downloading ${format.toUpperCase()} file. Please try again.`);
    }
  };
  
  const copyToClipboard = () => {
    if (!sopContent) {
      alert('Please generate an SOP first.');
      return;
    }
    
    navigator.clipboard.writeText(sopContent)
      .then(() => {
        setStatusMessage({
          text: 'SOP copied to clipboard!',
          type: 'success',
          visible: true
        });
        
        setTimeout(() => {
          setStatusMessage(prev => ({ ...prev, visible: false }));
        }, 3000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text. Please try again.');
      });
  };

  return (
    <main>
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="/">
            <span>AI</span> Statement of Purpose Generator
          </a>
        </div>
      </nav>

      {!showForm && (
        <section className="hero-section">
          <div className="hero-decoration hero-decoration-1"></div>
          <div className="hero-decoration hero-decoration-2"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center">
                <h1 className="hero-title">Create Your Perfect <span>Statement of Purpose</span></h1>
                <p className="hero-subtitle">
                  Craft a professional, personalized Statement of Purpose in minutes using 
                  advanced AI technology. Our tool helps you create compelling SOPs for 
                  university applications without the stress.
                </p>
                <div className="hero-features">
                  <div className="feature-item">
                    <div className="feature-icon">⚡</div>
                    <div className="feature-text">Generate in minutes</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">📝</div>
                    <div className="feature-text">Personalized content</div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">🎓</div>
                    <div className="feature-text">University-ready</div>
                  </div>
                </div>
                <button 
                  className="btn btn-primary btn-lg hero-button"
                  onClick={scrollToForm}
                >
                  Create Your SOP Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container mt-4" ref={formRef}>
        {showForm && (
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Generate Your Professional Statement of Purpose</h4>
                </div>
                <div className="card-body">
                  <StatusMessage 
                    text={statusMessage.text} 
                    type={statusMessage.type as 'info' | 'success' | 'error'} 
                    visible={statusMessage.visible} 
                  />
                  
                  <SOPForm onSubmit={generateSOP} />
                  
                  {loading && (
                    <div id="loading-spinner" className="generation-progress mt-4" style={{ display: 'block' }}>
                      <div className="generation-status">
                        <div className="generation-icon">
                          <div className="spinner-border spinner" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        <div className="generation-info">
                          <h5>Generating your Statement of Purpose</h5>
                          <p className="current-step">{currentStep}</p>
                        </div>
                      </div>
                      
                      <div className="progress mt-3">
                        <div 
                          className="progress-bar progress-bar-striped progress-bar-animated" 
                          role="progressbar" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-center mt-2 text-muted">
                        This may take 1-2 minutes depending on the complexity
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {sopContent && (
                <div ref={resultRef}>
                  <SOPResult 
                    content={sopContent} 
                    onDownload={downloadSOP}
                    onCopy={copyToClipboard}
                    id="result-card"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div>
              <p className="mb-0">© {new Date().getFullYear()} SOP Generator | Crafted by <span className="creator-name">Swapnil <i className="fa fa-bolt"></i></span></p>
            </div>
            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
