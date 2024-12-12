import { Badge, Button, Card, Col, ListGroup, Row, Table, Toast, ToastContainer,Modal } from "react-bootstrap";
import CopyIcon from '../asserts/images/copy-icon.svg'
import Check from '../asserts/images/check_icon.svg'
import Wallet from '../asserts/images/wallet-icon.svg'
import RestAPI from '../asserts/images/rest_api.svg'
import { Link,useNavigate } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import {   OrgAdminmailcheckget2, getTennantId, nodeDetails,createUserVisits } from "../apifunction";
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout"; 
function Admin() {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const [nodeDetail, setnodeDetail] = useState(false);
    const [nodeDetail1, setnodeDetail1] = useState(false);
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

    setTimeout(() => {
        setShowA(false)
    }, 1200)

    const data = async()=>
{
  
    let tnId = await getTennantId();
    let id = tnId;
    let [check, data2] = await nodeDetails(id);
    console.log("data2", data2);
    setnodeDetail(data2);

    let [check1, data21] = await OrgAdminmailcheckget2(id);
    console.log("valid2", data21);
    setnodeDetail1(data21[0])
  
    // console.log("hlo1", data2[0].status)
    

    // console.log("hlo2", data2[0].id)
    // console.log("hlo3", data2[0].smartContractDefaultWalletAddress)
     
    

}
useEffect(( )=>{data()},[])


    const formatTime = (time) =>{
        let date = new Date(time);

        // Format the date and time using the toLocaleString method
        let formatted = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
        });

        // Display the formatted date and time
        // console.log(formatted);
        return formatted;
    }

    const convertToWebSocketUrl = (httpUrl) => {
        const convertedUrl = httpUrl.replace('https', 'wss').replace('connect', 'wss');
        return convertedUrl;
      };

    const convertToConnectUrl = (originalURL) =>{
        const convertedURL = originalURL.replace('connect', 'rpc');
        return convertedURL;
    }
    useEffect(() => {
        userdata();
      }, []);
      
      const userdata = async () => {
        let algoAddress = localStorage.getItem("UserID");
        let networkType = "type";
        let walletType = "Admin";
      
        try {
          await createUserVisits(algoAddress, networkType, walletType);
          console.log("Update successful13");
        } catch (error) {
          console.error("Error updating:", error);
        }
      };

    return ( 
        <div>
              
            <ToastContainer 
                position={"bottom-end"}
                className="p-3 position-fixed"
                style={{ zIndex: 1 }}>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Body><div className="d-flex px-2 align-items-center"><img src={CopyIcon} alt="CopyIcon" className="me-2" /> Copied successfully!</div></Toast.Body>
                </Toast>
            </ToastContainer>
            <Row className="mb-20">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">Node Details</h4>
                </Col>
            </Row>

            <Row className="gx-3 mb-lg-4 mb-2">
                <Col xs={6} lg={4} className="mb-3">
                    <div className="info-card info-card-5 d-flex flex-column justify-content-between">
                        <h4 className="d-flex align-items-center">Nodes Deployed</h4>
                        <h3 className="mb-0">{nodeDetail?.noOfNodes}</h3>
                    </div>
                </Col>
                <Col xs={6} lg={4} className="mb-3">
                    <div className="info-card info-card-6 d-flex flex-column justify-content-between">
                        <h4 className="d-flex align-items-center">Provider</h4>
                        <h3 className="mb-0">{nodeDetail?.provider}</h3>
                    </div>
                </Col>
                <Col xs={12} lg={4} className="mb-3">
                    <div className="info-card info-card-7 d-flex flex-column justify-content-between">
                        <h4 className="d-flex align-items-center">ID</h4>
                        <h3 className="mb-0">{nodeDetail1?.id}</h3>
                    </div>
                </Col>
            </Row>

            <Row className="gx-xl-5">
                <Col md={7} className="mb-md-0 mb-4">
                    <Card>
                        <Table hover responsive>
                            <tbody>
                           
                                <tr>
                                    <td>Name</td>
                                    <td>{nodeDetail? nodeDetail.nodes[1].name : ''}</td>
                                    <td width="50"></td>
                                </tr>
                                <tr>
                                    <td>Node1 ID</td>
                                    <td>{nodeDetail? nodeDetail.nodes[0].nodeId : ''}</td>
                                    <td>
                                        <Button variant="reset" onClick={() => {navigator.clipboard.writeText(nodeDetail.nodes[0].nodeId); toggleShowA();}}>
                                            <img src={CopyIcon} alt="CopyIcon" />
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Node2 ID</td>
                                    <td>{nodeDetail? nodeDetail.nodes[1].nodeId : ''}</td>
                                    <td>
                                        <Button variant="reset" onClick={() => {navigator.clipboard.writeText(nodeDetail.nodes[1].nodeId); toggleShowA();}}>
                                            <img src={CopyIcon} alt="CopyIcon" />
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Node size</td>
                                    <td>{nodeDetail? nodeDetail.nodes[0].size : ''}</td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Owner</td>
                                    <td>Default Organization</td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                
                                    <td>Status</td>
                                    <td><Badge pill bg="success"><img src={Check} alt="Check" /> Started</Badge></td>
                                   {/* {nodeDetail ? (<>
                                   {nodeDetail.nodes[0].state === "started" ? (<>
                                   
                                   </>):(<>
                                   </>)}
                                   </>):(<></>)} */}
                                    
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Region</td>
                                    <td>AWS us-east-2</td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Creation date</td>
                                    <td>{nodeDetail? formatTime(nodeDetail.created_at) : ''}</td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last updated date</td>
                                    <td>{nodeDetail? formatTime(nodeDetail.updated_at) : ''}</td>
                                    <td>
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td>Blockchain Node ID</td>
                                    <td>Approved</td>
                                    <td>
                                        <Button variant="reset" onClick={() => {navigator.clipboard.writeText('Approved'); toggleShowA();}}>
                                            <img src={CopyIcon} alt="CopyIcon" />
                                        </Button>
                                    </td>
                                </tr> */}
                                <tr>
                                    <td>Consensus role</td>
                                    <td>{nodeDetail? nodeDetail.nodes[0].role : ''}</td>
                                    <td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Consensus ID</td>
                                    <td>{nodeDetail? nodeDetail.nodes[0].name : ''}</td>
                                    {/* <td>
                                        <Button variant="reset" onClick={() => {navigator.clipboard.writeText('Sigma Admin'); toggleShowA();}}>
                                            <img src={CopyIcon} alt="CopyIcon" />
                                        </Button>
                                    </td> */}
                                </tr>
                                {/* <tr>
                                    <td>Runtime version</td>
                                    <td>US-East North Carolin</td>
                                    <td>
                                    </td>
                                </tr> */}
                                <tr>
                                    <td>User account</td>
                                    <td><Badge pill bg="secondary" className="text-truncate"><img src={Wallet} alt="Wallet" /> Default | { nodeDetail1? nodeDetail1.smartContractDefaultWalletAddress : ""}</Badge></td>
                                    <td>
                                        <Button variant="reset" onClick={() => {navigator.clipboard.writeText(nodeDetail1.smartContractDefaultWalletAddress); toggleShowA();}}>
                                            <img src={CopyIcon} alt="CopyIcon" />
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                </Col>
                <Col md={5}>
                    <Card>
                        <Card.Header>
                            <h5>Connect your node</h5>
                            <p>Send transactions to the blockchain network using these endpoints along with valid application credentials.</p>
                        </Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex py-3 align-items-center">
                                <div className="list-icon">://</div>
                                <div className="list-content pe-2 flex-grow-1">
                                    <h6 className="mb-1 text-truncate">JSON/RPC HTTP endpoint</h6>
                                    <p className="text-break">{nodeDetail1? convertToConnectUrl(nodeDetail1.smartContractAccessUrl): ""}</p>
                                </div>
                                <div className="list-copy">
                                    <Button variant="reset" onClick={() => {navigator.clipboard.writeText( convertToConnectUrl(nodeDetail1.smartContractAccessUrl)); toggleShowA();}}>
                                        <img src={CopyIcon} alt="CopyIcon" />
                                    </Button>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex py-3 align-items-center">
                                <div className="list-icon">://</div>
                                <div className="list-content pe-2 flex-grow-1">
                                    <h6 className="mb-1 text-truncate">JSON/RPC Web socket endpoint</h6>
                                    <p className="text-break">{nodeDetail1? convertToWebSocketUrl(nodeDetail1.smartContractAccessUrl): ""}</p>
                                </div>
                                <div className="list-copy">
                                    <Button variant="reset" onClick={() => {navigator.clipboard.writeText(convertToWebSocketUrl(nodeDetail1.smartContractAccessUrl)); toggleShowA();}}>
                                        <img src={CopyIcon} alt="CopyIcon" />
                                    </Button>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex py-3 align-items-center">
                                <div className="list-icon"><img src={RestAPI} alt="RestAPI" /></div>
                                <div className="list-content pe-2 flex-grow-1">
                                    <h6 className="mb-1 text-truncate">REST API Gateway</h6>
                                    <p className="text-break">{nodeDetail1? nodeDetail1.smartContractAccessUrl: ""}</p>
                                </div>
                                <div className="list-copy">
                                    <Button variant="reset" onClick={() => {navigator.clipboard.writeText(nodeDetail1.smartContractAccessUrl); toggleShowA();}}>
                                        <img src={CopyIcon} alt="CopyIcon" />
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                        {/* <Card.Footer className="d-block">
                            <Row>
                                <Col sm={6} className="mb-sm-0 mb-2">
                                    <Link to="/" className="w-100 btn-dark btn-button">Connect App</Link>
                                </Col>
                                <Col sm={6}>
                                    <Link to="/" className="w-100 btn-dark btn-button">Import Smart Contract</Link>
                                </Col>
                            </Row>
                        </Card.Footer> */}
                    </Card>
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
     );
}

export default Admin;