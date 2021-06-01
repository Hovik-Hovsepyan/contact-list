import React from "react"
import Person from "../Person/Person";


class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      phone: "",
      photo: "",
      status: "",
      clicked: false,
      contactArr: [],
    }
    this.change = this.change.bind(this);
    this.click = this.click.bind(this);
    this.delContact = this.delContact.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  change(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  click() {
    this.setState({
      contactArr: [
        ...this.state.contactArr,
        {
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          phone: this.state.phone,
          photo: this.state.photo,
          status: this.state.status,
          clicked: this.state.clicked,
        }
      ]
    })
  }

  delContact(index) {
    this.setState({
      contactArr: this.state.contactArr.filter(person => {
        return this.state.contactArr.indexOf(person, index) !== index;
      })
    })
  }

  editContact(index) {
    let arr = this.state.contactArr;
    arr[index].clicked = true;
    this.setState({
      contactArr: arr
    })
  }




  render() {
    return (
      <div className="addContacts">
        <input onChange={this.change} type="text" placeholder="Name" name="name" value={this.state.name} />
        <input onChange={this.change} type="text" placeholder="Surname" name="surname" value={this.state.surname} />
        <input onChange={this.change} type="email" placeholder="Email" name="email" value={this.state.email} />
        <input onChange={this.change} type="text" placeholder="Phone" name="phone" value={this.state.phone} />
        <input onChange={this.change} type="text" placeholder="Photo(URL)" name="photo" value={this.state.photo} />
        <input onChange={this.change} type="text" placeholder="Status" name="status" value={this.state.status} />
        <button onClick={this.click}>Add new contact</button>

        <Person 
          arr={this.state.contactArr} 
          delContact={this.delContact} 
          editContact={this.editContact} 
        />

      </div>
    )
  }
}

export default Inputs;