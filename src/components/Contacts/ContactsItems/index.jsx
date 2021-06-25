import React, { Component } from 'react';

import Person from './Person';

class ContactsItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      contactArr,
      editContact,
      delContact
    } = this.props;
    return (
      contactArr.map((el, index) => {
        return (
          <Person
            key={index}
            obj={el}
            editContact={() => editContact(index)}
            delContact={() => delContact(index)}
          />
        )
      })
    )
  }
}

export default ContactsItems;
