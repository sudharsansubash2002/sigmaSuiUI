import { Button, Col, Dropdown, Form, InputGroup, Row, Table, Badge, Modal } from "react-bootstrap";
import Eye from '../asserts/images/eye-icon.svg'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getTennantId, getTransaction } from "../apifunction";
import Check from '../asserts/images/check_icon.svg';
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout";

function NftTransactionsReport() {
    const [search, setSearch] = useState(false);
 const [reachedLastPage, setReachedLastPage] = useState(false);
    const [StartValue, setStartValue] = useState(0);
    const [limit, setlimit] = useState(10);
    const [txh, setTxh] = useState([]);

    // const navigate = useNavigate();
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
    const getTransc = async() =>{
        if(limit == 10){
            let tnId = await getTennantId();
            let tx = await getTransaction(StartValue,limit,tnId);
            // console.log("txhistory",tx)
            setTxh(tx);
            if (tx.length === 0) {
                setReachedLastPage(true);
            } else {
                setReachedLastPage(false);
            }
        }
        
    }
    useEffect(() =>{getTransc()},[])


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

    const pagination = async(value) =>{
        setStartValue(value);
        let tnId = await getTennantId();
        let tx = await getTransaction(value,limit,tnId);
        // console.log("txhistory",tx)
        setTxh(tx);
        // if (tx.length === 0) {
        //     setReachedLastPage(true);
        // } else {
        //     setReachedLastPage(false);
        // }
    }

    // const selectrow = async(value) =>{
    //     let tx = await getTransaction(StartValue,value,"543609ec-58ba-4f50-9757-aaf149e5f187");
    //     // console.log("txhistory",tx)
    //     setTxh(tx);
    //     // setlimit(value);
    //     selectrow(true);

    // }

        const calculateTimeAgo = (timestamp) => {
          const currentTime = new Date();
          const previousTime = new Date(timestamp);
          const timeDifference = Math.abs(currentTime - previousTime) / 1000; // Convert milliseconds to seconds
      
          if (timeDifference < 60) {
            return 'a few seconds ago';
          } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
          } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
          } else if (timeDifference < 2592000) {
            const days = Math.floor(timeDifference / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
          } else if (timeDifference < 31536000) {
            const months = Math.floor(timeDifference / 2592000);
            return `${months} month${months !== 1 ? 's' : ''} ago`;
          } else {
            const years = Math.floor(timeDifference / 31536000);
            return `${years} year${years !== 1 ? 's' : ''} ago`;
          }
        };

        const NftTransactionPage = (index) => {
            // console.log("nftTransactionPage", txh[index]);
            let txnHash = txh[index];
            navigate("/admin/nft-transactions-report/single-transaction/", { state: { object: txnHash } });
        }

    return ( 
        <div>
            <Row className="mb-20">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">Nft Transactions Report</h4>
                </Col>
            </Row>

            <Row className="mb-3 align-items-center" style={{minHeight: '40px'}}>
                <Col xs={10} md={4} lg={3}>
                    {search && (
                        <Form>
                            <InputGroup className="form-search shadow">
                                <Button variant="reset" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </Button>
                                <Form.Control
                                    aria-describedby="basic-addon1"
                                    aria-label="Write something to search"
                                    placeholder="Write something to search..."
                                />
                            </InputGroup>
                        </Form>
                    )}
                </Col>
                <Col xs={'auto'} className="ms-auto">
                    {/* <Button variant="outline-gray" className="me-0" onClick={() => setSearch(!search)}>
                        {search ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="d-block" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        ):(
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="d-block" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        )}
                    </Button> */}
                </Col>
            </Row>
            
            <div className="mb-20">
                <Table hover responsive>
                    <thead>
                        <tr>
                            {/* <th width="84">
                                <div className="d-flex align-items-center justify-content-between">
                                    <Dropdown size="sm" className="me-2">
                                        <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                            <img src={Eye} alt="Eye" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-filter-table">
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-1`}
                                                    label={`Show/Hide Columns`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-2`}
                                                    label={`Favourites`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-3`}
                                                    label={`Id`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-4`}
                                                    label={`File Name`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-5`}
                                                    label={`Document Name`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-6`}
                                                    label={`State`}
                                                />
                                            </div>
                                            <div className="d-flex px-2 py-1">
                                                <Form.Check
                                                    className="mb-0"
                                                    type='checkbox'
                                                    id={`default-7`}
                                                    label={`Global Id`}
                                                />
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Form.Check
                                        className="mb-0 check-single"
                                        type='checkbox'
                                        id={`default-8`}
                                    />
                                </div>
                            </th> */}
                            <th className="text-center">Transaction</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Address</th>
                            <th className="text-center">To</th>
                            <th className="text-center">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {txh[0] === null || txh[0] === "" || txh[0] === undefined || txh[0] === "undefined" ?
                        (<></>) :
                        (<>
                        {txh.map((r,i)=>{
                            return(<>
                            <tr>
                            {/* <td width="84">
                                <div className="d-flex justify-content-end">
                                    <Form.Check
                                        className="mb-0 check-single"
                                        type='checkbox'
                                        id={`default-9`}
                                    />
                                </div>
                            </td> */}
                             <td onClick={() => NftTransactionPage(i)} className="text-center txn_hash txn_hash_hover" style={{color: "#3366CC "}}>{(r.hash).substring(0, 5)}...{(r.hash).substring((r.hash).length - 5)}</td>
                             <td className="text-center"><Badge pill bg="success"><img src={Check} alt="success badge" />success</Badge></td>
                            {/* <td className="text-center text-truncate"> {(r.blockHash).substring(0, 5)}...{(r.blockHash).substring((r.blockHash).length - 5)}</td> */}
                            <td className="text-center">{(r.from).substring(0, 5)}...{(r.from).substring((r.from).length - 5)}</td>
                            <td className="text-center">{(r.to).substring(0, 5)}...{(r.to).substring((r.to).length - 5)}</td>
                            <td className="text-center">{calculateTimeAgo(r.timestamp)}</td>
                            {/* <td>{r.logs[0].data}</td> */}
                            {/* <td className="text-center">{r.blockNumber}</td>
                            <td className="text-center">{r.index}</td> */}
                        </tr>
                            </>)
                        })}
                        </>)}
                        
                        
                    </tbody>
                </Table>

                <Row className="mt-4">
                    <Col md={4} className="mb-md-0 mb-3 d-flex align-items-center">
                        {/* <h6 className="me-2 mb-0 text-muted">Showing 10 of 10:</h6>
                        <Dropdown size="sm">
                            <Dropdown.Toggle variant="gray" id="dropdown-basic">
                                Select Rows
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-filter">
                                <Dropdown.Item onClick={()=>selectrow(25)}>25 Rows</Dropdown.Item>
                                <Dropdown.Item onClick={()=>selectrow(50)}>50 Rows</Dropdown.Item>
                                <Dropdown.Item onClick={()=>selectrow(100)}>100 Rows</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </Col>
                    <Col md={8} className="d-flex justify-content-md-end justify-content-center">
                        <ul className="d-flex pagination list-unstyled">
                            <li>
                            <Link  className={StartValue !== 0 ? 'next' : StartValue === 0 ? 'prev disabled' : ''} onClick={()=>pagination(StartValue-10)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                                </Link>
                            </li>
                            <li><Link className='active'  onClick={()=>pagination(0)} >{StartValue ? (StartValue/10)+1 : "1"}</Link></li>
                            {/* <li><Link className={StartValue === 10 ? 'active' : ''} onClick={()=>pagination(10)}>2</Link></li>
                            <li><Link className={StartValue === 20? 'active' : ''} onClick={()=>pagination(20)}>3</Link></li>
                            <li><Link className={StartValue === 30? 'active' : ''} onClick={()=>pagination(30)}>4</Link></li>
                            <li><Link className={StartValue === 40? 'active' : ''} onClick={()=>pagination(40)}>5</Link></li>
                            <li><Link className={StartValue === 50 ? 'active' : ''} onClick={()=>pagination(50)}>6</Link></li> */}
                            <li>
                            <Link className={`next ${reachedLastPage ? 'disabled' : ''}`}onClick={() => {if (!reachedLastPage){pagination(StartValue + 10); }}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
            {/* /.mb-20 */}
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

export default NftTransactionsReport;