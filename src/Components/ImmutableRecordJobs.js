import { Button, Col, Dropdown, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import Eye from '../asserts/images/eye-icon.svg'
import Question from '../asserts/images/question-icon.svg'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {  executeJobListImmutable, getJobListImmutable, getTennantId,createUserVisits } from "../apifunction";
// import AuthContext from "./AuthContext";
// import useIdle from "./useIdleTimeout";
function ImmutableRecordJobs() {
    const [search, setSearch] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [selectedColumns, setSelectedColumns] = useState([]);
    const [jobLists, setjobList] = useState([]);
    console.log("pending",jobLists)
    const [StartValue, setStartValue] = useState(0);
    const [limit, setlimit] = useState(10);

    const [reachedLastPage, setReachedLastPage] = useState(false);
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

    useEffect(() =>{
        const jobfetch = async() =>{
            let tnId = await getTennantId();
            await getJobListImmutable(tnId,StartValue,limit).then((response)=>
            // console.log("response",response)
            setjobList(response)

            );
        }
        jobfetch();
    }, [])

    const runJob = async() =>{
        await executeJobListImmutable();
        handleClose();
        window.location.reload();
    }

    const paginationProcess = async(start,limit) =>{
        let tnId = await getTennantId();
        await getJobListImmutable(tnId,start,limit).then((response)=> {
            // console.log("response",response)
        setjobList(response);
        if (response.length === 0) {
            setReachedLastPage(true);
        } else {
            setReachedLastPage(false);
        }
        }
        
        )
        
        setStartValue(start);
    }
    useEffect(() => {
        userdata();
      }, []);
      
      const userdata = async () => {
        let algoAddress = localStorage.getItem("UserID");
        let networkType = "type";
        let walletType = "Immutable record Jobs";
      
        try {
          await createUserVisits(algoAddress, networkType, walletType);
          console.log("Update successful5");
        } catch (error) {
          console.error("Error updating:", error);
        }
      };
    return ( 
        <div>
            <Row className="mb-20">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">NFT Minter Jobs</h4>
                </Col>
            </Row>

            <Row className="mb-20" style={{minHeight: '40px'}}>
                <Col xs={9} md={6} className="ms-md-0 d-flex align-items-center justify-content-end ms-auto order-md-1">
                    <Button variant="gray" className="btn-gray-black rounded-pill me-2" onClick={handleShow}>Schedule Job</Button>
                    {/* <Button variant="outline-gray" className="me-2 btn-outline-gray-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="d-block" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </Button> */}
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
                <Col xs={12} md={6} className="mt-md-0 mt-2 mb-md-0 mb-3">
                    {/* {search && (
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
                    )} */}
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className="text-center py-5">
                    <img src={Question} className="mb-2" alt="Question" />
                    <h6>Are you sure you want to execute this action?</h6>

                    <div className="d-flex pt-4 align-items-center justify-content-center">
                        <Button type="submit" variant="dark" className="btn-button btn-sm" onClick={()=>runJob()}>Yes</Button>
                        <Button type="reset" variant="outline-dark" className="btn-button btn-sm ms-3" onClick={handleClose}>No</Button>
                    </div>
                </Modal.Body>
            </Modal>
            
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
                            <th className="text-center">Job Id</th>
                            <th className="text-center">Job Name</th>
                            <th className="text-center">Job Run By</th>
                            <th className="text-center">Company</th>
                            <th className="text-center">Start Time</th>
                            <th className="text-center">Completion Time</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Job Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobLists[0] === null || jobLists[0] === "" || jobLists[0] === undefined ?
                        (<></>):(<>
                        {jobLists.map((r,i) =>{
                            return(
                                <>
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
                            <td className="text-center">{r.id}</td>
                            <td className="text-center">Immutable record job</td>
                            <td className="text-center">{r.jobRunByUser}</td>
                            <td className="text-center">{r.companyCode}</td>
                            <td className="text-center">{r.runStartTime}</td>
                            <td className="text-center">{r.runCompletionTime}</td>
                            <td className="text-center">{r.status === "Y" ? "Completed" : "InProgress"}</td>
                            <td className="text-center">{r.jobType === "Yes" ? "Manual" : "Automatic"}</td>
                        </tr>
                                </>
                            )
                        })}
                        </>)}
                       
                      
                    </tbody>
                </Table>

                <Row className="mt-4">
                    <Col md={4} className="mb-md-0 mb-3">
                        {/* <Dropdown size="sm">
                            <Dropdown.Toggle variant="gray" id="dropdown-basic">
                                Select Rows
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-filter">
                                <Dropdown.Item href="#/action-1">100 Rows</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">500 Rows</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">1000 Rows</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </Col>
                    <Col md={8} className="d-flex justify-content-md-end justify-content-center">
                        <ul className="d-flex pagination list-unstyled">
                            <li>
                            <Link  className={StartValue !== 0 ? 'next' : StartValue === 0 ? 'prev disabled' : ''} onClick={()=>paginationProcess(StartValue-10,10)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                                </Link>
                            </li>
                            <li><Link className={StartValue === 0 ? 'active' : ''}  onClick={()=>paginationProcess(0,10)} >1</Link></li>
                            <li><Link className={StartValue === 10 ? 'active' : ''} onClick={()=>paginationProcess(10,10)}>2</Link></li>
                            <li><Link className={StartValue === 20? 'active' : ''} onClick={()=>paginationProcess(20,10)}>3</Link></li>
                            <li><Link className={StartValue === 30? 'active' : ''} onClick={()=>paginationProcess(30,10)}>4</Link></li>
                            <li><Link className={StartValue === 40? 'active' : ''} onClick={()=>paginationProcess(40,10)}>5</Link></li>
                            <li><Link className={StartValue === 50 ? 'active' : ''} onClick={()=>paginationProcess(50,10)}>6</Link></li>
                            <li>
                                <Link onClick={()=>paginationProcess(StartValue+10,10)} className={reachedLastPage ? 'prev disabled' : "next"}>
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

export default ImmutableRecordJobs;