import { Button, Col, Form, Row} from "react-bootstrap";

function APILogs() {
    return ( 
        <div>
            <Row className="mb-40">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">API Logs</h4>
                </Col>
            </Row>

            <Row>
                <Col md={8} lg={7} xxl={6}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Org</Form.Label>
                            <Col sm="9">
                                <Form.Select className="form-control" aria-label="Default select example">
                                    <option>Select</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Tenant id</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Org Url</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="" value="https://" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Org username</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Org Password</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="" />
                            </Col>
                        </Form.Group>
                        <Row className="justify-content-end">
                            <Col sm="9">
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

export default APILogs;