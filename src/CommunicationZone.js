import React from 'react';
import './App.css';
import ChatZone from './ChatZone';
import ContactWindow from './ContactWindow';
import InputZone from './InputZone';
import ContactsList from './ContactsList';

const CommunicationZone = () => {
  const [state, setState] = React.useState({
    selectedContact: 'Dr. Rubberduck',
    value: '',
    disposable: '',
    history: {
      'Dr. Rubberduck': ['How can I help?'],
      'Duckelina Smith': [],
      Duckman: [],
    },
  });
  const stateRef = React.useRef(state);

  function handleSelect(contact) {
    setState({
      ...state,
      selectedContact: contact,
    });
    stateRef.current.selectedContact = contact;

    if (
      stateRef.current.history[stateRef.current.selectedContact].length === 0
    ) {
      let newState = {
        ...stateRef.current,
      };
      newState.history[stateRef.current.selectedContact] = ['How can I help?'];
      setState(newState);
      stateRef.current = newState;
    }
  }

  function handleChange(event) {
    setState({
      ...state,
      value: event.target.value,
    });
  }

  function handleSubmit(event) {
    if (event.key === 'Enter') {
      let newState = {
        ...state,
        value: '',
        disposable: event.target.value,
      };
      newState.history[stateRef.current.selectedContact] = [
        ...state.history[stateRef.current.selectedContact],
        event.target.value,
      ];
      setState(newState);
      stateRef.current = newState;

      setTimeout(dialogueEngine, 3000);
    }
    cleanHistory();
  }

  function dialogueEngine() {
    const answersBasic = [
      'can you elaborate?',
      'and why do you believe that is so?',
      'can you be more specific?',
      'what would be your guess?',
      'I need more details for this one',
    ];
    const answersAdvanced = [
      'have you check the logs?',
      'have you tried restarting?',
      'what does the documentation say?',
      'Maybe its a typo',
    ];
    const answersAdjust = [
      'you need to be a bit more specific',
      'come on I am trying to help',
      'whatever',
      'that does not sound like a bug',
    ];

    let newState = {
      ...stateRef.current,
    };

    if (stateRef.current.disposable.length <= 7) {
      let response =
        answersAdjust[Math.floor(Math.random() * answersAdjust.length)];
      newState.history[stateRef.current.selectedContact] = [
        ...state.history[stateRef.current.selectedContact],
        response,
      ];
    } else if (
      stateRef.current.history[stateRef.current.selectedContact].length <= 3 &&
      stateRef.current.disposable.length > 6
    ) {
      let response =
        answersBasic[Math.floor(Math.random() * answersBasic.length)];
      newState.history[stateRef.current.selectedContact] = [
        ...state.history[stateRef.current.selectedContact],
        response,
      ];
    } else if (
      stateRef.current.history[stateRef.current.selectedContact].length >= 4
    ) {
      let response =
        answersAdvanced[Math.floor(Math.random() * answersAdvanced.length)];
      newState.history[stateRef.current.selectedContact] = [
        ...state.history[stateRef.current.selectedContact],
        response,
      ];
    }
    setState(newState);
  }

  function cleanHistory() {
    const tempHistory = state.history;
    let newHistory = [];
    if (state.history.length > 12) {
      tempHistory.shift();
      tempHistory.shift();
      newHistory = tempHistory;
      setState({
        ...state,
        history: newHistory,
      });
    }
  }

  return (
    <div className="chatHost innerShadow">
      <ContactsList
        contacts={Object.keys(state.history)}
        handleSelect={handleSelect}
      />
      <ContactWindow contactName={stateRef.current.selectedContact} />
      <ChatZone
        contactName={stateRef.current.selectedContact}
        chatItem={state.history[stateRef.current.selectedContact]}
      />
      <InputZone
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={state.value}
      />
    </div>
  );
};

export default CommunicationZone;
