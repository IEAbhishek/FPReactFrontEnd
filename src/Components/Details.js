import React, { Component } from 'react'
import Data from "./Mock_data.json"
import ReadOnlyRow from './ReadOnly';

import Button from "@restart/ui/esm/Button";
//import React,{Component} from "react";
import { ButtonToolbar, Table } from 'react-bootstrap';
import { AddDepModelnew } from './AddDepModelNew';
import { EditDepModel } from './EditDepModel'
//import Map from './Map';
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], addModalShow: false, editModalShow: false }

  }

  refreshlist() {
    var token = localStorage.getItem("Token")
    console.log("Bearer " + token)
    fetch('https://userapiforltiproject.azurewebsites.net/api/Query/', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': "Bearer " + token.replace(/['"]+/g, '')
      },
    }).then(res => res.json())
      .then(
        (data) => {
          console.log(data);
          this.setState({
            deps: data
          });
        }
      );

    // fetch(' http://localhost:5000/api/Query/')
    //   .then(res => res.json())
    //   .then(
    //     (data) => {
    //       this.setState({
    //         deps: data
    //       });
    //     }
    //   );
  }
  componentDidMount() {
    this.refreshlist();
  }
  // componentDidUpdate() {
  //   this.refreshlist();
  // }

  deleteDep(depid) {
    if (window.confirm('Are you reaaly wanna delete')) {
      var token = localStorage.getItem("Token")
      fetch('https://userapiforltiproject.azurewebsites.net/api/Query/' + depid, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': "Bearer " + token.replace(/['"]+/g, '')
        },


      })
    }
    this.refreshlist();

  }
  render() {
    const { deps, qid, qname, qdepartment, qdescription } = this.state;
    //   const {deps,depid,depname}=this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (

      <div  >
        <Table>
          <thread>

          </thread>
          <tbody>
            <tr><th>QueryId</th>
              <th>QueryName</th>
              <th>Query Department</th>
              <th>Query Detail</th>
              <th>Query Option</th>
              <ButtonToolbar>
          <button onClick={() => this.setState({ addModalShow: true })}>add Department</button>
        </ButtonToolbar>
            </tr>
            {deps.map(dep => (
              <tr key={dep.QueryId}>
                <td>{dep.QueryId}</td>
                <td>{dep.queryname}</td>
                <td>{dep.Department}</td>
                <td>{dep.Descript}</td>

                <td>
                  {<ButtonToolbar>

                    <Button onClick={() => this.setState({
                      editModalShow: true, qid: dep.QueryId, qname: dep.queryname, qdepartment: dep.Department,
                      qdescription: dep.Descript
                    })}>
                      Edit
                    </Button>
                    <Button onClick={() => this.deleteDep(dep.QueryId)}>
                      Delete
                    </Button>
                    <EditDepModel show={this.state.editModalShow} onHide={() => editModalClose()} qid={qid} qname={qname} qdepartment={qdepartment}
                      qdescription={qdescription} />
                  </ButtonToolbar>}


                </td>

              </tr>))}
          </tbody>
        </Table>

        <AddDepModelnew show={this.state.addModalShow} onHide={() => addModalClose()}></AddDepModelnew>
      </div>
    )

  }

}

/*
export default class Details extends Component {

    render(){

    return (
        <div className = "app-container">
            <table>
                <thead>
                    <tr>
                        <th>FullName</th>
                        <th>Address</th>
                        <th>PhoneNumber</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {contacts.map((contact) => (
                    <ReadOnlyRow
                    contact={contact}
                    handleDeleteClick={handleDeleteClick}
                  />
                    ))} */
/*             </tbody>
         </table>
     </div>
 )
}
}*/

