import { Button, Card, Col, Dropdown, Form, InputGroup, Row, Table,Badge,Modal,Toast} from "react-bootstrap";
import Eye from '../asserts/images/eye-icon.svg'
import SiteLogo from '../asserts/images/site-logo-xxl.svg'
import { Link,useParams,useLocation  } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import { fetchSigmadocdetails,getNFTProp,getTennantId,handleWriteToFile} from '../apifunction';
import CopyIcon from '../asserts/images/copy-icon.svg'
import { DataContext } from "../App";
import { ToastContainer, Zoom, Bounce, toast} from 'react-toastify';
import Check from '../asserts/images/check_icon.svg';
import ButtonLoad from 'react-bootstrap-button-loader';
const DocumentDetailsSingle= (props)=>{
    const location = useLocation();
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const[loaderDownload, setLoaderDownload] = useState(false);

    const handleShowLoadDownload = () => setLoaderDownload(true);
    const handleHideLoadDownload = () => setLoaderDownload(false);
    //  const allData = location.state.allData;
    // const id = useContext(DataContext);
    const {sigmaId} = useParams();
    const [documentDetails, setDocumentDetails] = useState(null);
    const [nftproperties, setNftprop] = useState([]);
    // const location = useLocation();  
    // const [sigmaId, setSigmaId] = useState(''); // State variable for sigmaId

    // const { sigmaId } = useParams();


    const [search, setSearch] = useState(false);
    const searchParams = new URLSearchParams(location.search);
    console.log("all",searchParams);
    const id = searchParams.get('id');
   
    console.log("id",id)

    

    // useEffect(() => {
    //     fetchSigmadocdetails(id)
    //       .then(response => {
    //         console.log("res",response)
    //         const [success, data] = response;
    //         if (success) {
    //           setDocumentDetails(data);
    //           console.log("data1", data);
    //         } else {
    //           console.error('Error fetching document details');
    //         }
    //       })
    //       .catch(error => {
    //         console.error('Error fetching document details:', error);
    //       });
    //   }, [id]);

     
      const getNFTproperties= async() =>{
        const [success, data] = await fetchSigmadocdetails(id);
        setDocumentDetails(data);
            let tnId = await getTennantId();
            if(data.uuid){
              let tx = await getNFTProp(data.uuid,tnId);
              // console.log("txhistory",tx)
              setNftprop(tx.output);
              console.log("nftprop",tx)
            }
           
        
        
    }
    useEffect(() =>{getNFTproperties()},[])
   
    function timestampToEpoch(timestamp) {
      const epochTime = new Date(timestamp).getTime() ; // Divide by 1000 to convert to seconds
      return epochTime;
    }
    const downloaddoc = async () => {
      try{
        handleShowLoadDownload();
          let tnId = await getTennantId();
          // let [value, data] = await userDetailWithEmail(localStorage.getItem("UserID"));
          // console.log("app.js role", data.roleType);
          // console.log("hoursvalue1", milliseconds);
          console.log("tnId",tnId);
          console.log("docdetails",documentDetails.docChecksum);
          let downloadtapi=await handleWriteToFile(tnId,documentDetails.docChecksum);    
                  
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
      const handleCopyClick = () => {
        navigator.clipboard.writeText(nftproperties.tokenOwner)
          .then(() => {
            toggleShowA();
            toast.success('Copied successfully!', {
              position: 'bottom-right',
              autoClose: 4000,
              closeButton: false,
              draggable: false,
            });
          })
          .catch((error) => {
            console.error('Error copying text: ', error);
            // Handle the error if needed
          });
      };

    return ( 
        <div>
          
                       <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>

            <div className="mb-20">
                <Link to="/document-details" className="d-inline-block btn-back align-items-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    Back to Document List
                </Link>
            </div>
            <Row className="mb-2">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">Document Details</h4>
                </Col>
            </Row>

            <Row className="mb-20" style={{minHeight: '40px'}}>
                <Col md={6} className="d-flex align-items-center justify-content-end order-md-1 mb-md-0 mb-2">
                    {/* <Dropdown size="sm" className="me-2">
                        <Dropdown.Toggle variant="gray" className="btn-gray-black" id="dropdown-basic" onClick={() => downloaddoc()}>
                            Download
                        </Dropdown.Toggle>
                         <Dropdown.Menu className="dropdown-filter">
                            
                         <Dropdown.Item onClick={() => handleSelecttype("Pdf")}>Pdf</Dropdown.Item> 
                            
                        </Dropdown.Menu> 
                    </Dropdown> */} 
                    {documentDetails?(<>
                     {documentDetails.docChecksum === null || documentDetails.docChecksum === "" || documentDetails.docChecksum === undefined ?(<>
                    <ButtonLoad loading={loaderDownload} variant="gray" className="disabled" onClick={() => downloaddoc()}>
                    Download
                                                    </ButtonLoad>
                    </>):(<>
                      <ButtonLoad loading={loaderDownload}variant="gray" className="btn-gray-black" onClick={() => downloaddoc()}>
                    Download
                                                    </ButtonLoad>
                               
                            </>)}
                    
                    </>):(<></>)}
                 
                  
                    {/* <Link to="/resource-persist-job" className="me-2 btn-outline-gray btn-outline-gray-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="d-block" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </Link> */}
                    {/* <Button variant="outline-gray" onClick={() => setSearch(!search)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="d-block" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </Button> */}
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
                                />
                            </InputGroup>
                        </Form>
                    )}
                </Col>
            </Row>
            
            <div className="mb-20">
                <Row>
                    <Col md={4} className="mb-md-0 mb-4">
                        <Card className="border">
                            <Card.Body className="text-center p-xl-3">
                                <img src={SiteLogo} alt="SiteLogo" className="img-fluid" />
                            </Card.Body>
                        </Card>
                        {documentDetails?(<>
                          {documentDetails.uuid===""||documentDetails.uuid===undefined||documentDetails.uuid===null?(<>
                     </>):(<>
                      {nftproperties.tokenOwner===""||nftproperties.tokenOwner===undefined||nftproperties.tokenOwner===null?(<>
                      
                      </>):(<>
                      
                        <th className="text-center">NFT Properties</th>
                        <Table >
                
                        <thead>
                  <tr>
                
                                    <th>Document Title</th>
                                    <td>{nftproperties.fVar1}</td>
                                    <td></td>
                                </tr>
                            </thead>
                            {/* <tbody> */}
                            <thead>                          
  <tr>
    <th>Token ID</th>
    <td>{nftproperties.tokenId}</td>
    <td></td>
  </tr></thead>
  {/* </tbody> */}
  <thead> 
  <tr>
    <th>Global_ID_SYS</th>
    <td>{nftproperties.fVar3}</td>
    <td></td>
  </tr>
  </thead>
  <thead> 
  <tr>
    <th>Version ID</th>
    <td>{nftproperties.fVar2}</td>
    <td></td>
  </tr>
  </thead>
  <thead> 
  <tr>
    <th>Status</th>
    <td><Badge pill bg="success"><img src={Check} alt="success badge" />{nftproperties.fVar4}</Badge></td>
    <td></td>
  </tr>
  </thead>
  <thead> 
  <tr>
    <th>IPFS Hash</th>
     <td>    {nftproperties? (nftproperties.fVar10).substring(0, 5) : ''}...{(nftproperties? (nftproperties.fVar10).substring((nftproperties.fVar10).length - 5) : '')} </td> 
     <td></td>
    {/* <td>{(nftproperties.fVar10).substring(0, 5)}...{(nftproperties.fVar10).substring((nftproperties.fVar10).length - 5)}</td> */}
  </tr>
  </thead>
  <thead> 
  <tr>
  
    <th>Token Owner</th>
     <td>    {nftproperties? (nftproperties.tokenOwner).substring(0, 8) : ''}...{(nftproperties? (nftproperties.tokenOwner).substring((nftproperties.tokenOwner).length - 5) : '')} 
    
</td>
<td>
     {/* <Button variant="reset" onClick={() => {navigator.clipboard.writeText(nftproperties.tokenOwner); toggleShowA();}}>
                                            <img src={CopyIcon} alt="CopyIcon" />
                                        </Button> */}
     <Button variant="reset" onClick={handleCopyClick}>
    <img src={CopyIcon} alt="CopyIcon" />
  </Button>
                                        </td>      
                                                        

  </tr>
  </thead>
  </Table>
                      
                      
                      </>)}

                      
                     
                     </>)}
                        
                        
                        
                        
                        </>):(<></>)}
                    
                               
                             
                     
                     
                    </Col>
                    <Col md={8}>
                        <Table hover responsive>
                            <thead>
                  <tr>
                
                                    <th>Document Name</th>
                                    <td>{documentDetails?.name__v}</td>
                                    
                                </tr>
                            </thead>
                            <tbody>
  <tr>
    <th>Document ID</th>
    <td>{documentDetails?.id}</td>
  </tr>
  {/* <tr>
    <th>Document ID</th>
    <td>{documentDetails?.jobId}</td>
  </tr> */}
  <tr>
    <th>Version ID</th>
    <td>{documentDetails?.version_id}</td>
  </tr>
  <tr>
    <th>Document Date</th>
    <td>{new Date((documentDetails?.createdDate)/1).toLocaleString()}</td>
  </tr>
  <tr>
    <th>File Modified Date</th>
    <td>{new Date(timestampToEpoch(documentDetails?.file_modified_date__v)).toLocaleString()}</td>
  </tr>
  <tr>
    <th>File Created Date</th>
    <td>{new Date(timestampToEpoch(documentDetails?.file_created_date__v)).toLocaleString()}</td>
  </tr>
  <tr>
    <th>Document Creation Date</th>
    <td>{new Date(timestampToEpoch(documentDetails?.document_creation_date__v)).toLocaleString()}</td>
  </tr>
  <tr>
    <th>NFT Creation Status</th>
    <td>{documentDetails?.nftCreationStatus}</td>
  </tr>
 
    {/* <tr>
    <th>UUID</th>
    <td>{documentDetails?.uuid}</td>
  </tr> */}
 
  
  <tr>
    <th>Createby</th>
    <td>{documentDetails?.createdBy}</td>
  </tr>
  <tr>
    <th>Region</th>
    <td>US-East North Carolin</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Single</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>{documentDetails?.name__v}</td>
  </tr>
  {/* <tr>
    <th>Source Vault ID</th>
    <td>{documentDetails?.tenantId}</td>
  </tr> */}
</tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
            {/* /.mb-20 */}
        </div>
     );
}

export default DocumentDetailsSingle;