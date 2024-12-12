import { Button, Col, Dropdown, Form, InputGroup, Row, Table, Modal } from "react-bootstrap";
import Eye from '../asserts/images/eye-icon.svg'
import { Link,useLocation,useParams,useNavigate } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import Layout from "./Snippets/Layout";
import { fetchFavoriteDetails,deleteFavorite,fetchSigmadocdetails,createUserVisits ,getNotificationById, getTennantId} from "../apifunction";
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout";
const FavouriteDocuments= (props)=>{
// function FavouriteDocuments() {
    const location = useLocation();
    const [postDetails, setPostDetails] = useState([]);
    const [limit, setLimit] = useState(0);
  
    const [favoriteData, setFavoriteData] = useState([]);

    const {sigmaId} = useParams();
    const [documentDetails, setDocumentDetails] = useState(null);
    const [notifydata, setnotifyData] = useState([]);

    const [search, setSearch] = useState(false);
    const history = useNavigate();
    const navigate = useNavigate()
   // console.log("selected",roleId);
 
   const [openModal, setOpenModal] = useState(false);

   const [docName, setDocName] = useState("");
       
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
    // const searchParams = new URLSearchParams(location.search);
    // console.log("all",searchParams);
    // const id = searchParams.get('id');
   
    // console.log("id",id)

    

    // useEffect(() => {
    //     fetchSigmadocdetails(id)
    //       .then(response => {
    //         console.log("res",response)
    //         const [success, data] = response;
    //         if (success) {
    //           setDocumentDetails(data);
    //           console.log("data", data);
    //         } else {
    //           console.error('Error fetching document details');
    //         }
    //       })
    //       .catch(error => {
    //         console.error('Error fetching document details:', error);
    //       });
    //   }, [id]);


    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const emailId = localStorage.getItem("UserID")
        const [check1, data] = await fetchFavoriteDetails(emailId,limit);
        console.log("valid2", data);
        setFavoriteData(data);
    };
    
    useEffect(() => {
        userdata();
      }, []);
      
      const userdata = async () => {
        let algoAddress = localStorage.getItem("UserID");
        let networkType = "type";
        let walletType = "Favorite ";
      
        try {
          await createUserVisits(algoAddress, networkType, walletType);
          console.log("Update successful6");
        } catch (error) {
          console.error("Error updating:", error);
        }
      };
    const deleteFavorites = async(docId, filename) => {
        const emailId = localStorage.getItem("UserID")
        const tenantId = await getTennantId(emailId);
        // Perform the deletion logic here
        // You can use the docId to identify the document to delete
        // Update the favoriteData state to remove the deleted document
        
        // Example logic:
        const updatedFavorites = favoriteData.filter(item => item.docId !== docId);
        setFavoriteData(updatedFavorites);
        console.log("docid",docId)
        removeFavoriteFromLocalStorage(emailId, docId);
        const deleted = await deleteFavorite(emailId, docId, filename, tenantId);
      
      };
      useEffect(() => {
        getnotify();
    }, []);
    const getnotify = async () => {
        const emailId = localStorage.getItem("UserID")
        const [check1, data] = await getNotificationById(emailId);
        console.log("getdata", data);
        setnotifyData(data);
    }; 
    const removeFavoriteFromLocalStorage = (emailId, docId) => {
        const localStorageKey = `favorites_${emailId}`;
        const favoriteItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    
        // Find the index of the docId in the favoriteItems array
        const indexToRemove = favoriteItems.indexOf(docId);
    
        if (indexToRemove !== -1) {
            // If found, remove it from the array
            favoriteItems.splice(indexToRemove, 1);
    
            // Update the local storage with the updated favorite items
            localStorage.setItem(localStorageKey, JSON.stringify(favoriteItems));
        }
    };

    const handleSearch = (event) => {
        setDocName(event.target.value);
        console.log(event.target.value);
    }

    return ( 
        <Layout getThemeMode={() => undefined} roleType = {props.roleType} getIProfile = {props.getIProfile}>
            <div className="container-fluid">
                <Row className="mb-20">
                    <Col md={6} xl={4} xxl={3}>
                        <h4 className="page-title mb-0">Favourite Documents</h4>
                    </Col>
                </Row>
                <Row className="mb-20" style={{minHeight: '40px'}}>
                    <Col md={6} className="d-flex align-items-center justify-content-end order-md-1 mb-md-0 mb-2">
                        <Button variant="outline-gray" className="me-2" onClick={() => setSearch(!search)}>
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
                        <Dropdown size="sm">
                            {/* <Dropdown.Toggle variant="gray" id="dropdown-basic">
                                Select Rows
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-filter">
                                <Dropdown.Item href="#/action-1">100 Rows</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">500 Rows</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">1000 Rows</Dropdown.Item>
                            </Dropdown.Menu> */}
                        </Dropdown>
                    </Col>
                    <Col md={6}>
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
                                        value={docName}
                                        onChange={handleSearch}
                                    />
                                </InputGroup>
                            </Form>
                        )}
                    </Col>
                </Row>
                
                <div className="mb-20">
                    <Table hover responsive>
                        <thead>
                            <tr>
                                {/* <th>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Dropdown size="sm" className="me-2">
                                            <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                                <img src={Eye} alt="Eye" />
                                                <th className="text-center">Unfavourite</th>
                                                
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
                                <th className="text-center">Unfavourite</th>
                                <th className="text-center">ID</th>
                                <th className="text-center">File Name</th>
                                <th className="text-center">Document Name</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(docName !== "" ? 
                        (favoriteData
                            .filter((postt) => 
                            (postt.fileName.toLowerCase().startsWith(docName.toLowerCase()))).map((postt, index) => {
                                return(
                            <tr key={index}>
                            <td>
                                <center>
                            <Button variant="link" onClick={() => deleteFavorites(postt.docId, postt.fileName)}>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-star-fill"
                            viewBox="0 0 16 16"
                            >
                            <path
                            fillRule="evenodd"
                            d="M8.002.165l1.955 4.859 5.405.393c.527.038.742.725.332 1.089l-3.955 3.251 1.177 5.372c.115.527-.465.926-.94.686L8 13.443l-4.926 2.323c-.475.24-1.055-.16-.94-.686l1.177-5.372L.308 6.446c-.41-.364-.195-1.05.332-1.089l5.405-.393L8.002.165zM8 11.094V3.786L5.594 6.316a.697.697 0 0 1-.51.216l-4.436.322L4.64 8.64a.705.705 0 0 1 .214.512l.321 4.431 3.27-1.538a.706.706 0 0 1 .654 0l3.27 1.538.321-4.431a.705.705 0 0 1 .214-.512l2.992-2.678-4.436-.322a.697.697 0 0 1-.51-.216L8 3.786v7.308z"
                            />
                            </svg>
                            </Button>
                            </center>
                            </td>
                            <td className="text-center">{postt.docId}</td>
                            <td>{postt.fileName}</td>
                            <td>{postt.docName}</td>
                            <td className="text-center"> <Link to={{pathname: "/document-details/single",search:`?id=${postt.docId}`}}>{postt.docStatus}</Link></td>
                        </tr>)
                        })) : 
                        <>
                        {favoriteData.map((postt, index) => (
                        <tr key={index}>
                            <td><center>
                            <Button variant="link" onClick={() => deleteFavorites(postt.docId, postt.fileName)}>
                             <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                 height="16"
                                fill="currentColor"
                                className="bi bi-star-fill"
                                viewBox="0 0 16 16"
                            >
                            <path
                            fillRule="evenodd"
                            d="M8.002.165l1.955 4.859 5.405.393c.527.038.742.725.332 1.089l-3.955 3.251 1.177 5.372c.115.527-.465.926-.94.686L8 13.443l-4.926 2.323c-.475.24-1.055-.16-.94-.686l1.177-5.372L.308 6.446c-.41-.364-.195-1.05.332-1.089l5.405-.393L8.002.165zM8 11.094V3.786L5.594 6.316a.697.697 0 0 1-.51.216l-4.436.322L4.64 8.64a.705.705 0 0 1 .214.512l.321 4.431 3.27-1.538a.706.706 0 0 1 .654 0l3.27 1.538.321-4.431a.705.705 0 0 1 .214-.512l2.992-2.678-4.436-.322a.697.697 0 0 1-.51-.216L8 3.786v7.308z"
                            />
                            </svg>
                            </Button>
                            </center>
                            </td>
                            <td className="text-center">{postt.docId}</td>
                            <td>{postt.fileName}</td>
                            <td>{postt.docName}</td>
                            <td className="text-center"> <Link to={{pathname: "/document-details/single",search:`?id=${postt.docId}`}}>{postt.docStatus}</Link></td>
                            </tr>
                            ))}</>)}
                        </tbody>
                        
                              {/* </>)} */}
                            {/* <tr>
                                <td></td>
                                <td className="text-center">17323</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td className="text-center">Approved</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="text-center">17323</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td className="text-center">Approved</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="text-center">17323</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td className="text-center">Approved</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="text-center">17323</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td className="text-center">Approved</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="text-center">17323</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td>Starting in Windows 8, the AppInit_DLLs infrastructure is disabled when secure boot is enabled</td>
                                <td className="text-center">Approved</td>
                            </tr> */}
                        {/* </tbody> */}
                    </Table>

                    <Row className="mt-4">
                        <Col md={4} className="mb-md-0 mb-3">
                            {/* <h6 className="me-2 mb-0 text-muted">Showing 10 of 10:</h6> */}
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
                                {/* <li>
                                    <Link to="/" className="prev disabled">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                        </svg>
                                    </Link>
                                </li>
                                <li><Link className="active" to="/">1</Link></li>
                                <li><Link to="/">2</Link></li>
                                <li><Link to="/">3</Link></li>
                                <li><Link to="/">4</Link></li>
                                <li><Link to="/">5</Link></li>
                                <li><Link to="/">6</Link></li>
                                <li>
                                    <Link to="/" className="next">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                        </svg>
                                    </Link>
                                </li> */}
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
        </Layout>
     );
}

export default FavouriteDocuments;