import React, { Component } from "react";
import axios from 'axios';
import { Form, Modal, Row, Col } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import Details from "./Details";

export class EditDepModel extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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


  onCreateEmployee = () => {
    console.log(this.refs.Name.value)
    let empInfo = {
      DepartmentId: null,
      DepartmentName: this.refs.Name.value


    };


  }
  handleSubmit(event) {

    event.preventDefault();
    console.log(event.target.queryname.value)
    var token = localStorage.getItem("Token")
    fetch('https://userapiforltiproject.azurewebsites.net/api/Query', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': "Bearer " + token.replace(/['"]+/g, '')
      },
      body: JSON.stringify({
        QueryId: event.target.queryid.value,
        queryname: event.target.queryname.value,
        Department: event.target.querydepartment.value,
        Descript: event.target.querydescription.value


      })
    }).then(r => r.json()).then((result => {
      if (result) {
        alert("Success");
        //this.setState({message:'New Employee is Created Successfully'});
        window.location = "/Details"
      } else {
        alert("failed");
      }


    }))
  }
  render() {
    return (
      <div className="container">
        <Modal {...this.props}
          size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Edit Department

            </Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                  <Form.Group>

                    <Form.Label>Query Id Id</Form.Label>
                    <Form.Control type="text" name="queryid" required disabled defaultValue={this.props.qid} />
                  </Form.Group>
                  <Form.Group>

                    <Form.Label>Query Name</Form.Label>
                    <Form.Control type="text" name="queryname" required defaultValue={this.props.qname} />
                  </Form.Group>
                  <Form.Group>

                    <Form.Label> Query Department</Form.Label>
                    <Form.Control type="text" name="querydepartment" required defaultValue={this.props.qdepartment} />
                  </Form.Group>
                  <Form.Group>

                    <Form.Label>Query Description</Form.Label>
                    <Form.Control type="text" name="querydescription" required defaultValue={this.props.qdescription} />
                  </Form.Group>


                  <Form.Group>
                    <button >Update Department</button>
                  </Form.Group>

                </Form>

              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => this.props.onHide()}>Close</button>

          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}