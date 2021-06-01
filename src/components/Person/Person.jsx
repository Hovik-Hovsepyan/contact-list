import React from "react";

class Person extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="person">
        {this.props.arr.map((contact, index) => {
          if (contact.clicked) {
            return (
              <div className="pers editable" key={index} >
                <img src={contact.photo} className="img" />
                <strong>Name: </strong> <input type="text" defaultValue={contact.name}/>
                <strong>Surname: </strong> <input type="text" defaultValue={contact.surname}/>
                <strong>Email: </strong> <input type="text" defaultValue={contact.email} />
                <strong>Phone: </strong> <input type="text" defaultValue={contact.phone}/>
                <strong>Status: </strong> <input type="text"  defaultValue={contact.status}/>
                <div className="btns">
                  <button onClick={() => this.props.editContact(index)} className="editBtn" >Edit</button>
                  <button onClick={() => this.props.delContact(index)} className="delBtn">Delete</button>
                </div>
              </div>
            )
          } else {
            return (
              <div className="person" key={Date.now() + index}>
                    <div className="pers">
                      <img src={contact.photo} className="img" />
                      <p> <strong>Name: </strong> {contact.name}</p>
                      <p> <strong>Surname: </strong> {contact.surname}</p>
                      <p> <strong>Email: </strong> {contact.email}</p>
                      <p> <strong>Phone: </strong> {contact.phone}</p>
                      <p> <strong>Status: </strong> {contact.status}</p>
                      <div className="btns">
                        <button onClick={() => this.props.editContact(index)} className="editBtn" >Edit</button>
                        <button onClick={() => this.props.delContact(index)} className="delBtn">Delete</button>
                      </div>
                    </div>
              </div>
            )
          }
        })
        }
      </div>
    )
  }
}
export default Person;






{/* <div className="person">
  {this.props.arr.map((contact, index) => {
    return (
      <div className="pers" key={index} >
        <img src={contact.photo} className="img" />
        <h2>{contact.name} {contact.surname}</h2>
        <p> <strong>Email: </strong> {contact.email}</p>
        <p> <strong>Phone: </strong> {contact.phone}</p>
        <p> <strong>Status: </strong> {contact.status}</p>
        <div className="btns">
          <button onClick={() => this.props.editContact(index)} className="editBtn" >Edit</button>
          <button onClick={() => this.props.delContact(index)} className="delBtn">Delete</button>
        </div>
      </div>
    )
  })
  }
</div> */}








{/* <div className="person">
      //   {this.props.arr.map((contact, index) => {
      //     if (contact.clicked) {
      //       return (
      //         <div className="pers" key={index} >
      //           <img src={contact.photo} className="img" />
      //           <input type="text" />
      //           <strong>Email: </strong> <input type="text" />
      //           <strong>Phone: </strong> <input type="text" />
      //           <strong>Status: </strong> <input type="text" />
      //           <div className="btns">
      //             <button onClick={() => this.props.editContact(index)} className="editBtn" >Edit</button>
      //             <button onClick={() => this.props.delContact(index)} className="delBtn">Delete</button>
      //           </div>
      //         </div>
      //       )
      //     } else {
      //       return (
      //         <div className="person">
      //           {this.props.arr.map((contact, index) => {
      //             return (
      //               <div className="pers" key={index} >
      //                 <img src={contact.photo} className="img" />
      //                 <h2>{contact.name} {contact.surname}</h2>
      //                 <p> <strong>Email: </strong> {contact.email}</p>
      //                 <p> <strong>Phone: </strong> {contact.phone}</p>
      //                 <p> <strong>Status: </strong> {contact.status}</p>
      //                 <div className="btns">
      //                   <button onClick={() => this.props.editContact(index)} className="editBtn" >Edit</button>
      //                   <button onClick={() => this.props.delContact(index)} className="delBtn">Delete</button>
      //                 </div>
      //               </div>
      //             )
      //           })
      //           }
      //         </div>
      //       )
      //     }
      //   })
      //   }
      // </div> */}