import { useState } from "react";
import Contact from "./Contact.jsx";

export default function ContactList({ contacts, searchName, onDeleteClick }) {
  const allContacts = contacts.map((contact) => (
    <Contact key={contact.id} contact={contact} onDeleteClick={onDeleteClick} />
  ));

  const filterList = contacts.filter((contact) =>
    contact.name.toLowerCase().startsWith(searchName.toLowerCase())
  );

  const filteredList = filterList.map((contact) => (
    <Contact key={contact.id} contact={contact} onDeleteClick={onDeleteClick} />
  ));

  if (searchName.length === 0) {
    return allContacts;
  } else if (searchName.length > 0 && filterList.length === 0) {
    return "No match found";
  } else {
    return filteredList;
  }
}
