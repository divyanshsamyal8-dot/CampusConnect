import React, { useState } from 'react';
import '../../styles/support.css';

export default function ReportProblemPage() {
  const [issueText, setIssueText] = useState('');
  const [issueType, setIssueType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!issueText.trim() || !issueType) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      alert(
        'Report submitted successfully!\nA support staff member will contact you privately within 24 hours.'
      );
      setIssueText('');
      setIssueType('');
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="view-section">
      <h1
        className="section-header"
        style={{ background: 'var(--gradient-3)', WebkitBackgroundClip: 'text' }}
      >
        Support Desk
      </h1>

      <div className="card support-card">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '20px',
          }}
        >
          <div className="support-header-icon">🛡️</div>
          <div>
            <div className="support-title">Private Support Channel</div>
            <div className="support-subtitle">
              Confidential support for bullying, emotional issues, or facility problems
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={issueText}
            onChange={(e) => setIssueText(e.target.value)}
            placeholder="Describe your issue privately... Your message will only be seen by authorized staff."
            rows={6}
          />

          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '20px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              style={{ margin: 0, width: '220px' }}
            >
              <option value="">Select issue type...</option>
              <option value="bullying">Bullying/Harassment</option>
              <option value="emotional">Emotional Support</option>
              <option value="facility">Facility Issue</option>
              <option value="academic">Academic Concern</option>
              <option value="other">Other</option>
            </select>

            <button
              type="submit"
              className="btn btn-danger"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span><span>⏳</span> Sending...</span>
              ) : (
                <span><span>🛡️</span> Submit Report</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
