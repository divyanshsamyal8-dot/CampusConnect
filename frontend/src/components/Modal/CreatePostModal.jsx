import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { validateRollNumber } from '../../utils/helpers';

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
        background: 'rgba(0, 0, 0, 0.5)',
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
          maxWidth: '600px',
          margin: 0,
          animation: 'bounceIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '22px', color: '#2d3748' }}>Create a New Post</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            ×
          </button>
        </div>

        <div className="post-creation-row">
          <div>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={`roll-input-container ${roll ? (isRollValid ? 'valid' : 'invalid') : ''}`}>
            <input
              type="text"
              placeholder="Your Roll Number (NNNNAANNNN)"
              maxLength={10}
              value={roll}
              onChange={(e) => handleRollChange(e.target.value)}
            />
          </div>
          <div>
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="">Select a tag...</option>
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

        <div className="roll-format-hint">
          Format: NNNNANANNN (Example: 2025A7R025) - N=Number, A=Alphabet
        </div>

        <textarea
          placeholder="Share a post or a question with the campus community..."
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={() => handleSubmit(true)}>
            <span>👤</span> Post Anonymously
          </button>
          <button className="btn" onClick={() => handleSubmit(false)}>
            <span>📤</span> Post Publicly
          </button>
        </div>
      </div>
    </div>
  );
}
