import React,{useState,useEffect,useContext} from 'react';
import Layout from "./Snippets/Layout";
import OuterRoundProgressBar from './HealthProgressBar';
import { OrgAdminmailcheckget, getJobsCountByType, getLatestJObTime, getTennantId,getoriginaldoccount,jobschedulardetailget,joblasttime,userDetailWithEmail,jobreschedulardetail } from '../apifunction';
import { Card, Col, Row, Modal, Button, Dropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout";
import "./HealthCheck.css";
import ButtonLoad from 'react-bootstrap-button-loader';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Question from '../asserts/images/question-icon.svg'

const JobSchedule = (props) => {
    useEffect(() => {
        document.title = "Sigma | Health Checkup"
    }, [])

    const navigate = useNavigate();
    const[fjob,setfjob]=useState("");
    const[sjob,setsjob]=useState("");
    const[epochTimeState, setEpochTimeState] = useState("");
    const [documentsUploadedCount, setDocumentsUploadedCount] = useState(0); // State for documents uploaded
    const [nftsCreatedCount, setNftsCreatedCount] = useState(0); 
    const [remainingTime, setRemainingTime] = useState('');
    const [vvdocumentcount, setvvDocumentcount] = useState(null);
    const [vvDocumentCount, setVvDocumentCount] = useState(null);
    const [countsFetched, setCountsFetched] = useState(false);
    const [sigmaDocumentCount, setsigmadocCount] = useState(null);
    const[loaderVerify, setLoaderVerify] = useState(false);
    const [jobtime, setjobtime] = useState(86400);

    const [showButton, setShowButton] = useState(false);
    const [milliseconds, setMilliseconds] = useState(0);
    const [show, setShow] = useState(false);
    const [selectedHours, setSelectedHours] = useState(0);  
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShowLoadVerify = () => setLoaderVerify(true);
    const handleHideLoadVerify = () => setLoaderVerify(false);
    console.log("timer", epochTimeState);
    const history = useNavigate();


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
    const handleVerifyCounts = async () => {
      try {
        handleShowLoadVerify();
        await fetchjobcount();
        await getvvdoccount();
        setCountsFetched(true);
        handleHideLoadVerify();
      } catch (error) {
        console.error("Error verifying counts:", error);
        handleHideLoadVerify();
      }
    };
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
    const fetchjobcount = async() =>{
        let firstjob = await getJobsCountByType("DOC_FETCH");
        let secondjob = await getJobsCountByType("MAKE_IREC");
        let lasttimejobrunned = await getLatestJObTime();
        let lasttimejobrunned1 = await joblasttime();
        setjobtime(lasttimejobrunned1[0].activity);
        console.log("docssigmacount11", lasttimejobrunned1[0]);
        console.log("docssigmacount1", lasttimejobrunned1[0].loginTime);
        setfjob(firstjob);
        setsjob(secondjob);
        let tnId = await getTennantId();
        let [check, data2] = await OrgAdminmailcheckget(tnId);
        console.log("OrgAdminmailcheckget", lasttimejobrunned)
        const utcDate = new Date(lasttimejobrunned1[0].loginTime);
    const istDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
   
    console.log("datechecker", lasttimejobrunned1[0].loginTime,istDate);

        setEpochTimeState(timestampToEpoch(istDate));
        console.log("OrgAdminmailcheckget1", epochTimeState)
        if (check) {
            const nonnftdocs = data2.reduce((total, record) => total + record.rawDocs, 0);
            setDocumentsUploadedCount(nonnftdocs);
            
            const totalNftsCreatedCount = data2.reduce((total, record) => total + record.iRecDocs, 0);
            setNftsCreatedCount(totalNftsCreatedCount);
          }

    }
    const getvvdoccount = async () => {
      try {
        
        let tnId = await getTennantId();
        const vvdoccount = await getoriginaldoccount(tnId);
        let firstjob = await getJobsCountByType("DOC_FETCH");
        // setsigmadocCount(parseInt(documentsUploadedCount + nftsCreatedCount));
        setVvDocumentCount(vvdoccount.totalcount); // Update vvDocumentCount state
        console.log("docscounts", vvdoccount.totalcount);
        console.log("docssigmacount", sigmaDocumentCount);
      } catch (error) {
        console.error("Error fetching vvdoccount:", error);
      }
    };

    const calculatePercentageDifference = (num1, num2) => { 
      if (isNaN(num1) || isNaN(num2)) {
        return 0;
      }
  
      const difference = num2 - num1;
      const percentageDifference = Math.abs((difference / Math.abs(num1)) * 100);
      if(percentageDifference>0){
      let percentage = parseInt(percentageDifference);
      return percentage;
       }
       else{
        return 0;
      }
    };

    useEffect(() => {
        fetchjobcount()
    }, [])

    function timestampToEpoch(timestamp) {
      const epochTime = parseInt(new Date(timestamp).getTime() / 1000); // Divide by 1000 to convert to seconds
      console.log("checkepo",epochTime +19800);
      return (epochTime+19800);
    }

    // const Timer = () => {
    //   useEffect(() => {
    //     const interval = setInterval(() => {
    //       const now = Math.floor(Date.now() / 1000);
    //       const difference = (epochTimeState + 86400) - now;
    //          console.log("checkdate",epochTimeState)
    //       if (difference <= 0) {
    //         setRemainingTime('00:00:00:00');
    //         clearInterval(interval);
    //       } else {
    //         const days = Math.floor(difference / 86400);
    //         const hours = Math.floor((difference % 86400) / 3600);
    //         const minutes = Math.floor((difference % 3600) / 60);
    //         const seconds = Math.floor(difference % 60);
    
    //         const formattedTime = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes
    //           .toString()
    //           .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    //         setRemainingTime(formattedTime);
    //       }
    //     }, 1000);
    
    //     return () => {
    //       clearInterval(interval);
    //     };
    //   }, [epochTimeState]);
    
    //   return remainingTime;
    // };
    const Timer = () => {
      useEffect(() => {
        const interval = setInterval(() => {
          const now = Math.floor(Date.now() / 1000);
          const difference = (epochTimeState + (jobtime*3600)) - now;
  console.log("differ",difference);
          if (difference <= 0) {
            setRemainingTime('00:00:00:00');
            clearInterval(interval);
          } else {
            const days = Math.floor(difference / 86400);
            const hours = Math.floor((difference % 86400) / 3600);
            const minutes = Math.floor((difference % 3600) / 60);
            const seconds = Math.floor(difference % 60);
  
            const formattedTime = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes
              .toString()
              .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
            setRemainingTime(formattedTime);
          }
        }, 1000);
  
        return () => {
          clearInterval(interval);
        };
      }, [epochTimeState]);
  
      return (
        <h3 className='digital-clock px-3 py-2'>{remainingTime}</h3>
      );
    };
  
    const renderDifferenceBadge = (difference) => {
      let badgeClass = "";
      let badgeText = "";
    
      if (difference === 0) {
        badgeClass = "badge bg-success";
        badgeText = "No Difference";
      } else if (difference > 0 && difference <= 100) {
        badgeClass = "badge bg-warning";
        badgeText = "Slightly Differ and the Difference is ";
      } else if (difference > 100) {
        badgeClass = "badge bg-danger";
        badgeText = "Highly  Differ and the Difference is";
      }
    
      return (
        <span className={badgeClass} style={{ fontSize:"15px" }}>
          {badgeText} &nbsp; <span style={{ fontWeight: "bold" }}>{difference}</span>
        </span>
      );
        };
    // const renderCountInfo = () => {
    //   if (countsFetched) {
    //     return (
    //       <div>
    //         {/* ... (existing count info rendering) */}
    //         <p><b>vvDocument Count:</b> {vvdocumentcount}</p>
    //       </div>
    //     );
    //   } else {
    //     return <p>Click the button to verify counts.</p>;
    //   }
    // };

    const handleSelecthours = (selectedValue) => {
        setSelectedHours(selectedValue);
        console.log("selectedValue",selectedValue);
        setMilliseconds(selectedValue * 3600000);
        console.log("hoursvalue",milliseconds);
        //  setMilliseconds(selectedValue * 3600000);
        //  console.log("hoursvalue",milliseconds);
        handleShow(); // Update the selected value when an item is clicked
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
  
    useEffect(() => {
      fetchjobcount();
      getvvdoccount();
    }, []);
  return (
    <Layout getThemeMode={() => undefined} roleType = {props.roleType} getIProfile = {props.getIProfile}>
    <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
    <div className="container-fluid">
      <h3 style={{ marginBottom: '30px' }}>Job Scheduler</h3>
      <div className="">
        <div className="row justify-content-center">
          {/* <div className="col-md-4 mb-4">
            <Card className="shadow border-0 h-100">
              <Card.Body className="p-lg-4 p-md-3 p-3">
                <h4 className="card-title">Document Health</h4>
                <div className="progress-content pt-3">
                  <Row className="align-items-center">
                    <Col xs={6}>
                      <OuterRoundProgressBar value={documentsUploadedCount ? calculatePercentageDifference(documentsUploadedCount + nftsCreatedCount, documentsUploadedCount) : "0"} />
                    </Col>
                    <Col xs={6}>
                      <div className="additional-info">
                        <p><b>Total Documents Fetched:</b> {documentsUploadedCount + nftsCreatedCount}</p>
                        <p><b>Total Documents to be Uploaded:</b> {documentsUploadedCount}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-4 mb-4">
          <Card className="shadow border-0 h-100">
              <Card.Body className="p-lg-4 p-md-3 p-3">
                <h4 className="card-title">Documents NFT Health</h4>
                <div className="progress-content pt-3">
                  <Row className="align-items-center">
                    <Col xs={6}>
                      <OuterRoundProgressBar value={documentsUploadedCount === 0|| documentsUploadedCount === "0" ||documentsUploadedCount === undefined || documentsUploadedCount === null||documentsUploadedCount === "undefined"? "0":calculatePercentageDifference(nftsCreatedCount, documentsUploadedCount)} />
                    </Col>
                    <Col xs={6}>
                      <div className="additional-info">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;<b>With NFT:</b> {nftsCreatedCount}</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;<b>Without NFT:</b> {documentsUploadedCount}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </div> */}

          {/* <div className="col-md-4 mb-4">
            <Card className="shadow border-0 h-100">
              <Card.Body className="p-lg-4 p-md-3 p-3">
                <h4 className="card-title">Job Health</h4>
                <div className="progress-content pt-3">
                <Row className="align-items-center">
                    <Col xs={6}>
                      <OuterRoundProgressBar value={fjob ?calculatePercentageDifference(fjob, sjob):"0"} />
                    </Col>
                    <Col xs={6}>
                      <div className="additional-info">
                        <p><b>Document Fetched:</b> {fjob}</p>
                        <p><b>NFT Created:</b> {sjob}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </div> */}
          <Row className="mb-20" style={{minHeight: '40px'}}>
                  <Col xs={12} className="ms-md-0 d-flex align-items-center justify-content-end ms-auto order-md-1">
                <Dropdown size="sm">
                        <Dropdown.Toggle variant="gray" id="dropdown-basic">
                             Job Runtime Reschedule
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-filter">
                        <Dropdown.Item onClick={() => handleSelecthours("6")}>6 hours</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelecthours("12")}>12 hours</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelecthours("18")}>18 hours</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelecthours("24")}>24 hours</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                  </Row>
                
                
          <div className="col-md-4 mb-4">
          <Card className="shadow border-0 h-100">
              <Card.Body className="p-lg-4 p-md-3 p-3">
              <h4 className="card-title text-center mb-4">Timer Until Next Job</h4>
                  <div className="progress-content justify-content-center pt-3">
                  
                  
                  {/* <Row className="align-items-center">
                    <Col xs={12}> */}
                      {/* <OuterRoundPercentageBar value={remainingTime} /> */}
                    {/* </Col>
                  </Row> */}
                <Timer />
                </div>
              </Card.Body>
            </Card>
          </div>

          <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="text-center py-5">
          <img src={Question} className="mb-2" alt="Question" />
          <h6>Are you sure you want to reschedule JobRun time to {selectedHours} hours ?</h6>

          <div className="d-flex pt-4 align-items-center justify-content-center">
            <Button type="submit" variant="dark" className="btn-button btn-sm"  onClick={()=>Jobtimechange()}>
              Yes
            </Button>
            <Button type="reset" variant="outline-dark" className="btn-button btn-sm ms-3" onClick={handleClose}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
         
{/* <div className="col-md-4 mb-4">
  <Card className="shadow border-0 h-100">
    <Card.Body className="p-lg-4 p-md-3 p-3">
    <h4 className="card-title text-center mb-4"></h4>
      <div className="progress-content justify-content-center pt-3">
        {countsFetched ? null : (
          <ButtonLoad loading={loaderVerify} variant="gray" className="btn-gray-black me-2 mb-1 px-3" onClick={handleVerifyCounts}>
            Docs Counts Check
          </ButtonLoad>
        )}
      </div>
      {countsFetched ? (
        <div className="card-title text-center mb-4 pt-3">
           <h5 className=" text-center mb-4"> Document in Veeva:{vvDocumentCount}</h5>
           <h5 className=" text-center mb-4">Document in Sigma:{(documentsUploadedCount + nftsCreatedCount)}</h5>
          {renderDifferenceBadge(Math.abs(vvDocumentCount - (documentsUploadedCount + nftsCreatedCount)))}
        </div>
      ) : (
        <h6 className="card-title text-center mb-4"></h6>
      )}
    </Card.Body>
  </Card>
</div> */}
         
    </div>
      </div>



     
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
};

export default JobSchedule;
