import React from 'react';
import './App.css';

function ContactWindow(props) {
  return (
    <div className="headerWrapper">
      <span className="contactName">{props.contactName}</span>
    </div>
  );
}

export default ContactWindow;
