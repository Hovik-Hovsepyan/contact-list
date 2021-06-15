import React, { Component } from 'react';
import { 
  FaUserEdit,
  GiCancel,
  GrStatusGoodSmall,
} from 'react-icons/all';
import './Person.css'

class Person extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      photo,
      name,
      surname,
      email,
      phone,
      status,
    } = this.props.obj;

    const {
      editContact,
      delContact
    } = this.props

    return (
      <div className="person">
        <div className="pers">
          <div className="image">
            <img src={photo} className="img" alt={photo} />
            {status ? <div className="online"> <GrStatusGoodSmall />  </div> 
                    : <div className="offline"> <GrStatusGoodSmall /> </div>}
          </div>
          <div className="info">
            <div className="fullName">
              <p>{name}</p>
              <p>{surname}</p>
            </div>
            <div className="contact">
              <a href={`https://${email}`} className="links">{email}</a>
              <a href={`tel:${phone}`} className="links">(+374) {phone}</a>
            </div>
          </div>
          <div className="icons">
            <div className="deleteIcon">
              <GiCancel onClick={delContact} />
            </div>
            <div className="editIcon">
              <FaUserEdit onClick={editContact} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Person;
