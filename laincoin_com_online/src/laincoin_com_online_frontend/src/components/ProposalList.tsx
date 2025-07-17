// ProposalList.tsx
import React, { useEffect, useState } from 'react';
import './ProposalList.css';

interface Proposal {
  id: number;
  description: string;
  votesFor: number;
  votesAgainst: number;
  executed: boolean;
}

const dummyProposals: Proposal[] = [
  { id: 1, description: "Fund Gnosis public goods", votesFor: 120, votesAgainst: 45, executed: false },
  { id: 2, description: "Upgrade DAO governance rules", votesFor: 87, votesAgainst: 13, executed: true }
];

const ProposalList: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    // Replace with on-chain fetch
    setProposals(dummyProposals);
  }, []);

  return (
    <section className="proposal-list">
      <h3 className="section-title">📜 Active DAO Proposals</h3>
      {proposals.map((p) => (
        <div key={p.id} className="proposal-card">
          <h4>Proposal #{p.id}</h4>
          <p className="description">{p.description}</p>
          <div className="vote-stats">
            <span className="vote-for">✅ For: {p.votesFor}</span>
            <span className="vote-against">❌ Against: {p.votesAgainst}</span>
          </div>
          <p className="status">{p.executed ? '✅ Executed' : '⏳ Pending Execution'}</p>
        </div>
      ))}
    </section>
  );
};

export default ProposalList;