import React from 'react';
import './App.css';

function ContactsList(props) {
  return (
    <div className="contactsList">
      {props.contacts.map((contact) => (
        <button
          onClick={() => console.log('TEST', contact)}
          className="contactButton"
        >
          <span className="contactName">{contact}</span>
        </button>
      ))}
    </div>
  );
}

export default ContactsList;
