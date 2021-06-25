import React, { Component } from 'react';

import { modalInp } from './modalInp';

import {
  BsCheckAll,
  FcCancel,
} from 'react-icons/all';

import './Modal.css';

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

    return new Promise(resolve => {

      const image = new Image();
      image.src = url;

      image.onload = function () {
        resolve(true);
      }
      image.onerror = function () {
        resolve(false)
      }
    })
  }

  async validation () {
    const {
      name,
      surname,
      email,
      phone,
      photo,
    } = this.state;

    const validateObj = {
      name: this.validationName(name),
      surname: this.validationName(surname),
      email: this.validationEmail(email),
      phone: this.validationPhone(phone),
      photo: await this.validationPhoto(photo),
    };

    for (let key in validateObj) {
      if(!this.state[key]) {
        return `Fill ${key} field`;
      } 
      if (!validateObj[key]) {
        return `Use correct ${key} format`;
      }
    }

    this.setState({err: ''});

    return "ok";
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
      });
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

  async getCreate(cb) {
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

    const validator = await this.validation();
      validator === "ok" ? typeof cb === "function" && cb(obj) :
      this.setState({ err : validator });
  }


  render() {
    const {
      closeModal,
      objValues,
      editable,
      saveContact,
      create,
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

          {err && <p className="error">{err}</p>}

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

            <div className="createIcon">
              <BsCheckAll onClick={() => this.getCreate(editable ? saveContact : create)} />
            </div>

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
