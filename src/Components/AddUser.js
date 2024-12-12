import React, { useEffect, useState,useContext} from "react";
import { Button, Col, Form, Row, Dropdown,Modal} from "react-bootstrap";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { OrgAdminmailcheckget1, CreateOrguserrolepost,getTennantId,NotificationPost,getNotificationById } from "../apifunction";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout";

function AddUser() {
    const[name,setname]=useState("");
    const[emailid,setEmail]=useState("");
    const[role,setRole]=useState("");
    const [roleId,setRoleId] = useState("");
    // const history = useNavigate();
     const navigate = useNavigate()
    // // console.log("selected",roleId);
    const handleChange = (e) => {
        setRole(e)
    }
    // const [openModal, setOpenModal] = useState(false)
        
    // const { logout } = useContext(AuthContext);
        
    // const handleIdle = () => {
    //     setOpenModal(true);
    // }
    // const { idleTimer } = useIdle({ onIdle: handleIdle, idleTime: 5 })
    
    // const stay = () => {
    //     setOpenModal(false)
    //     idleTimer.reset()
    // }
    
    // const handleLogout = () => {
    //     logout()
    //     setOpenModal(false)
    // } 

    // const logout3 = async () =>
    // {  
        
    //     let email=localStorage.getItem('UserID')
    //     console.log("emailid",email)
      
    //    localStorage.setItem("Login",false)
    //    localStorage.removeItem('Login');
    //    localStorage.setItem("UserID"," ");
    //    localStorage.removeItem('UserID');
    //    localStorage.removeItem('UserName');
    //    if ( localStorage.getItem('rememberMe')=== true) {
    //     localStorage.removeItem('rememberMe');
    //   } else {
    //     localStorage.removeItem('rememberMe');
    //   }
    //   history('/');
       
      
       
    // } 

    const roleFetch = async () => {
        try{
            let [check, tenentid] = await OrgAdminmailcheckget1(localStorage.getItem('UserID'));
            console.log("tenetid",tenentid.roleType);
            setRoleId(tenentid.roleType);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        roleFetch();
    }, [roleId])

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    const Addusertoorganization = async () => {
        try{
            let [check, tenentid] = await OrgAdminmailcheckget1(localStorage.getItem('UserID'));
            // setRoleId(tenentid.roleType);
            console.log("tenetid",tenentid);
            let orguser = await CreateOrguserrolepost(emailid, name, role, tenentid.tennantId);            
            // console.log("----------Orguser",emailid, name, role);
            toast.success("User added successfully");
            await sleep(5000);
            navigate("/user-management");
        }catch(err){
            toast.error(err);
        }
    }
    const resetFields = () => {
        setEmail("");
        setname("");
        setRole("");
    }

    return ( 
        <div>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
            <Row className="mb-40">
            <Link to="/user-management" className="d-inline-block me-auto btn-back align-items-center"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Back
            </Link><br/><br/>
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">Add User</h4>
                </Col>
            </Row>

            <Row>
                <Col md={8} lg={7} xxl={6}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Name</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="" onChange={event => setname(event.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Email</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="" onChange={event => setEmail(event.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Role <sup>*</sup></Form.Label>
                            <Col sm="9">
                                <Form.Select className="form-control" aria-label="Default select example"  value={role}   onChange={(event)=>{handleChange(event.target.value)} }                           
                                >
                          
                                    <option value="">Select</option>
                                    {roleId === "Super User" ? <>
                                        <option value="Super User">Super user</option>
                                        <option value="System Admin">System Admin</option>                                    
                                    </> : <></>}
                                    <option value="Business Admin">Business Admin</option>
                                    <option value="FDA Auditor">FDA Auditor</option>
                                    <option value="Vault Owner">Vault Owner</option>
                                    <option value="Full User">Full User</option>
                                    <option value="Viewer">Viewer</option>
                                 
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Row className="justify-content-end">
                            <Col sm="9">
                                <Row>
                                    <Col xs={6}>
                                        <Button variant="dark" className="w-100 btn-button" onClick={() => Addusertoorganization()}>Submit</Button>
                                        
                                    </Col>
                                    <Col xs={6}>
                                        <Button type="reset" variant="outline-dark" className="w-100 btn-button" onClick={() => resetFields()}>Reset</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

            {/* <Modal show={openModal} onHide={stay}>
        <Modal.Header closeButton>
          <Modal.Title>Your session is about to expire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your session is about to expire. You'll be automatically signed out.</p>
          <p>Do you want to stay signed in?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={logout3}>
            Sign out now
          </Button>
          <Button variant="primary" onClick={stay}>
            Stay signed in
          </Button>
        </Modal.Footer>
      </Modal> */}

        </div>
     );
}

export default AddUser;