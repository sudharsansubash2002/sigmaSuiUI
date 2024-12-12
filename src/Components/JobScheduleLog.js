import { Button, Col, Dropdown, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import Eye from '../asserts/images/eye-icon.svg'
import Question from '../asserts/images/question-icon.svg'
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { OrgAdminmailcheckget1, OrgTenentcheckget, DeleteOrgUser } from "../apifunction";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import {createUserVisits,getTicketsById,ResolveTicket,getTennantId,help1,jobreschedulardetail,jobschedulardetailpost,userDetailWithEmail,jobschedulardetailget} from '../apifunction';
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout";

function JobScheduleLog() {
    const [disabled, setDisabled] = useState(true);
    const [search, setSearch] = useState(false);
    const [show, setShow] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [ticketlistTable, setticketlistTable] = useState([]);
    const [sendEmail, setSendEmail] = useState();
    const [idofuser, setid] = useState();
    const [gotValue, setGotValue] = useState(false);
    const [startvalue, setstartvalue] = useState(0);
    const [selectedHours, setSelectedHours] = useState(0);  
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const[pageBLSize,setPageBLSize] = useState(8);  
    const [rowSize, setRowSize] = useState();   
    const [filterstatus, setFilterStatus] = useState("");   
    const [searchQuery, setSearchQuery] = useState(false);
    const [searchDetails, setsearchDetails] = useState([]);
    const [userManage, setUserManage] = useState([""]);
    const [milliseconds, setMilliseconds] = useState(0);
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
   const handleSelecthours = (selectedValue) => {
    setSelectedHours(selectedValue);
    console.log("selectedValue",selectedValue);
    setMilliseconds(selectedValue * 3600000);
    console.log("hoursvalue",milliseconds);
    //  setMilliseconds(selectedValue * 3600000);
    //  console.log("hoursvalue",milliseconds);
    handleShow(); // Update the selected value when an item is clicked
  };
   
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

    const decrementBLSize=()=>{
      if(pageBLSize >= 4){
      setPageBLSize(pageBLSize-2)
      }        
    }
    const handleSearch = (searchQuer) => {
        if(searchQuer === null || searchQuer === "" || searchQuer === undefined || searchQuer === "null"){
            setSearchQuery(false)
        }
        else{
            setSearchQuery(true)
            const filteredJobLists = userManage.filter((r) =>
              r.mailId.toLowerCase().includes(searchQuer.toLowerCase())
            );
            setsearchDetails(filteredJobLists);
        }
        
        // console.log("search",filteredJobLists)
        // setFilteredJobLists(filteredJobLists);
      };
      const handleFilter = (searchQuer) => {
        if(searchQuer === null || searchQuer === "" || searchQuer === undefined || searchQuer === "null"){
            setSearchQuery(false)
        }
        else{
            setSearchQuery(true)
            const filteredJobLists = userManage.filter((r) =>
          
             r.statuses===searchQuer
            );
            setsearchDetails(filteredJobLists);
        }
        
        // console.log("search",filteredJobLists)
        // setFilteredJobLists(filteredJobLists);
      };
    const Jobtimechange = async () => {
        try{
            let tnId = await getTennantId();
            let [value, data] = await userDetailWithEmail(localStorage.getItem("UserID"));
            console.log("app.js role", (data[0]).roleType);
            console.log("hoursvalue1", milliseconds);
            let recheduledtime=await jobreschedulardetail(milliseconds,localStorage.getItem("UserID"),(data[0]).roleType,tnId,selectedHours);    
                    
            console.log("recheduledtime",recheduledtime);
            console.log("hoursvalue2", milliseconds);
            
            // let Jobrecheduleruser=await jobschedulardetailpost();    
            // console.log("Jobrecheduleruser",Jobrecheduleruser);
            toast.success("Rescheduled  successfully");
            // await ticketTableFetch();
            setShowButton(!showButton);
            handleClose();
            // window.location.reload();
        }catch(err){
            toast.error(err);
        }
        }
        useEffect(() => {
            console.log("milliseconds updated:", milliseconds);
          }, [milliseconds]);
const ticketlisting =async()=>{
    let r=[];
    let countlist=0;
    try {          
        let [check, data] = await jobschedulardetailget();
        if (check) {  
            setUserManage(data);
      }
        // settenentid(tenentid.tenantId);
        console.log("ticket",data);
               
      } catch (error) {  
        console.error(error);            

      }
}
useEffect(() => {
    console.log("checkdataget updated:", userManage);
  }, [userManage]);
    const ticketTableFetch=async()=>{            
        if(localStorage.getItem("UserID")  === null || localStorage.getItem("UserID")  === "" || localStorage.getItem("UserID")  === " " || localStorage.getItem("UserID") === undefined || localStorage.getItem("UserID") === ''){
       
        }
        else{
          let r=[];
          let countlist=0;
      try {          
        let [check, data] = await jobschedulardetailget();
        if (check) {  
            setUserManage(data);
      }
        // // settenentid(tenentid.tenantId);
        // console.log("ticket",data);
        // //   let [checking, data] = await OrgTenentcheckget(ticket.tennantId);
        
        //   console.log("Length", data);     
        //   if (data) {  
        //       try{
        //       let datavar=data;
        //       console.log("datascheck13",datavar);
             
        //       Object.keys(datavar).map((m)=>{
        //         console.log("datascheck15",datavar[m]);
                
        //         countlist=countlist + 1;
        //     //    if(datavar[m].tennantId === tenentid.tennantId && datavar[m].roleType != "Super User" && datavar[m].roleType != "System Admin" && datavar[m].roleType != "Business Admin")
        //             r.push({
        //                 id:datavar[m].id,
        //                 ticket:datavar[m].ticket,
        //                 descriptions:datavar[m].descriptions,
        //                 firstName:datavar[m].firstName,
        //                 lastName:datavar[m].lastName,
        //                 mailId:datavar[m].mailId,
        //                 ticketRaisetime:datavar[m].ticketRaisetime,
        //                 statuses:datavar[m].statuses,
        //             })    
                
                
                             
        //       })  
        //   }   catch(e){                      
        //   } 
        // //   r.reverse();
        // setticketlistTable(r);      
        // if(r)
        // {
        //     setGotValue(!gotValue)
        // }          
        //   }
        //   else{
        //     setticketlistTable([""]);  
        //   }
        //   console.log("Data", data);
          //setpagesCountlist(countlist);        
      } catch (error) {   
        console.error(error);        
      }                
      
    }
      }

useEffect(() => {
    if(gotValue === false)
    ticketTableFetch();
},[ticketlistTable])

      useEffect(() => {
        userdata();
      }, []);
      
      const userdata = async () => {
        let algoAddress = localStorage.getItem("UserID");
        let networkType = "type";
        let walletType = "User-Management";
      
        try {
          await createUserVisits(algoAddress, networkType, walletType);
          console.log("Update successful1");
        } catch (error) {
          console.error("Error updating:", error);
        }
      };

const checkedTicketButton = (email,id) =>
{
    setSendEmail(email);
    setid(id);
    setShowButton(!showButton);
    console.log("emailsend",email,id)
}
const paginationProcess = async(start) =>{
    setstartvalue(start);
    await ticketlisting(start);
}
const attend = async (id, email) => {
    await help1(id, email, localStorage.getItem("UserName"));
    await ticketTableFetch();
}

    return ( 
        <div>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
            <Row className="mb-20">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">Job Schedule Log</h4>
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

                                    
                                </div>
                            </th> */}
                            {/* <th className="text-center">Checkbox</th> */}
                            <th className="text-center">Sl no</th>
                            {/* <th className="text-center">First Name</th>
                            <th className="text-center">Last Name</th> */}
                            <th className="text-center">Email Id</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Rescheduled Date</th>
                            <th className="text-center">Rescheduled Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    {searchQuery ? <>
                       
                    {searchDetails.map((x,y)=>{                           
                              return(
                                  <tr>
                                    
                                  
                                    <td width="84">
                                        {/* <div className="d-flex justify-content-center">
                                            <Form.Check
                                                className="mb-0 check-single"
                                                type='checkbox'
                                                id= "checked"
                                                onClick={() => checkedTicketButton(x.mailId,x.id)}
                                            />
                                        </div> */}
                                    </td>                                  
                                   
                                  <td className="text-center">{y+1}</td>
                                  <td className="text-center">{x.mailId}</td>
                                  <td className="text-center">{x.roleType}</td>
                                  <td className="text-center">{x.loginTime}</td>
                                  <td className="text-center">{x.activity}hours</td>
                                  {/* <td className="text-center">{x.statuses?<>Resolved</>:<>Pending</>}</td> */}
                                  {/* <td className="text-center">{showButton && sendEmail === x.mailId && id === x.id ? assignee : null}</td> */}
                                  {/* <td className="text-center">{x.assignee === null ? <> <Button variant="outline-gray" className="me-2 btn-outline-gray-black" onClick={() => attend(x.id, x.mailId)}>Attend</Button></>:<> {x.assignee} </>}</td> */}
                                  {/* <td>  <ButtonLoad loading={loader} className='w-100 btn-blue mb-3' onClick={()=>{Deleteorguser(x.emailId)}}>Delete user</ButtonLoad> </td>       */}

                                  {/* <td>{x.networkName}</td> */}
                                  </tr>


                              )
                              })
                              }
                           </> : <>  {userManage.map((x,y)=>{
                           
                                 return(
                                <tr>
                                  
                                
                                  {/* <td width="84">
                                      <div className="d-flex justify-content-center">
                                          <Form.Check
                                              className="mb-0 check-single"
                                              type='checkbox'
                                              id= "checked"
                                              onClick={() => checkedTicketButton(x.mailId,x.id)}
                                          />
                                      </div>
                                  </td>                                   */}
                               
                               <td className="text-center">{y+1}</td>
                                  <td className="text-center">{x.mailId}</td>
                                  <td className="text-center">{x.roleType}</td>
                                  <td className="text-center">{x.loginTime}</td>
                                  <td className="text-center">{x.activity} hours</td>


                                {/* <td>  <ButtonLoad loading={loader} className='w-100 btn-blue mb-3' onClick={()=>{Deleteorguser(x.emailId)}}>Delete user</ButtonLoad> </td>       */}

                                {/* <td>{x.networkName}</td> */}
                                </tr>
                            )
                        })
                    }                    
          </>}
                        {/* <tr>
                            <td width="84">
                                <div className="d-flex justify-content-end">
                                    <Form.Check
                                        className="mb-0 check-single"
                                        type='checkbox'
                                        id={`default-9`}
                                    />
                                </div>
                            </td>
                            <td className="text-center">17323</td>
                            <td className="text-center">Resource persist job</td>
                            <td className="text-center">Queen_Admin</td>
                            <td className="text-center">King</td>
                        </tr> */}
                    </tbody>
                </Table>

                <Row className="mt-4">
                    {/* <Col md={4} className="mb-md-0 mb-3">
                        <Dropdown size="sm">
                            <Dropdown.Toggle variant="gray" id="dropdown-basic">
                               Status
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-filter">
                             <Dropdown.Item onClick={()=>handleFilter("")}>All</Dropdown.Item>
                                <Dropdown.Item onClick={()=>handleFilter(true)}>Resolved</Dropdown.Item>
                                <Dropdown.Item onClick={()=>handleFilter(false)}>Pending</Dropdown.Item>
                               
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col> */}
                    {/* <Col md={8} className="d-flex justify-content-md-end justify-content-center">
                        <ul className="d-flex pagination list-unstyled">
                            <li>
                                <Link className={startvalue !== 0 ? 'next' : startvalue === 0 ? 'prev disabled' : ''} onClick={()=>{paginationProcess(startvalue-10)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                                </Link>
                            </li>
                             <li><Link className="active" onClick={()=>{paginationProcess(startvalue+10)}}>{startvalue?(startvalue/10)+1:'1'}</Link></li>
                         
                            <li>
                                <Link className="next" onClick={()=>{paginationProcess(startvalue+10)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </Col> */}
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

export default JobScheduleLog;