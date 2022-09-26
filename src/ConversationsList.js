import React from 'react';
import './App.css';

function ConversationsList() {
  const ducks = ['Dr. Rubberduck', 'Duckelina Smith', 'Duckman'];

  return (
    <div className="conversationsList">
      {ducks.map((duck) => (
        <button
          onClick={() => console.log('TEST', duck)}
          className="contactButton"
        >
          <span className="contactName">{duck}</span>
        </button>
      ))}
    </div>
  );
}

export default ConversationsList;
