import { Button, Col, Dropdown, Row, Tab, Tabs } from "react-bootstrap";
import Avatar from "../../asserts/images/avartar.png"
import { Link,useHistory,useNavigate,Redirect,Navigate} from 'react-router-dom';

import LogoutIcon from "../../asserts/images/logout-icon.svg"
import React, { useEffect,useState, useMemo } from 'react'
import {userprofileget,Sessionstatusget,Sessionstatusupdate, getNotificationById, NotificationSingle, NotificationAll} from '../../apifunction';
function ProfileHeader() {
    const[getIProfile,setgetIProfile]=useState("");  
    const [loginstatus, setLoginstatus] = useState("")
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
    const [allNotification, setAllNotification] = useState([]);
    const navigate = useNavigate()
    const getprofiledetails = async() =>{
        let [data,userprofiledetail]=await userprofileget(localStorage.getItem("UserID"));
        setgetIProfile(userprofiledetail);
        console.log("userdetail1",userprofiledetail,userprofiledetail.emailId);
        console.log("userdetail11",getIProfile.emailId,getIProfile.firstName);
       }
       useEffect(()=>{
        if(!getIProfile)
        getprofiledetails()
        })
       const Logout = async () =>
       {  
           console.log("Logtime12",currentDateTime);
           let email=localStorage.getItem('UserID')
           console.log("emailid",email)
           let [checklogin,loginstauscheck] = await  Sessionstatusget(email);
          setLoginstatus(loginstauscheck);
          console.log("logincheck",loginstatus);
          let sessionlogin= await Sessionstatusupdate("","","Logout",email);
          console.log("sessionstatus",sessionlogin);
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
         navigate('/');
       }

       const notification = async () => {
        try{
        let [value, allNotificationFetch] = await getNotificationById(localStorage.getItem("UserID"));
        if(value)
        {
            let r=[];
            let countlist = 0;
            console.log("notification", allNotificationFetch);
            if (allNotificationFetch) {  
                try{
                let datavar = allNotificationFetch;
                // console.log("datascheck13", datavar);
               
                Object.keys(datavar).map((m)=>{
                  console.log("datascheck15",datavar[m]);
                  countlist = countlist + 1;
                //  if(datavar[m].tennantId === tenentid.tennantId && datavar[m].roleType != "Super User" && datavar[m].roleType != "System Admin" && datavar[m].roleType != "Business Admin")
                      r.push({
                        id:datavar[m].id,
                        title:datavar[m].title,
                        mailId:datavar[m].mailId,
                        descriptions:datavar[m].descriptions,
                        epochtime:datavar[m].epochtime,
                        statuses:datavar[m].statuses,
                      })    
                  
                  
                               
                })  
            }   catch(e){                      
            } 
            r.reverse();
            setAllNotification(r);               
            }
            else{
                setAllNotification([""]);  
            }
        }
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        if(allNotification.length === 0)
        notification();
    })

    const singleRead = async (id, mailid, status) => {
        try{
            await NotificationSingle(id, mailid, status);
            await notification();
        }catch(err){
            console.error(err);
        }
    }

    const allRead = async (mailid) => {
        try{
            await NotificationAll(mailid);
            await notification();
        }catch(err){
            console.error(err);
        }
    } 

       function getDayAndTime(epoch) {
        // Convert epoch to milliseconds
        const timestamp = epoch * 1000;
      
        // Create a new Date object using the timestamp
        const date = new Date(timestamp);
      
        // Get the day of the week
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[date.getDay()];
      
        // Get the hours and minutes
        let hours = date.getHours();
        const minutes = date.getMinutes();
      
        // Convert hours to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
      
        // Return the formatted day and time
        return `${day} ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      }

      function getMonthDateYear(epoch) {
        // Convert epoch to milliseconds
        const timestamp = epoch * 1000;
      
        // Create a new Date object using the timestamp
        const date = new Date(timestamp);
      
        // Get the month, date, and year
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
      
        // Return the formatted month, date, and year
        return `${month} ${day}, ${year}`;
      }

    return ( 
        <header className="app-header">
            <div className="container-fluid">
                <Row className="align-items-center justify-content-between">
                    <Col xs={12} className="d-flex align-items-center">
                        <Link to="/" className="d-inline-block me-auto btn-back align-items-center"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            Back to Dashboard
                        </Link>

                        <Dropdown className="dropdown-bell" align={"end"} autoClose="outside">
                            <Dropdown.Toggle variant="bell" className="shadow border-0" id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="d-block" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                </svg>
                            </Dropdown.Toggle> 

                            <Dropdown.Menu className="shadow-md">
                                <div className="dropdown-bell-body">
                                    <h3 className="mb-0">Notifications</h3>

                                    <Tabs
                                        defaultActiveKey="all"
                                        id="uncontrolled-tab-example"
                                    >
                                    <Tab eventKey="all" title="All">
                                            {allNotification.map((x, y)=>{
                                                return(
                                                    <>
                                                        <div onClick={() => singleRead(x.id, x.mailId, x.statuses)} className = {(x.statuses ? 'd-flex notify read' : 'd-flex notify unread notification_unread')}>
                                                        {getIProfile.profilePic === null || getIProfile.profilePic === "" || getIProfile.profilePic === undefined ?(<>
                                    <img src={Avatar}  alt="Avatar" />
                                
                                </>):(<>
                                
                                    <img src={getIProfile.profilePic}  alt="Avatar" />
                                </>)}
                                                            <div>
                                                                <bold><h6>{x.title}</h6></bold>
                                                                <p>{x.descriptions}</p>
                                                                <p className="d-flex justify-content-between"><strong>{getDayAndTime(x.epochtime)}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>{getMonthDateYear(x.epochtime)}</strong></p>
                                                            </div>
                                                        </div>
                                                    </>
                                            )})}
                                    </Tab>
                                    <Tab eventKey="unread" title="Unread">
                                    {allNotification.map((x, y)=>{
                                        if(x.statuses === false)
                                                return(
                                                    <>
                                                        <div onClick={() => singleRead(x.id, x.mailId, x.statuses)} className = {(x.statuses ? 'd-flex notify read' : 'd-flex notify unread notification_unread')}>
                                                        {getIProfile.profilePic === null || getIProfile.profilePic === "" || getIProfile.profilePic === undefined ?(<>
                                    <img src={Avatar}  alt="Avatar" />
                                
                                </>):(<>
                                
                                    <img src={getIProfile.profilePic}  alt="Avatar" />
                                </>)}
                                                            <div>
                                                                <bold><h6>{x.title}</h6></bold>
                                                                <p>{x.descriptions}</p>
                                                                <p className="d-flex justify-content-between"><strong>{getDayAndTime(x.epochtime)}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>{getMonthDateYear(x.epochtime)}</strong></p>
                                                            </div>
                                                        </div>
                                                    </>
                                            )})}
                                    </Tab>
                                    <Tab eventKey="read" title="Read">
                                    {allNotification.map((x, y)=>{
                                        if(x.statuses === true)
                                                return(
                                                    <>
                                                        <div onClick={() => singleRead(x.id, x.mailId, x.statuses)} className = {(x.statuses ? 'd-flex notify read' : 'd-flex notify unread notification_unread')}>
                                                        {getIProfile.profilePic === null || getIProfile.profilePic === "" || getIProfile.profilePic === undefined ?(<>
                                    <img src={Avatar}  alt="Avatar" />
                                
                                </>):(<>
                                
                                    <img src={getIProfile.profilePic}  alt="Avatar" />
                                </>)}
                                                            <div>
                                                                <bold><h6>{x.title}</h6></bold>
                                                                <p>{x.descriptions}</p>
                                                                <p className="d-flex justify-content-between"><strong>{getDayAndTime(x.epochtime)}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>{getMonthDateYear(x.epochtime)}</strong></p>
                                                            </div>
                                                        </div>
                                                    </>
                                            )})}
                                    </Tab>
                                    </Tabs>
                                </div>
                                <div className="dropdown-bell-footer d-flex align-items-center justify-content-between">
                                    <Button onClick={() => allRead(localStorage.getItem("UserID"))} variant="dark" className="btn-button btn-sm">Mark all as read</Button>
                                    {/* <Button variant="link" className="p-0">View all notifications</Button> */}
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown align={"end"} autoClose="outside">
                            <Dropdown.Toggle variant="ava" className="avatar p-0 border-0 d-flex align-items-center" id="dropdown-basic">
                                <strong className="d-none d-md-block">{localStorage.getItem("UserName")===""||localStorage.getItem("UserName")===null||localStorage.getItem("UserName")===undefined || !localStorage.getItem("UserName")? "UserName":localStorage.getItem("UserName")}</strong>
                                {getIProfile.profilePic === null || getIProfile.profilePic === "" || getIProfile.profilePic === undefined ?(<>
                                    <img src={Avatar} className="shadow" alt="Avatar" />
                                
                                </>):(<>
                                
                                    <img src={getIProfile.profilePic} className="shadow" alt="Avatar" />
                                </>)}

                               
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-avatar px-3">
                                <div className="d-flex py-3 border-bottom">
                                    {/* <img src={Avatar} alt="Avatar" /> */}
                                    {getIProfile.profilePic === null || getIProfile.profilePic === "" || getIProfile.profilePic === undefined ?(<>
                                    <img src={Avatar} className="shadow" alt="Avatar" />
                                
                                </>):(<>
                                
                                    <img src={getIProfile.profilePic}  alt="Avatar" />
                                </>)}


                                    <div className="d-flex flex-column justify-content-between">
                                        <h6>{localStorage.getItem("UserName")===""||localStorage.getItem("UserName")===null||localStorage.getItem("UserName")===undefined || !localStorage.getItem("UserName")? "UserName":localStorage.getItem("UserName")}</h6>
                                        <p>{localStorage.getItem("UserID")===""||localStorage.getItem("UserID")===null||localStorage.getItem("UserID")===undefined || !localStorage.getItem("UserID")? "Email":localStorage.getItem("UserID")}</p>
                                    </div>
                                </div>
                                <div className="py-2 d-flex align-items-center justify-content-between">
                                    <Link to="/account" className="btn-link">My Account</Link>
                                    <Button variant="logout" onClick={()=>{Logout()}}><img src={LogoutIcon} alt="LogoutIcon" /> Sign Out</Button>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
        </header>
     );
}

export default ProfileHeader;