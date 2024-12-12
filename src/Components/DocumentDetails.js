import { Button, Col, Dropdown, Form, InputGroup, Row, Table } from "react-bootstrap";
import Eye from '../asserts/images/eye-icon.svg'
import React, { useState, useEffect } from 'react';
import { Link,useNavigate,Redirect, useLocation } from "react-router-dom";
import Favourite from "./Snippets/Fav";
import verify from '../asserts/images/compliant.png'
import arrow from '../asserts/images/up-right-arrow.png'
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout";
import { useContext } from "react"
import { Container, Modal } from "react-bootstrap";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { fetchSigmadocByTid,fetchSigmadocdetails,addToFavorites,deleteFavorite, getTennantId,NotificationPost,getNotificationById,handleWriteToDocumentlist} from '../apifunction';
import ButtonLoad from 'react-bootstrap-button-loader';

function DocumentDetails() {
    const history = useNavigate()
    const [search, setSearch] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [postDetails, setPostDetails] = useState([]);
    const [limit, setLimit] = useState(10); // Default limit is 100
    const [documentDetails, setDocumentDetails] = useState(null);
    const [sigmaId, setSigmaId] = useState(''); // State variable for sigmaId
    const [fav, setFav] = useState(false);
    const [searchQuery, setSearchQuery] = useState(false);
    const [searchDetails, setsearchDetails] = useState([]);
    const[loaderDownload, setLoaderDownload] = useState(false);

    const handleShowLoadDownload = () => setLoaderDownload(true);
    const handleHideLoadDownload = () => setLoaderDownload(false);
    console.log("search",searchQuery)
    const handleSearch = (searchQuer) => {
        if(searchQuer === null || searchQuer === "" || searchQuer === undefined || searchQuer === "null"){
            setSearchQuery(false)
        }
        else{
            setSearchQuery(true)
            const filteredJobLists = postDetails.filter((r) =>
              r.name__v.toLowerCase().includes(searchQuer.toLowerCase())
            );
            setsearchDetails(filteredJobLists);
        }
        
        // console.log("search",filteredJobLists)
        // setFilteredJobLists(filteredJobLists);
      };
	  
        
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
    const logout4 = async () =>
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
  

    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteToggle = async (sigmaId, name__v, filename__v, status__v) => {
      try {
        const emailId = localStorage.getItem("UserID");
  
        if (!isFavorite) {
          // Add to favorites
          const added = await addToFavorites(emailId, sigmaId, name__v, filename__v, status__v);
  
          if (added) {
            setIsFavorite(true);
          }
        } else {
          // Remove from favorites
          const deleted = await deleteFavorite(emailId, sigmaId);
  
          if (deleted) {
            setIsFavorite(false);
            setPostDetails(postDetails.filter((post) => post.sigmaId !== sigmaId));
          }
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here, e.g., show an error message to the user
      }
    };

   
      const fetchSigmaDoc = async() =>{
        const start = '0'; // Provide the desired value for start
        let tnId = await getTennantId();
        console.log("tnid",tnId)
        const tenantId = tnId; // Provide the desired value for tenantId
    
       await fetchSigmadocByTid(start, limit, tenantId)
          .then(response => {
            console.log("err", response);
            // Assuming the response contains the POST method details in the 'data' field
            setPostDetails(response);
          })
          .catch(error => {
            console.error('Error fetching POST method details:', error);
          });
    }
    useEffect(() => {
       
        fetchSigmaDoc();
      }, [limit]);
      console.log("err",postDetails);

      const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
      };
      const getLast7DaysData = () => {
        const currentDate = new Date();
        const last7Days = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      
        const filteredData = postDetails.filter(item => {
          const createdDate = new Date(parseInt(item.createdDate));
          return createdDate >= last7Days;
        });
      
        return filteredData;
      };
      
     
      const last7DaysData = getLast7DaysData();
      console.log('Last 7 days data:', last7DaysData)
      const getLast30DaysData = () => {
        const currentDate = new Date();
        const last30Days = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      
        const filteredData = postDetails.filter(item => {
          const createdDate = new Date(parseInt(item.createdDate));
          return createdDate >= last30Days;
        });
      
        return filteredData;
      };
      
     
      const last30DaysData = getLast30DaysData();
      console.log('Last 30 days data:', last30DaysData);
      const handleFilterClick = (filterType) => {
        if (filterType === '7Days') {
          const last7DaysData = getLast7DaysData();
          console.log('Last 7 days data:', last7DaysData);
        } else if (filterType === '30Days') {
          const last30DaysData = getLast30DaysData();
          console.log('Last 30 days data:', last30DaysData);
        }
      };
      useEffect(() => {
        userdata();
      }, []);
      
     
      
      const userdata = async () => {
        let tnid = await getTennantId();
        let getCurrentEpochTime =
          Math.floor(Date.now() / 1000); // Dividing by 1000 to convert milliseconds to seconds
          console.log("ep",getCurrentEpochTime)
        console.log("tn",tnid)
        let title = "document";
        let descriptions = "document details.";
        let mailId = localStorage.getItem("UserID");
        let epochtime =getCurrentEpochTime;
        let tennatId =tnid;
        let statuses = 0;
      
        try {
          await NotificationPost(title,descriptions,mailId,epochtime,tennatId,statuses );
          console.log("Update successful9");
        } catch (error) {
          console.error("Error updating:", error);
  }
  };

  const downloaddoc = async () => {
    try{
      handleShowLoadDownload();
        let tnId = await getTennantId();
        const start = '0'; 
        // let [value, data] = await userDetailWithEmail(localStorage.getItem("UserID"));
        // console.log("app.js role", data.roleType);
        // console.log("hoursvalue1", milliseconds);
        let downloadtapi=await handleWriteToDocumentlist(start,limit,tnId);    
                
        console.log("recheduldownloadtapiedtime",downloadtapi);
        // console.log("hoursvalue2", milliseconds);
        
        // let Jobrecheduleruser=await jobschedulardetailpost();    
        // console.log("Jobrecheduleruser",Jobrecheduleruser);
        toast.success("Downloaded  successfully");
        // await ticketTableFetch();
        handleHideLoadDownload();
    
      
    }catch(err){
        toast.error(err);
        handleHideLoadDownload();
    }
    }
      return ( 
        <div>
                                 <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>

            <Row className="mb-20">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">Document Details</h4>
                </Col>
            </Row>
            
            <Row className="mb-20" style={{minHeight: '40px'}}>
                <Col md={6} className="d-flex flex-wrap align-items-center justify-content-end order-md-1 mb-md-0 mb-2">
                    <Button variant="outline-gray" className="me-2 mb-1" onClick={() => setSearch(!search)}>
                        {search ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="d-block" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        ):(
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="d-block" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        )}
                    </Button>
                    {/* <Button variant="outline-gray" className="me-2 px-3">7 Days</Button>
                    <Button variant="outline-gray" className="me-2 px-3">30 Days</Button> */}
                     {/* <Button variant="outline-gray" className="me-2 mb-1 px-3"
                    onClick={() => handleFilterClick('7Days')}> 7 Days
                    </Button> */}
                    {/* <Button variant="outline-gray" className="me-2 mb-1 px-3"  onClick={() => handleFilterClick('30Days')}>30 Days</Button> */}
                    <ButtonLoad loading={loaderDownload} variant="gray" className="btn-gray-black me-2 mb-1 px-3" onClick={() => downloaddoc()}>
                    Download
                      </ButtonLoad>
                    <Dropdown size="sm">
                        <Dropdown.Toggle variant="gray" id="dropdown-basic">
                            Select Rows
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-filter">
                        <Dropdown.Item onClick={() => handleLimitChange(100)}>100 Rows</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLimitChange(500)}>500 Rows</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLimitChange(1000)}>1000 Rows</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={6}>
                    {search && (
                        <Form>
                          
	                         <InputGroup className="form-search shadow">
                                <Button variant="reset" id="button-addon1" onClick={()=>fetchSigmaDoc()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </Button>
                                <Form.Control
                                    aria-describedby="basic-addon1"
                                    aria-label="Write a name to files"
                                    placeholder="Write a name to Search files..."
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </InputGroup>
                        </Form>
                    )}
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
          <Button variant="secondary" onClick={logout4}>
            Sign out now
          </Button>
          <Button variant="primary" onClick={stay}>
            Stay signed in
          </Button>
        </Modal.Footer>
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
                        <th className="text-center">Verification</th>
                        <th className="text-center">View</th>
                        <th className="text-center">Favourite</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">File Name</th>
                        <th className="text-center">Document Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">NFT Status</th>
                    </tr>
                </thead>
                <tbody>

                    {searchQuery === false ? (<>
                        {postDetails[0]===null||postDetails[0]===""||postDetails[0]===undefined?(<></>):(<>                
                    {postDetails.map((postt, index) => {
  if (index < limit) {
    
    return (
      <tr key={index}>
        {/* <td width="84">
          <div className="d-flex justify-content-end">
            <Form.Check
              className="mb-0 check-single"
              type='checkbox'
              id={`default-${index}`}
            />
          </div>
        </td> */}
        <td className="text-center">
         <Link to={{pathname: "/document-details/check",search:`?id=${postt.sigmaId}&docid=${postt.id}`}}><img src={verify} alt="verify" /><img src={arrow} style={{fillColor:"#0000FF"}}alt="arrow" /></Link>
          {/* <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                            
                                            </Dropdown.Toggle> */}
                                            </td>
         <td className="text-center">
         <Link to={{pathname: "/document-details/single",search:`?id=${postt.sigmaId}`}}><img src={Eye} alt="Eye" /></Link>
          {/* <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                            
                                            </Dropdown.Toggle> */}
                                            </td>
        <td className="text-center">
          
        <Favourite
        sigmaid= {postt.sigmaId} name__v = {postt.name__v} filename__v ={postt.filename__v} status__v ={postt.status__v}
        />
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 16 16"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onClick={() => {
            // if (postt.docId && postt.docName && postt.fileName && postt.docStatus) {
              handleFavoriteToggle(postt.sigmaId,postt.name__v,postt.filename__v,postt.status__v)
            // }
          }} >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            className={`star-icon ${isFavorite ? 'favorited' : ''}`}/>
          </svg> */}
        </td>
        <td className="text-center">{postt.sigmaId ? postt.sigmaId : ""}</td>
        <td>{postt.filename__v ? postt.filename__v : ""}</td>
        <td>{postt.name__v ? postt.name__v : ""}</td>
        <td className="text-center">
        {/* <DocumentDetailsSingle x={postt.sigmaId}/> */}
          {/* <Link to="/document-details/single">{postt.status__v ? postt.status__v : ""}</Link> */}
          {/* <Link to={`/document-details/single/${postt.sigmaId}`}>
               {postt.status__v ? postt.status__v : ""}
              </Link> */}
             
             {postt.status__v ? postt.status__v : ""}
            
              {/* <Link to="/about?id=123">Go to About</Link> */}
               {/* return( 
                                    <DocumentDetailsSingle x={postt.sigmaId}/>) */}
              {/* <Link to={{ pathname: "/document-details/single", state: { allData: postt.sigmaid } }}><Button variant="blue" className='w-100'> {postt.status__v ? postt.status__v : ""}</Button></Link> */}
        </td>
        <td className="text-center"> {postt.uuid ? "Created" : "Pending"} </td>
      </tr>
    );
  }
  return null; // Skip rendering for items after the first 10
})}
</>)}
                    </>):(<>
                        {searchDetails[0]===null||searchDetails[0]===""||searchDetails[0]===undefined?(<></>):(<>                
                    {searchDetails.map((postt, index) => {
  if (index < limit) {
    
    return (
      <tr key={index}>
        {/* <td width="84">
          <div className="d-flex justify-content-end">
            <Form.Check
              className="mb-0 check-single"
              type='checkbox'
              id={`default-${index}`}
            />
          </div>
        </td> */}
        <td className="text-center">
         <Link to={{pathname: "/document-details/check",search:`?id=${postt.sigmaId}&docid=${postt.id}`}}><img src={verify} alt="verify" /><img src={arrow} style={{fillColor:"#0000FF"}}alt="arrow" /></Link>
          {/* <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                            
                                            </Dropdown.Toggle> */}
                                            </td>
         <td className="text-center">
         <Link to={{pathname: "/document-details/single",search:`?id=${postt.sigmaId}`}}><img src={Eye} alt="Eye" /></Link>
          {/* <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                            
                                            </Dropdown.Toggle> */}
                                            </td>
        <td className="text-center">
        <Favourite
        sigmaid= {postt.sigmaId} name__v = {postt.name__v} filename__v ={postt.filename__v} status__v ={postt.status__v}
        />
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 16 16"
          style={{ cursor: 'pointer', transition: 'fill 0.3s' }}
          onClick={() => {
            // if (postt.docId && postt.docName && postt.fileName && postt.docStatus) {
              handleFavoriteToggle(postt.sigmaId,postt.name__v,postt.filename__v,postt.status__v)
            // }
          }} >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            className={`star-icon ${isFavorite ? 'favorited' : ''}`}/>
          </svg> */}
        </td>
        <td className="text-center">{postt.sigmaId ? postt.sigmaId : ""}</td>
        <td>{postt.filename__v ? postt.filename__v : ""}</td>
        <td>{postt.name__v ? postt.name__v : ""}</td>
        <td className="text-center">
        {/* <DocumentDetailsSingle x={postt.sigmaId}/> */}
          {/* <Link to="/document-details/single">{postt.status__v ? postt.status__v : ""}</Link> */}
          {/* <Link to={`/document-details/single/${postt.sigmaId}`}>
               {postt.status__v ? postt.status__v : ""}
              </Link> */}
             
             {postt.status__v ? postt.status__v : ""}
            
              {/* <Link to="/about?id=123">Go to About</Link> */}
               {/* return( 
                                    <DocumentDetailsSingle x={postt.sigmaId}/>) */}
              {/* <Link to={{ pathname: "/document-details/single", state: { allData: postt.sigmaid } }}><Button variant="blue" className='w-100'> {postt.status__v ? postt.status__v : ""}</Button></Link> */}
        </td>
        <td className="text-center"> {postt.uuid ? "Created" : "Pending"} </td>
      </tr>
    );
  }
  return null; // Skip rendering for items after the first 10
})}

</>)}
                    </>)}
                  
                  

                </tbody>
                </Table>
            </div>
            {/* /.mb-20 */}
        </div>
     );
     
}

export default DocumentDetails;