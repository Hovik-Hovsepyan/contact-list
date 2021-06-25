import React, { Component } from 'react';

import Modal from './Modal';
import ContactsItems from './ContactsItems';

import { BsFillPersonPlusFill } from 'react-icons/bs';

import './Contacts.css';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editable: false,
      changeable: null,
      contactArr: [],
    };

    this.addContact = this.addContact.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.create = this.create.bind(this);
    this.delContact = this.delContact.bind(this);
    this.editContact = this.editContact.bind(this);
    this.saveContact = this.saveContact.bind(this);
  }

  addContact() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({
      show: false,
      editable: false,
    });
  }

  create(obj) {
    this.setState({
      show: false,
      contactArr: [
        ...this.state.contactArr,
        obj,
      ],
    });
  }

  delContact(index) {
    const contactArr = this.state.contactArr;
    this.setState({ contactArr: contactArr.filter(person => contactArr.indexOf(person, index) !== index) });
  }

  editContact(index) {
    this.setState({
      editable: true,
      show: true,
      changeable: index,
    });
  }

  saveContact(obj) {
    let changeableArr = this.state.contactArr;
    let index = this.state.changeable;
    changeableArr[index] = obj;
    this.setState({
      editable: false,
      show: false,
      contactArr: changeableArr,
    });
  }

  render() {
    const {
      show,
      editable,
      contactArr,
      changeable,
    } = this.state;

    return (
      <div className="contacts">
        <div className="addContact">
          <BsFillPersonPlusFill onClick={this.addContact} />
          <ContactsItems
            contactArr={contactArr}
            editContact={this.editContact}
            delContact={this.delContact}
          />
        </div>
        {show && (
          <Modal
            closeModal={this.closeModal}
            change={this.change}
            create={this.create}
            saveContact={this.saveContact}
            show={show}
            editable={editable}
            objValues={contactArr[changeable]}
          />
        )
        }
      </div>
    )
  }
}

export default Contacts;
