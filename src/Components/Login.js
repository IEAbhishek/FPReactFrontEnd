import { Alert } from "bootstrap";
import React, { Component } from "react"
import { Link } from "react-router-dom";



export default class Login extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      UserName1: '',

    }
}

handleChange= (e)=> {
this.setState({[e.target.name]:e.target.value});
}
// on form submit...
handleFormSubmit(e) {
e.preventDefault()
localStorage.setItem('document',JSON.stringify(this.state));
}

// React Life Cycle
componentDidMount() {
this.documentData = JSON.parse(localStorage.getItem('document'));

if (localStorage.getItem('document')) {
    this.setState({
      UserName1: this.documentData.UserName1,
})
} else {
this.setState({
  UserName1: '',

})
}
}

  login() {
    //alert("Login Called");
    //console.warn(this.state)
    fetch('https://userapiforltiproject.azurewebsites.net/api/Token/Authenticate',
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"

        },
        body: JSON.stringify(this.state)
      }).then((result) => {
        result.json().then((resp) => {
          var token = JSON.parse(resp).access_token
          var role = JSON.parse(resp).Role
          var User_Validity = JSON.parse(resp).Error
          if (User_Validity == "unauthorized") {
            alert("Invalid Username and Password")
          }
          else if (User_Validity === "None") {
            //localStorage.setItem(this.state.UserName1, JSON.stringify(token))
            localStorage.setItem("Token", JSON.stringify(token))
            //console.warn(this.state.UserName1, JSON.stringify(resp));
            if (role == "Admin") {
              window.location = "/Details"
              //alert("This is admin")
            }
            else if (role == "User") {
              window.location = "/Hosttimer"
              //alert("This is usser")
            }
          }
        })
      })
  }
  render() {
    return (
        <form className="form" onSubmit = {this.handleFormSubmit}>
        <h1>Login Form</h1>
        <br />
        <div>
          <label><b>UserName</b></label>
          <input type="text" ref="UserName1" placeholder="Username" name = "UserName1" Value={this.state.UserName1} onChange= {this.handleChange}></input>
        </div>
        <br />
        <div>
          <label><b>Password</b></label>
          <input type="password" ref="password" placeholder="Password" onChange={(e) => { this.setState({ UserPassword: e.target.value }) }}></input>
        </div>
        <br />
        <div>
          <button onClick={() => this.login()} className= "btn btn-secondary" >Login</button>
        </div>
        <br />
        <div>
          <Link to = "/CNA">
          <p>Create New Account</p>
          </Link>
        </div>
        </form>
    );
  }
}


