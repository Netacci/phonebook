import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddContact from './components/AddContact';
import Contacts from './components/Contacts';
import Search from './components/Search';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
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
      number: newNumber,
    };
    console.log(addPerson);
    const nameCheck = persons.map((person) => person.name);
    const addNewNumber = {
      name: newName,
      number: newNumber,
    };
    const id = persons
      .map((person) => (person.name === newName ? person.id : null))
      .filter((n) => n != null);
    // eslint-disable-next-line no-unused-expressions
    nameCheck.includes(newName)
      ? window.confirm(
          `${newName} already exist, replace old number with new one?`
        )
        ? personService
            .replaceNum(id, addNewNumber)
            .then((numNew) =>
              setPersons(
                persons.map((person) =>
                  person.name !== newName ? person : numNew
                )
              )
            )
        : null
      : personService.create(addPerson).then(() => {
          setPersons(persons.concat(addPerson));
          setName('');
          setNumber('');
        });
  };
  const handleContactDelete = (id, item) => {
    // eslint-disable-next-line no-unused-expressions
    window.confirm(`Delete ${item} from phonebook ?`)
      ? personService.deleteObj(id).then(() => {
          setPersons(
            persons.filter((l) => {
              return l.id !== id;
            })
          );
        })
      : null;
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredPersons);

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
          handleDelete={() => handleContactDelete(person.id, person.name)}
        />
      ))}
    </>
  );
};

export default App;
