import { Button, Col, Dropdown, Form, InputGroup, Modal, Row, Table,Badge } from "react-bootstrap";
import Eye from '../asserts/images/eye-icon.svg'
import Question from '../asserts/images/question-icon.svg'
import { Link,useNavigate } from "react-router-dom";
import Check from '../asserts/images/check_icon.svg'
import { useEffect, useState, useContext } from "react";
import { OrgAdminmailcheckget1, OrgTenentcheckget, DeleteOrgUser } from "../apifunction";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import {createUserVisits,getTicketsById,ResolveTicket,getTennantId,help1,jobreschedulardetail,jobschedulardetailpost,userDetailWithEmail,jobschedulardetailget,Jobstatusget,jobstatusupdate} from '../apifunction';
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout";
import ButtonLoad from 'react-bootstrap-button-loader';

function JobHandling() {
    const [disabled, setDisabled] = useState(true);
    const [search, setSearch] = useState(false);
    const[loader1, setLoader1] = useState(false);
    const[loader2, setLoader2] = useState(false);
    const[loader3, setLoader3] = useState(false);
    const[loader4, setLoader4] = useState(false);

    // const handleShowLoad = () => setLoader(true);
    // const handleHideLoad = () => setLoader(false);
    
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
        
        
        // setFilteredJobLists(filteredJobLists);
      };
      console.log("search",searchDetails)
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

      const showloader = async(type,status,show) =>{
        if(type === "DOC_FETCH"){
          if(status === 1){
            setLoader1(show);
            
          }
          else{
            setLoader2(show);
          }
        }
        else if(type === "MAKE_IREC"){
          if(status === 1){
            setLoader3(show);
          }
          else{
            setLoader4(show);
          }
        }
      }
    const Jobstatuschange = async (jobtype,statusjob) => {
        // handleShowLoad();
        await showloader(jobtype,statusjob,true);
        try{
            let tnId = await getTennantId();
            let recheduledjobstatus= await jobstatusupdate(tnId,jobtype,statusjob);
            await ticketTableFetch();
            
            
            toast.success("Status Changed Successfully");
            // await ticketTableFetch();
            setShowButton(!showButton);
            await showloader(jobtype,statusjob,false);
          // handleHideLoad();
            // window.location.reload();
        }catch(err){
            toast.error(err);
            await showloader(jobtype,statusjob,false);
            // handleHideLoad();
        }
        }
        useEffect(() => {
            console.log("milliseconds updated:", milliseconds);
          }, [milliseconds]);
const ticketlisting =async()=>{
    let r=[];
    let countlist=0;
    try {          
        let [check, data] = await Jobstatusget();
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
        let [check, data] = await Jobstatusget();
        if (check) {  
            setUserManage(data);
            console.log("datass",data);
      }
           
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
                    <h4 className="page-title mb-0">Job Status</h4>
                </Col>
            </Row>

            <Row className="mb-20" style={{minHeight: '40px'}}>
                
              
            </Row>

           
            
            <div className="mb-20">
                <Table hover responsive>
                    <thead>
                        <tr>
                         
                            <th className="text-center">Sl no</th>
                            <th className="text-center">Job Type</th>
                            <th className="text-center">Current Job Status</th>
                            <th className="text-center">Change Job Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {userManage[0] ? <>
                        <tr>
                                    
                                  
                                                                
                                   
                                  <td className="text-center">{1}</td>
                                  <td className="text-center">{userManage[0].jobType}</td>
                                  <td className="text-center">
                                        <Badge pill bg={userManage[0].jobstatus === 0 ? "danger" : "success"}> {userManage[0].jobstatus === 0 ? "Stopped" : "Started"}
                                        </Badge>    </td>           
                                                                                                        

                                        {userManage[0].jobstatus===0?(<>
                             
                                            <td className="text-center">  <ButtonLoad loading={loader1} className='w-50 btn-dark mb-3' onClick={()=>{Jobstatuschange("DOC_FETCH",1)}}>Start</ButtonLoad> </td>      
 
                          </>):(<>
                            <td className="text-center">  <ButtonLoad loading={loader2} className='w-50 btn-dark mb-3' onClick={()=>{Jobstatuschange("DOC_FETCH",0)}}>Stop</ButtonLoad> </td>      

                          </>)}
                             
                               
                                  </tr>
                   
                                  <tr>
                                    
                                                               
                                   
                                  <td className="text-center">{2}</td>
                                  <td className="text-center">{userManage[1].jobType}</td>
                                  <td className="text-center">
                                        <Badge pill bg={userManage[1].jobstatus === 0 ? "danger" : "success"}> {userManage[1].jobstatus === 0 ? "Stopped" : "Started"}
                                        </Badge>    </td>           
                                                                                                        


                             {userManage[1].jobstatus===0?(<>
                             
                                <td className="text-center">  <ButtonLoad loading={loader3} className='w-50 btn-dark mb-3' onClick={()=>{Jobstatuschange("MAKE_IREC",1)}}>Start</ButtonLoad> </td>      
    
                             </>):(<>
                                <td className="text-center">  <ButtonLoad loading={loader4} className='w-50 btn-dark mb-3' onClick={()=>{Jobstatuschange("MAKE_IREC",0)}}>Stop</ButtonLoad> </td>      

                             </>)}
                                  {/* <td className="text-center">{x.assignee === null ? <> <Button variant="outline-gray" className="me-2 btn-outline-gray-black" onClick={() => attend(x.id, x.mailId)}>Attend</Button></>:<> {x.assignee} </>}</td> */}

                                  {/* <td>{x.networkName}</td> */}
                                  </tr>
                                  
                           </> : <> 
                                            
          </>}
                        
                    </tbody>
                </Table>

                <Row className="mt-4">
                   
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

export default JobHandling;