'use client';

import { FormEvent } from 'react';

interface SOPFormProps {
  onSubmit: (formData: FormData) => void;
}

const SOPForm: React.FC<SOPFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    onSubmit(formData);
  };

  return (
    <form id="sop-form" onSubmit={handleSubmit}>
      {/* Personal Information Section */}
      <div className="form-section">
        <h5 className="form-section-title">Personal Information</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-user"></i>
              </span>
              <input type="text" className="form-control" id="name" name="name" placeholder="Enter your full name" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="country_of_origin" className="form-label">Country of Origin</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-globe"></i>
              </span>
              <input type="text" className="form-control" id="country_of_origin" name="country_of_origin" placeholder="Your country of origin" required />
            </div>
          </div>
        </div>
      </div>
      
      {/* Academic Background Section */}
      <div className="form-section">
        <h5 className="form-section-title">Academic Background</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="degree" className="form-label">Current/Most Recent Degree</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-graduation-cap"></i>
              </span>
              <input type="text" className="form-control" id="degree" name="degree" placeholder="e.g., Bachelor of Science" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="institution" className="form-label">Institution Name</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-university"></i>
              </span>
              <input type="text" className="form-control" id="institution" name="institution" placeholder="Your university/college name" required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="graduation_year" className="form-label">Graduation Year</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-calendar"></i>
              </span>
              <input type="text" className="form-control" id="graduation_year" name="graduation_year" placeholder="Year of graduation" required />
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="major" className="form-label">Major/Field of Study</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-book"></i>
              </span>
              <input type="text" className="form-control" id="major" name="major" placeholder="Your field of study" required />
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="gpa" className="form-label">GPA/Academic Performance</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-star"></i>
              </span>
              <input type="text" className="form-control" id="gpa" name="gpa" placeholder="e.g., 3.8/4.0" required />
            </div>
          </div>
        </div>
      </div>
      
      {/* Language Proficiency Section */}
      <div className="form-section">
        <h5 className="form-section-title">Language Proficiency</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="language_test" className="form-label">Language Test (IELTS/TOEFL/PTE)</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-language"></i>
              </span>
              <select className="form-select" id="language_test" name="language_test" required>
                <option value="">Choose Test</option>
                <option value="IELTS">IELTS</option>
                <option value="TOEFL">TOEFL</option>
                <option value="PTE">PTE</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="language_score" className="form-label">Overall Score</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-check-circle"></i>
              </span>
              <input type="text" className="form-control" id="language_score" name="language_score" placeholder="Your test score" required />
            </div>
          </div>
        </div>
      </div>
      
      {/* Financial Background Section */}
      <div className="form-section">
        <h5 className="form-section-title">Financial Background</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="funding_source" className="form-label">Primary Source of Funding</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-money"></i>
              </span>
              <select className="form-select" id="funding_source" name="funding_source" required>
                <option value="">Choose Source</option>
                <option value="Self">Self-Funded</option>
                <option value="Family">Family Support</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Loan">Education Loan</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="proof_of_funds" className="form-label">Proof of Funds Available</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-file-text"></i>
              </span>
              <select className="form-select" id="proof_of_funds" name="proof_of_funds" required>
                <option value="">Choose Option</option>
                <option value="Bank Statement">Bank Statement</option>
                <option value="Sponsor Letter">Sponsor Letter</option>
                <option value="Scholarship Letter">Scholarship Letter</option>
                <option value="Loan Approval">Loan Approval</option>
                <option value="Multiple">Multiple Sources</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Program and Country Details */}
      <div className="form-section">
        <h5 className="form-section-title">Program and Country Details</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="target_country" className="form-label">Target Country for Studies</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-map-marker"></i>
              </span>
              <input type="text" className="form-control" id="target_country" name="target_country" placeholder="Country where you want to study" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="target_university" className="form-label">Target University</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-building"></i>
              </span>
              <input type="text" className="form-control" id="target_university" name="target_university" placeholder="University you're applying to" required />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="program" className="form-label">Program Applying For</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-book"></i>
              </span>
              <input type="text" className="form-control" id="program" name="program" placeholder="e.g., Master of Computer Science" required />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="program_start" className="form-label">Expected Start Date</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-calendar-o"></i>
              </span>
              <input type="text" className="form-control" id="program_start" name="program_start" placeholder="e.g., Fall 2023" required />
            </div>
          </div>
        </div>
      </div>
      
      {/* Career and Family Information */}
      <div className="form-section">
        <h5 className="form-section-title">Career and Family Information</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="career_goals" className="form-label">Short-term Career Goals</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-briefcase"></i>
              </span>
              <textarea className="form-control" id="career_goals" name="career_goals" rows={3} placeholder="Describe your career aspirations" required></textarea>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="family_ties" className="form-label">Family Ties in Home Country</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-home"></i>
              </span>
              <textarea className="form-control" id="family_ties" name="family_ties" rows={3} placeholder="Describe your ties to your home country" required></textarea>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary btn-lg form-submit-btn">
          <i className="fa fa-magic me-2"></i>
          Generate SOP
        </button>
      </div>
    </form>
  );
};

export default SOPForm; 