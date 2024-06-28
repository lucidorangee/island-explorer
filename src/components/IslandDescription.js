import React from 'react';

function IslandDescription({ island, onBackClick }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      <h2>{island}</h2>
      <p>This is a description of {island}. Add more details about the island here.</p>
      <button onClick={onBackClick} style={{ marginTop: '20px' }}>
        Back
      </button>
    </div>
  );
}

export default IslandDescription;