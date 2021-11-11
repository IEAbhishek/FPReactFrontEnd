import React,{Component} from "react";
import {Link} from "react-router-dom";



export default class Admin extends Component {

    onCreateEmployee=()=>{
        console.log(this.refs.email.value)
        console.log(this.refs.password.value)
    
        var s=this.refs.email.value;
        var s1=this.refs.password.value;
       /* if(s===s1)
        window.location = "/Details";
        else
        window.location = "/CNA";
*/
        const axios = require('axios');

        axios.get('http://localhost:41659/api/Employee').then(resp => {
        
            console.log(resp.data);
            for(var i=0;i<resp.data.length;i++)
            {var s=resp.data[i].TypeofEmployee;
            var s1="normal";
            if(s===s1)
            window.location = "/CNA";
            else
            console.log("We cannot redirect")
            }

        }); 





    }
    render(){
    return (
        <form className = "main">
            <h1>Welcome Admin!!</h1>
            <br/>
        <div>
            <label>Email</label>
            <input type = "email" ref="email" placeholder = "Email" ></input>
        </div>
        <br/>
        <div>
            <label>Password</label>
            <input type = "password" ref="password" placeholder = "Password" ></input>
        </div>
        <br/>
        <div>
             <Link to = "/Details"> 
                <button  >Login</button>
                 </Link> 
        </div>  
    </form>
    );
    }
  }
  
  
  