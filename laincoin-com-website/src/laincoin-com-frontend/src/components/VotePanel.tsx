// VotePanel.tsx
import React, { useState } from 'react';
import './VotePanel.css';

interface VotePanelProps {
  proposalId?: number;
}

const VotePanel: React.FC<VotePanelProps> = ({ proposalId = 1 }) => {
  const [vote, setVote] = useState<'for' | 'against' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submitVote = () => {
    if (vote) {
      // Replace with DAO contract call
      alert(`Voted ${vote} on proposal #${proposalId}`);
      setSubmitted(true);
    }
  };

  return (
    <section className="vote-panel">
      <h3 className="section-title">🗳️ Cast Your Vote</h3>
      <p className="proposal-id">Proposal #{proposalId}</p>
      <div className="vote-options">
        <button className={`vote-btn ${vote === 'for' ? 'selected' : ''}`} onClick={() => setVote('for')}>✅ Vote For</button>
        <button className={`vote-btn ${vote === 'against' ? 'selected' : ''}`} onClick={() => setVote('against')}>❌ Vote Against</button>
      </div>
      <button className="submit-btn" onClick={submitVote} disabled={!vote || submitted}>
        {submitted ? '✔ Vote Submitted' : 'Submit Vote'}
      </button>
    </section>
  );
};

export default VotePanel;
