import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import AddContact from './components/AddContact';
import Contacts from './components/Contacts';
import Search from './components/Search';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addPerson = {
      name: newName,
      number: Number(newNumber),
      id: persons.length + 1,
    };
    const nameCheck = persons.map((person) => person.name);
    const numCheck = persons.map((person) => person.number);
    nameCheck.includes(newName) || numCheck.includes(newNumber)
      ? alert(`Contact already exists, Change it`)
      : axios
          .post('http://localhost:3001/persons', addPerson)
          .then((response) => {
            setPersons(persons.concat(addPerson));
            setName('');
            setNumber('');
          });
  };
  const handleContactDelete = (id) => {
    // console.log('delete');
    axios.delete(`http://localhost:3001/persons/${id}`).then((response) => {
      setPersons(
        persons.filter((l) => {
          return l.id !== id;
        })
      );
    });
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>PHONEBOOK</h2>
      <Search type='search' value={search} onChange={handleChange} />
      <Header text='Add New Contact' />

      <AddContact
        onSubmit={handleSubmit}
        onChangeName={handleNameChange}
        onChangeNum={handleNumberChange}
        valueName={newName}
        valueNum={newNumber}
        type='text'
      />
      <Header text='Contact List' />

      {filteredPersons.map((person) => (
        <Contacts
          key={person.id}
          name={person.name}
          number={person.number}
          handleDelete={() => handleContactDelete(person.id)}
        />
      ))}
    </>
  );
};

export default App;
