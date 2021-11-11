import { Link } from "react-router-dom";
import React, { Component } from "react";


export default class CNA extends Component {


  onCreateUser = () => {
    //console.log(this.refs.userType.value)
    const errors = {};
    const regex = /^[a-zA-Z]{3,25}$/i;
    const regex1 = /^[a-zA-Z]*[0-9]*[a-zA-Z0-9]{3,50}$/i;
    const regex2 = /^[A-Za-z0-9](?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%?&])[A-Za-z0-9@$!%?&]{5,11}$/i;
    //const regex2 = /^(?=.?[A-Z])(?=(.[a-z]){1,})(?=(.[\d]){1,})(?=(.[\W]){1,})(?!.*\s).{6,12}$/i
    //const regex2= /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,12}$/i;
    const regex3 = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
    const regex4 = /^[0-9]{10}$/;

    if (!this.refs.firstname.value) {
      errors.firstname = "firstname is required";
      // console.log(errors)
      alert(errors["firstname"])
      // return errors;
    }
    else if (!regex.test(this.refs.firstname.value)) {
      errors.firstname = "firstname is invalid";
      alert(errors["firstname"])
    }
    if ((this.refs.email.value) && (!regex3.test(this.refs.email.value))) {
      errors.email = "email is invalid";
      alert(errors["email"])
    }
    if ((this.refs.mobile.value) && (!regex4.test(this.refs.mobile.value))) {
      errors.phonenumber = "phonenumber is invalid";
      alert(errors["phonenumber"])
    }
    if (!this.refs.lastname.value) {
      errors.last = "lastname is required";
      alert(errors["last"])
    }
    else if (!regex.test(this.refs.lastname.value)) {
      errors.lastname = "lastname is invalid";
      alert(errors["lastname"])
    }
    if (!this.refs.username.value) {
      errors.username = "username is required";
      alert(errors["username"])
    }
    else if (!regex1.test(this.refs.username.value)) {
      errors.username = "username is invalid";
      alert(errors["username"])
    }
    if (!this.refs.password.value) {
      errors.password = "password is required";
      alert(errors["password"])
    }

    else if (!regex2.test(this.refs.password.value)) {
      errors.password = " password is invalid";
      alert(errors["password"])
    } else { }

    console.log(errors["firstname"]);
    const myJSON = JSON.stringify(errors);
    console.log(myJSON);
    var count = Object.keys(myJSON).length;
    console.log(count);
    if (count > 2)
      alert("Errors found please retype")
    else
      if (this.refs.c_password.value === this.refs.password.value) {
        fetch('https://userapiforltiproject.azurewebsites.net/api/Registrations/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.state),
           /*body: JSON.stringify({


             FirstName: this.refs.firstname.value,
             LastName: this.refs.lastname.value,
             Email: this.refs.email.value,
             PhoneNumber: this.refs.mobile.value,
             UserName1: this.refs.userType.value,
           UserPassword: this.refs.password.value




           })*/
        }).then(r => r.json()).then((result => {
          if (result) {
            var token = JSON.parse(result).access_token
            //localStorage.setItem(this.state.UserName1, JSON.stringify(token))
            localStorage.setItem("Token", JSON.stringify(token))
            window.location = "/Login"
            //this.setState({message:'New Employee is Created Successfully'});
          } else {
            alert("failed");
            window.location = "/CNA"
          }

        }))
      }
      else {
        alert("Please type value in Password and Confirm Password Field")
      }
  }
  render() {
    return (
      <form >
        <h1>Create New Account</h1>
        <br />
        <div>
          <label><b>First Name</b></label>
          <input type="text" ref="firstname" placeholder="First Name" onChange={(e) => { this.setState({ FirstName: e.target.value }) }}></input>
        </div>
        <br />
        <div>
          <label><b>Last Name</b></label>
          <input type="text" ref="lastname" placeholder="Last Name" onChange={(e) => { this.setState({ LastName: e.target.value }) }}></input>
        </div>
        <br />
        <div>
          <label><b>Email</b></label>
          <input type="email" ref="email" placeholder="Email" onChange={(e) => { this.setState({ Email: e.target.value }) }}></input>
        </div>
        <br />
        <br />
        <div>
          <label><b>Mobile</b></label>
          <input type="text" ref="mobile" placeholder="Mobile" onChange={(e) => { this.setState({ PhoneNumber: e.target.value }) }}></input>
        </div>
        <br />
        <br />
        <div>
          <label><b>UserName</b></label>
          <input type="text" ref="username" placeholder="Username" onChange={(e) => { this.setState({ UserName1: e.target.value }) }}></input>
        </div>
        <br />
        <div>
          <label><b>Password</b></label>
          <input type="password" ref="password" placeholder="Password" onChange={(e) => { this.setState({ UserPassword: e.target.value }) }}></input>
        </div>
        <br />
        <div>
          <label><b>Confirn Password</b></label>
          <input type="password" ref="c_password" placeholder="Confirm_Password" onChange={(e) => { this.setState({ UserPassword: e.target.value }) }}></input>
        </div>
        <br />
        <div>
          <Link to="/CNA"><button onClick={() => this.onCreateUser()} >Submit</button></Link>
        </div>
        <br />
      </form>
    );
  }
}
  //export default CNA;