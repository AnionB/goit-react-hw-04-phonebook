import React, { useState, useEffect, useRef } from 'react';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import './styles.css';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const firstUpdate = useRef(true);

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (!firstUpdate.current && contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    firstUpdate.current = false;
  }, [contacts]);

  const addContact = contact => {
    if (
      contacts.find(
        cont => cont.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(contact.name + ' is already in contact');
      return;
    }
    setContacts([...contacts, contact]);
  };

  const useFilter = f => {
    setFilter(f.target.value);
  };

  const filteredContactList = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className="thumb">
      <h1>Phonebook</h1>
      <ContactForm contact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={useFilter} />
      <ContactList
        contacts={filteredContactList()}
        idToDelete={deleteContact}
      />
    </div>
  );
}
