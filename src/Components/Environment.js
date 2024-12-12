import { Button, Col, Form, Row} from "react-bootstrap";
import React,{ useEffect ,useState} from "react";
import Layout from "./Snippets/Layout";
import {CreateOrganizationPost,CreateOrguserrolepost,createUserVisits} from '../apifunction';
function Environment() {
    useEffect(() => {
        userdata();
      }, []);
      
      const userdata = async () => {
        let algoAddress = localStorage.getItem("UserID");
        let networkType = "type";
        let walletType = "Environment";
      
        try {
          await createUserVisits(algoAddress, networkType, walletType);
          console.log("Update successful7");
        } catch (error) {
          console.error("Error updating:", error);
        }
      };
    return ( 
        <div>
            <Row className="mb-40">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">Environment</h4>
                </Col>
            </Row>

            <Row>
                <Col md={10} lg={9} xxl={8}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">Name of the Network <sup>*</sup></Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">Name of the Organization <sup>*</sup></Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">Select No of Nodes <sup>*</sup></Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">Choose the type of Infrastructure <sup>*</sup></Form.Label>
                            <Col sm="8">
                                <Form.Select className="form-control" aria-label="Default select example">
                                    <option>Select</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">Cloud Provider <sup>*</sup></Form.Label>
                            <Col sm="8">
                                <Form.Select className="form-control" aria-label="Default select example">
                                    <option>Select</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">Region <sup>*</sup></Form.Label>
                            <Col sm="8">
                                <Form.Select className="form-control" aria-label="Default select example">
                                    <option>Select</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">Choose the Deployment Plan <sup>*</sup></Form.Label>
                            <Col sm="8">
                                <Form.Select className="form-control" aria-label="Default select example">
                                    <option>Select</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Row className="justify-content-end">
                            <Col sm="8">
                                <Row>
                                    <Col xs={6}>
                                        <Button type="submit" variant="dark" className="w-100 btn-button">Submit</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button type="reset" variant="outline-dark" className="w-100 btn-button">Reset</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
     );
}

export default Environment;