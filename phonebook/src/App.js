import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Notification from "./Components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    noteService.getAll().then((response) => setPersons(response));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      noteService.deletePerson(id).then((response) => {
        setPersons(persons.filter((p) => p.id !== id));
        setNotification(`${person.name} deleted`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const person = persons.find((p) => p.name === newName);
    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedNumber = { ...person, number: newNumber };
        noteService
          .update(person.id, changedNumber)
          .then((response) => {
            setNotification(`${newName} has changed`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : changedNumber))
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotification(
              `Information of ${person.name} has already been removed from server.`
            );
            setPersons(persons.filter((p) => p.id !== person.id));
            setError(true);
            setTimeout(() => {
              setError(false);
              setNotification(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: Date.now().toString(),
      };
      noteService
        .create(newPerson)
        .then((response) => {
          setNotification(`${newName} added`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          console.log("something worng@");
        });
    }
  };
  const personsToShow =
    search.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
      : persons;
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} hasError={error} />
      <Filter search={search} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
