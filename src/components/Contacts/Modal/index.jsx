import React, { Component } from 'react';
import './Modal.css';
import {
  BsCheckAll,
  FcCancel,
} from 'react-icons/all';
import { modalInp } from './modalInp';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      phone: "",
      photo: "",
      selectedRadio: "offline",
      err: "",
      empty: "",
      loaded: false,
      status: false,
    }
    
    this.change = this.change.bind(this);
    this.validationPhone = this.validationPhone.bind(this);
    this.validationEmail = this.validationEmail.bind(this);
    this.validationPhoto = this.validationPhoto.bind(this);
    this.validationName = this.validationName.bind(this);
  }

  validationPhone(num) {
    const regexp = /^[0-9]{8}$/;
    return regexp.test(num);
  }

  validationEmail(email) {
    const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regexp.test(email);
  }

  validationName(name) {
    const regexp = /^[a-z ,.'-]+$/i;
    return regexp.test(name);
  }

  validationPhoto(url) {

    return new Promise((resolve, reject) => {

      const image = new Image();
      image.src = url;

      if (image.complete) {
        resolve('');
      } else {
        image.onload = function () {
          resolve('');
        }
        image.onerror = function () {
          reject('photo')
        }
      }
    })
  }

  validation() {
    const {
      name,
      surname,
      email,
      phone,
      photo,
    } = this.state;

    const validationPhone = this.validationPhone(phone);
    const validationEmail = this.validationEmail(email);
    const validationName = this.validationName(name);
    const validationSurName = this.validationName(surname);

    const validateObj = {
      name: validationName,
      surname: validationSurName,
      email: validationEmail,
      phone: validationPhone,
    };

    const validateParams = {
      name,
      surname,
      email,
      phone,
      photo,
    };

    for (let key in validateParams) {
      if (!validateParams[key]) {
        this.setState({ empty: key });
        return;
      } else {
        this.setState({ empty: '' })
      }
    }

    for (let key in validateObj) {
      if (!validateObj[key]) {
        this.setState({ err: key });
        return;
      }
    }
    return true;
  }

  componentDidMount() {
    if (this.props.editable) {
      const {
        name,
        surname,
        email,
        phone,
        photo,
        status,
      } = this.props.objValues;

      this.setState({
        name,
        surname,
        email,
        phone,
        photo,
        status,
        selectedRadio: status ? "online" : "offline",
      })
    }
  }

  change(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: name === 'status' ? value === "online" : value,
      selectedRadio: name === 'status' ? value : "offline",
    });
  }

  getCreate() {
    const {
      name,
      surname,
      email,
      phone,
      photo,
      status,
    } = this.state;

    let obj = {
      name,
      surname,
      email,
      phone,
      photo,
      status,
    };

    const validator = this.validation();

    if (validator) {
      this.validationPhoto(photo)
        .then(() => {
          this.props.create(obj);
        })
        .catch(error => {
          this.setState({ err: error })
        })
    }
  }

  getSaveContact() {
    const {
      name,
      surname,
      email,
      phone,
      photo,
      status,
    } = this.state;

    let obj = {
      name,
      surname,
      email,
      phone,
      photo,
      status,
    };

    const validator = this.validation();

    if (validator) {
      this.validationPhoto(photo)
        .then(() => {
          this.props.saveContact(obj);
        })
        .catch(error => {
          this.setState({ err: error })
        })
    }
  }

  render() {

    const {
      closeModal,
      objValues,
      editable
    } = this.props;

    const {
      err,
      selectedRadio,
      empty,
    } = this.state;

    return (
      <div className="modal">
        <div className="modal-content">

          <span className="close" onClick={closeModal}>&times;</span>

          {empty !== "" ? <p className="error">Fill {empty} field</p> : err !== "" ? <p className="error">Use correct {err} format</p> : ''}

          {modalInp.map((el, index) => {
            return (
              <div className="modalInp" key={index}>
                <span>{el.title}</span>

                {el.name === "phone" ?
                  <div className="phoneCode">
                    <label className="phoneLabel">
                      +374
                    </label>
                  </div> : ""}
                <input
                  onChange={this.change}
                  type={el.type}
                  placeholder={el.placeholder}
                  name={el.name}
                  defaultValue={editable ? objValues[el.name] : ""}
                />
              </div>
            )
          })}
          <label>Online
          <input
              onChange={this.change}
              type="radio"
              name="status"
              value="online"
              checked={selectedRadio === "online"}
            />
          </label>

          <label>Offline    
          <input
              onChange={this.change}
              type="radio"
              name="status"
              value="offline"
              checked={selectedRadio === "offline"}
            />
          </label>
          <div className="inpBtns">

            {editable ? (
              <div className="createIcon">
                <BsCheckAll onClick={() => this.getSaveContact()} />
              </div>
            )
              : (
                <div className="createIcon">
                  <BsCheckAll onClick={() => this.getCreate()} />
                </div>
              )
            }

            <div className="cancelIcon">
              <FcCancel onClick={closeModal} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
