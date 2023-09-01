import { useState, useEffect } from "react";
import axios from "axios";
import fetchService from "./fetchService.js";
import GoodBar from "./GoodBar.jsx";
import BadBar from "./BadBar.jsx";
import Title from "./Title.jsx";
import Header from "./Header.jsx";
import CreateContact from "./CreateContact.jsx";
import Filter from "./Filter.jsx";
import ContactList from "./ContactList.jsx";
import Footer from "./Footer.jsx";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [goodMess, setGoodMess] = useState(null);
  const [errorMess, setErrorMess] = useState(null);

  useEffect(() => {
    fetchService
      .getData()
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        setErrorMess("Something fucked up!");
        setTimeout(() => {
          setErrorMess(null);
        }, 3000);
      });
  }, []);

  function handleSearchChange(e) {
    setSearchName(e.target.value);
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const repeatContact = contacts.find((contact) => contact.name === newName);
    if (repeatContact !== undefined) {
      window.confirm(
        `${newName} is already in your contact list.\rDo you want to update ${newName}'s phone number?`
      );
      const updatedContact = { ...repeatContact, number: newNumber };
      fetchService
        .update(updatedContact.id, updatedContact)
        .then((response) => {
          setContacts(
            contacts.map((contact) =>
              contact.id !== updatedContact.id ? contact : response.data
            )
          );
          setGoodMess(
            `${updatedContact.name}'s number updated to ${updatedContact.number}`
          );
          setTimeout(() => {
            setGoodMess(null);
          }, 3000);
        })
        .catch((error) => {
          setErrorMess(
            `${updatedContact.name} was already deleted from the server`
          );
          setTimeout(() => {
            setErrorMess(null);
          }, 3000);
        });
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };
      fetchService
        .create(newContact)
        .then((response) => {
          setGoodMess(`${newContact.name} added to contacts`);
          setTimeout(() => {
            setGoodMess(null);
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMess("Oh shit! Something got fucked up!");
          setTimeout(() => {
            setErrorMess(null);
          }, 3000);
        });
    }
  }

  function handleDeleteClick(id) {
    const targetContact = contacts.find((c) => c.id === id);
    window.confirm(`Delete ${targetContact.name} from contact list?`);
    fetchService
      .destroy(targetContact.id)
      .then((response) => {
        setGoodMess(`${targetContact.name} deleted`);
        setTimeout(() => {
          setGoodMess(null);
        }, 3000);
      })
      .catch((error) => {
        setErrorMess(
          `${targetContact.name} was already deleted from the server`
        );
        setTimeout(() => {
          setErrorMess(null);
        }, 3000);
      });
  }

  return (
    <>
      <Title title="Evan's Awesome Phonebook" />
      <GoodBar message={goodMess} />
      <BadBar message={errorMess} />
      <Header header="Create a New Contact" />
      <CreateContact
        onContactSubmit={handleContactSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Header header="Contact List" />
      <Filter onSearchChange={handleSearchChange} searchName={searchName} />
      <ContactList
        contacts={contacts}
        searchName={searchName}
        onDeleteClick={handleDeleteClick}
      />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}
