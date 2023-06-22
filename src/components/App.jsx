import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      this.setState({ contacts: storedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      const contactsToBeStored = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', contactsToBeStored);
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, number } = this.state;
    const id = nanoid();
    const isExist = this.state.contacts.find(value => value.name === name);
    isExist
      ? alert(`${name} already exists in contacts.`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { name, number, id }],
        }));
    form.reset();
  };

  handleFiltering = (arr, query) => {
    let filtered = arr.filter(el =>
      el.name.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  };

  handleDelete = e => {
    const nameToDelete = e.target.id;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(name => name.id !== nameToDelete),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <h2>Contacts</h2>
        <Filter onChange={this.handleChange} />
        <ContactList
          contacts={this.handleFiltering(
            this.state.contacts,
            this.state.filter
          )}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}
