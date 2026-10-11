import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { validateRollNumber } from '../../utils/helpers';
import { CheckIcon, XIcon } from '../Icons/Icons';

export default function CreatePostModal({ isOpen, onClose }) {
  const { currentUser, addPost } = useApp();
  const [name, setName] = useState(currentUser.name || 'Student');
  const [roll, setRoll] = useState(currentUser.rollNumber || '');
  const [tag, setTag] = useState('');
  const [text, setText] = useState('');
  const [isRollValid, setIsRollValid] = useState(validateRollNumber(currentUser.rollNumber));

  if (!isOpen) return null;

  const handleRollChange = (val) => {
    const upper = val.toUpperCase();
    setRoll(upper);
    setIsRollValid(validateRollNumber(upper));
  };

  const handleSubmit = (isAnon) => {
    if (!text.trim()) {
      alert('Please enter some text for your post!');
      return;
    }
    if (!isAnon && roll && !isRollValid) {
      alert('Please enter a valid roll number (Format: NNNNANANNN)');
      return;
    }

    addPost({
      text,
      tag,
      isAnon,
      customName: name,
      customRoll: roll,
    });

    setText('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(24, 24, 27, 0.4)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '580px',
          margin: 0,
          borderRadius: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#18181B' }}>Create a New Post</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#71717A',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <XIcon size={20} />
          </button>
        </div>

        <div className="create-inputs-grid">
          <div className="input-group">
            <label className="input-label">Student</label>
            <input
              type="text"
              className="clean-outlined-input"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Your Roll Number</label>
            <div className="input-with-validation">
              <input
                type="text"
                className={`clean-outlined-input ${roll ? (isRollValid ? 'is-valid' : 'is-invalid') : ''}`}
                placeholder="NNNNANANNN"
                maxLength={10}
                value={roll}
                onChange={(e) => handleRollChange(e.target.value)}
              />
              {roll && isRollValid && (
                <span className="valid-check-icon">
                  <CheckIcon size={14} color="#10B981" />
                </span>
              )}
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Category</label>
            <select
              className="clean-outlined-select"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="">Select a category...</option>
              <option value="📚 Study">📚 Study</option>
              <option value="🎉 Social">🎉 Social</option>
              <option value="⚡ Campus News">⚡ Campus News</option>
              <option value="❓ Question">❓ Question</option>
              <option value="💡 Idea">💡 Idea</option>
              <option value="🏀 Sports">🏀 Sports</option>
              <option value="🎨 Creative">🎨 Creative</option>
              <option value="🔬 Science">🔬 Science</option>
              <option value="💼 Career">💼 Career</option>
              <option value="🎵 Music">🎵 Music</option>
              <option value="🍔 Food">🍔 Food</option>
              <option value="🚗 Transport">🚗 Transport</option>
              <option value="💻 Tech">💻 Tech</option>
              <option value="📅 Events">📅 Events</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: '11.5px', color: '#71717A', margin: '4px 0 12px 0' }}>
          Format: NNNNANANNN (Example: 2025A7R025)
        </div>

        <textarea
          className="create-textarea"
          placeholder="Share a post or a question..."
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', justifyContent: 'flex-end' }}>
          <button className="btn btn-pill-grey" onClick={() => handleSubmit(true)}>
            Post Anonymously
          </button>
          <button className="btn btn-pill-blue" onClick={() => handleSubmit(false)}>
            Post Publicly
          </button>
        </div>
      </div>
    </div>
  );
}
