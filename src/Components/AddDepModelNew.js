import React, { Component } from "react";
import axios from 'axios';
import { Form, Modal, Row, Col } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";


export class AddDepModelnew extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': "Bearer " + token.replace(/['"]+/g, '')
            },
            body: JSON.stringify({

                queryname: event.target.queryname.value,
                Department: event.target.querydepartment.value,
                Descript: event.target.querydescription.value


            })
        }).then(r => r.json()).then((result => {
            if (result) {
                alert("Success");
                window.location = "/Details"
                //this.setState({message:'New Employee is Created Successfully'});
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
                            Add Department

                        </Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form onSubmit={(event) => this.handleSubmit(event)}>
                                    <Form.Group>

                                        <Form.Label>Query Name</Form.Label>
                                        <Form.Control type="text" name="queryname" required />
                                    </Form.Group>
                                    <Form.Group>

                                        <Form.Label> Query Department</Form.Label>
                                        <Form.Control type="text" name="querydepartment" required />
                                    </Form.Group>
                                    <Form.Group>

                                        <Form.Label>Query Description</Form.Label>
                                        <Form.Control type="text" name="querydescription" required />
                                    </Form.Group>
                                    <Form.Group>
                                        <button>Add Query</button>
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