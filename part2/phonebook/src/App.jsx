import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
      console.log(persons);
    });
  }, []);

  const handleNameChange = (event) => {
    console.log(event);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event);
    setFilterWord(event.target.value);
  };

  const personsToShow = filterWord
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterWord.toLowerCase())
      )
    : persons;

  const addPerson = (event) => {
    console.log(event);
    event.preventDefault();
    const person = persons.find((n) => n.name === newName);

    if (person) {
      if (person.number != newNumber) {
        if (
          window.confirm(
            `${person.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const newPerson = { ...person, number: newNumber };
          personService
            .updateNumber(person.id, newPerson)
            .then((response) => {
              setPersons(
                persons.map((p) => (p.id == person.id ? response.data : p))
              );
              setSuccessMessage(
                `${person.name}'s phone number has been changed successfully!`
              );
              setTimeout(() => {
                setSuccessMessage(null);
              }, 3000);
              setNewName("");
              setNewNumber("");
            })
            .catch((error) => {
              console.error("Error updating person:", error);
              setErrorMessage(
                `Failed to update ${person.name}. It might have been removed from the server.`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
            });
        }
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .addPerson(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setSuccessMessage(`Added ${response.data.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          setErrorMessage(`Failed to add ${newPerson.name}.`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((n) => n.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`${person.name} has been deleted successfully!`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setErrorMessage(
            `Failed to delete ${person.name}. It might have been removed from the server.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      <Filter filterWord={filterWord} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
