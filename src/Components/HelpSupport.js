import { Button, Col, Form, Row, Modal} from "react-bootstrap";
import React,{ useEffect ,useState,useContext} from "react";
import Layout from "./Snippets/Layout";
import {HelpandsupportPost,createUserVisits,getTennantId} from '../apifunction';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout";
import { useNavigate } from 'react-router-dom';
function HelpSupport(props) {
    useEffect(() => {
        document.title = "Sigma | Help and Support"
    }, [])
        const [showA, setShowA] = useState(false);
        const toggleShowA = () => setShowA(!showA);
        const[loader, setLoader] = useState(false);
        const handleShowLoad = () => setLoader(true);
        const handleHideLoad = () => setLoader(false); 
    
        const[name,setname]=useState("");
        const[lastname,setlastname]=useState("");
        const[emailid,setEmail]=useState("");
        const[selecticket,setTicket]=useState("");
        const[descriptionofissuse,setDescription]=useState("");
        const history = useNavigate();
        const navigate = useNavigate()
       // console.log("selected",roleId);
     
       const [openModal, setOpenModal] = useState(false)
           
       const { logout } = useContext(AuthContext);
           
       const handleIdle = () => {
           setOpenModal(true);
       }
       const { idleTimer } = useIdle({ onIdle: handleIdle, idleTime: 5 })
       
       const stay = () => {
           setOpenModal(false)
           idleTimer.reset()
       }
       
       const handleLogout = () => {
           logout()
           setOpenModal(false)
       } 
    
       const logout3 = async () =>
       {  
           
           let email=localStorage.getItem('UserID')
           console.log("emailid",email)
         
          localStorage.setItem("Login",false)
          localStorage.removeItem('Login');
          localStorage.setItem("UserID"," ");
          localStorage.removeItem('UserID');
          localStorage.removeItem('UserName');
          if ( localStorage.getItem('rememberMe')=== true) {
           localStorage.removeItem('rememberMe');
         } else {
           localStorage.removeItem('rememberMe');
         }
         history('/');
          
         
          
       } 
        const handleSelect=(e)=>{   
            console.log("evalue",e)     
            setTicket(e)
        }
        const CreateTicket =async()=>{
            
      
          if(name === null || name === "" || name === undefined){
            toast.warn(`Please Enter an First Name`);  
            console.log("checkname");
        
          
             
        }
        else if(lastname === null || lastname === "" || lastname === undefined){
            toast.warn(`Please Enter Last Name`); 
                                                 
                }
        else if(selecticket === null || selecticket === "" || selecticket === undefined){
                    toast.warn(`Please Select an Tickettype`);    
                
                                                             
        }
        else if(descriptionofissuse === null || descriptionofissuse === "" || descriptionofissuse === undefined){
            toast.warn(`Please Enter Last Name`); 
                                                 
                }
        else if(emailid === null || emailid === "" || emailid === undefined){
            toast.warn(`Please Enter EmailId`); 
                }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailid))){
            toast.warn(`Please Enter Valid EmailId`); 
          
                
            }
       
        
            else{
            console.log("checkpass");
            let tenentid = await getTennantId();
            console.log("tenetid",tenentid);
          
            let orguser=await HelpandsupportPost(selecticket,descriptionofissuse,name,lastname,emailid,tenentid,0);            
            console.log("Orguser",orguser);
            await Reset();
            toast.success(`Ticket Raised successfully`);  
          
           
            }
       
    
    
        }
        const Reset =async()=>{
            console.log("aftercall");
         setname("");
         setlastname("");
         setEmail("");
         setTicket("");
         setDescription("");
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
        <Layout getThemeMode={() => undefined} roleType = {props.roleType} getIProfile = {props.getIProfile}>
    <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>

            <div className="container-fluid">
                <Row className="mb-40">
                    <Col md={6} xl={4} xxl={3}>
                        <h4 className="page-title mb-0">Help & Support</h4>
                    </Col>
                </Row>

                <Row>
                    <Col md={7} lg={6} xxl={5}>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="3">Name</Form.Label>
                                <Col sm="9">
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Control type="text" placeholder="First Name" onChange={event => setname( event.target.value)} value={name} />
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control type="text" placeholder="Last Name" onChange={event => setlastname( event.target.value)} value={lastname} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="3">Ticket</Form.Label>
                                <Col sm="9">
                                    <Form.Select className="form-control" aria-label="Default select example"  value={selecticket}   onChange={(event)=>{handleSelect(event.target.value)} }>
                                        <option>Select Type of Ticket</option>
                                        <option value="General Question">General Question</option>
                                        <option value="Bug Report">Bug Report</option>
                                        <option value="Feature Request">Feature Request</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="3">Subject</Form.Label>
                                <Col sm="9">
                                    <Form.Control as="textarea" rows={3} onChange={event => setDescription( event.target.value)} value={descriptionofissuse} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="3">Email</Form.Label>
                                <Col sm="9">
                                    <Form.Control type="email" placeholder="" onChange={event => setEmail( event.target.value)} value={emailid}/>
                                </Col>
                            </Form.Group>
                            <Row className="justify-content-end">
                                <Col sm="9">
                                    <Row>
                                        <Col xs={6}>
                                            <Button  variant="dark" className="w-100 btn-button"onClick={()=>{CreateTicket()}}>Submit</Button>
                                        </Col>
                                        <Col xs={6}>
                                            <Button type="reset" variant="outline-dark" className="w-100 btn-button"onClick={()=>{Reset()}}>Reset</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                
            <Modal show={openModal} onHide={stay}>
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
      </Modal>

            </div>
        </Layout>
     );
}

export default HelpSupport;