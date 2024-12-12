import { Badge, Button, Card, Col, ListGroup, Row, Table,Form,Modal} from "react-bootstrap";
import React,{ useEffect ,useState, useContext} from "react";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import {CreateOrganizationPost,CreateOrguserrolepost,createUserVisits} from '../apifunction';
import '../toast-style-override.css';
import CopyIcon from '../asserts/images/copy-icon.svg'
import { logRoles } from "@testing-library/react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { Link,useNavigate } from "react-router-dom";
// import AuthContext from "./AuthContext";
// import useIdle from "./useIdleTimeout"; 
const CreateOrg = () => {
    useEffect(() => {
        document.title = "Sigma | Create Organization"
    }, [])
        const [showA, setShowA] = useState(false);
        const toggleShowA = () => setShowA(!showA);
        const[loader, setLoader] = useState(false);
        const handleShowLoad = () => setLoader(true);
        const handleHideLoad = () => setLoader(false); 
    
        const[name,setname]=useState("");
        const[orgname,setorgname]=useState("");
        const[emailid,setEmail]=useState("");
        const[role,setRole]=useState("");
    //     const history = useNavigate();
    //     const navigate = useNavigate()
    //    // console.log("selected",roleId);
     
    //    const [openModal, setOpenModal] = useState(false)
           
    //    const { logout } = useContext(AuthContext);
           
    //    const handleIdle = () => {
    //        setOpenModal(true);
    //    }
    //    const { idleTimer } = useIdle({ onIdle: handleIdle, idleTime: 5 })
       
    //    const stay = () => {
    //        setOpenModal(false)
    //        idleTimer.reset()
    //    }
       
    //    const handleLogout = () => {
    //        logout()
    //        setOpenModal(false)
    //    } 
    
    //    const logout3 = async () =>
    //    {  
           
    //        let email=localStorage.getItem('UserID')
    //        console.log("emailid",email)
         
    //       localStorage.setItem("Login",false)
    //       localStorage.removeItem('Login');
    //       localStorage.setItem("UserID"," ");
    //       localStorage.removeItem('UserID');
    //       localStorage.removeItem('UserName');
    //       if ( localStorage.getItem('rememberMe')=== true) {
    //        localStorage.removeItem('rememberMe');
    //      } else {
    //        localStorage.removeItem('rememberMe');
    //      }
    //      history('/');
          
         
          
    //    } 
        const handleSelect=(e)=>{   
            console.log("evalue",e)     
            setRole(e)
        }
        const CreateOrganization =async()=>{
            
      
          if(name === null || name === "" || name === undefined){
            toast.warn(`Please Enter an Name`);  
            console.log("checkname");
        
          
             
        }
        else if(orgname === null || orgname === "" || orgname === undefined){
            toast.warn(`Please Enter Organization Name`); 
                                                 
                }
        else if(emailid === null || emailid === "" || emailid === undefined){
            toast.warn(`Please Enter EmailId`); 
                }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailid))){
            toast.warn(`Please Enter Valid EmailId`); 
          
                
            }
       
         else if(role === null || role === "" || role === undefined){
            toast.warn(`Please Select an role`);    
        
                                                     
                }
            else{
            console.log("checkpass");
            let tenentid = await CreateOrganizationPost(name,orgname);
            console.log("tenetid",tenentid);
            let orguser=await CreateOrguserrolepost(emailid,name,role,tenentid.tenantId);            
            console.log("Orguser",orguser);
            await Reset();
            toast.success(`Access ID created successfully`);  
          
           
            }
       
    
    
        }
        const Reset =async()=>{
            console.log("aftercall");
         setname("");
         setorgname("");
         setEmail("");
         setRole("");
            }
        // setTimeout(() => {
        //     setShowA(false)
        // }, 5000)
        useEffect(() => {
            userdata();
          }, []);
          
          const userdata = async () => {
            let algoAddress = localStorage.getItem("UserID");
            let networkType = "type";
            let walletType = "create-org";
          
            try {
              await createUserVisits(algoAddress, networkType, walletType);
              console.log("Update successful10");
            } catch (error) {
              console.error("Error updating:", error);
            }
          };
     
    return ( 
      
        <div>
       
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
     
            {/* <ToastContainer 
                position={"bottom-end"}
                className="p-3 position-fixed"
                style={{ zIndex: 1 }}>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Body><div className="d-flex px-2 align-items-center"><img src={CopyIcon} alt="CopyIcon" className="me-2" /> Please Enter name</div></Toast.Body>
                </Toast>
            </ToastContainer> */}
            <Row className="mb-40">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">Create Org</h4>
                </Col>
            </Row>

            <Row>
                <Col md={8} lg={7} xxl={6}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Name</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="" onChange={event => setname( event.target.value)} value={name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Organization Name</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="" onChange={event => setorgname( event.target.value)} value={orgname}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">E-mail ID</Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" placeholder="" onChange={event => setEmail( event.target.value)} value={emailid} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">Role <sup>*</sup></Form.Label>
                            <Col sm="9">
                                <Form.Select className="form-control" aria-label="Default select example"  value={role}   onChange={(event)=>{handleSelect(event.target.value)} }                           
                                >
                          
                                    <option value="">Select</option>
                                    <option value="System Admin">System Admin</option>
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
                                        <Button  variant="dark" className="w-100 btn-button" onClick={()=>{CreateOrganization()}}>Submit</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button type="reset" variant="outline-dark" className="w-100 btn-button" onClick={()=>{Reset()}}>Reset</Button>
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

export default CreateOrg;