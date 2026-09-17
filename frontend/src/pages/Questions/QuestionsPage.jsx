import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import PostCard from '../../components/PostCard/PostCard';

export default function QuestionsPage() {
  const { posts, addPost } = useApp();
  const [questionText, setQuestionText] = useState('');
  const [isAnon, setIsAnon] = useState(false);

  const questionPosts = posts.filter(
    (p) => (p.tag && p.tag.includes('Question')) || p.text.includes('?')
  );

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    addPost({
      text: questionText,
      tag: '❓ Question',
      isAnon,
    });

    setQuestionText('');
  };

  return (
    <div className="view-section">
      <h1 className="section-header">Questions & Answers</h1>

      <div className="card">
        <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#2d3748' }}>
          Ask a Question to the Campus Community
        </h3>
        <form onSubmit={handleAskQuestion}>
          <textarea
            placeholder="What would you like to ask fellow students or faculty? (e.g., lost items, lecture notes, textbook queries)..."
            rows={3}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#64748b' }}>
              <input
                type="checkbox"
                checked={isAnon}
                onChange={(e) => setIsAnon(e.target.checked)}
                style={{ width: 'auto', margin: 0 }}
              />
              Ask Anonymously
            </label>
            <button type="submit" className="btn">
              <span>❓</span> Post Question
            </button>
          </div>
        </form>
      </div>

      <div>
        <h2 style={{ fontSize: '20px', color: '#2d3748', marginBottom: '20px' }}>
          Recent Campus Inquiries ({questionPosts.length})
        </h2>
        {questionPosts.length > 0 ? (
          questionPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>❓</div>
            <div>No questions asked yet. Be the first to start a discussion!</div>
          </div>
        )}
      </div>
    </div>
  );
}
