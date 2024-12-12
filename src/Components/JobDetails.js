import { Button, Card, Col, Dropdown, Form, InputGroup, Row, Table, Modal} from "react-bootstrap";
import CheckBox from '../asserts/images/check-box.svg';
import { Link } from "react-router-dom";
import { useState, useEffect ,useContext} from "react";
import Layout from "./Snippets/Layout";
import { useNavigate } from "react-router-dom";
import { getJobList, getSigmafieldConfig, getTennantId } from "../apifunction";
import {createUserVisits} from "../apifunction";

function JobDetails() {
    const [search, setSearch] = useState(false);
    const [filterDisplay, setFilterDisplay] = useState("All");
    const [search1, setSearch1] = useState('');
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [jobLists, setjobList] = useState([""]);
    const [StartValue, setStartValue] = useState(0);
    const [limit, setlimit] = useState(10);
    const [active, setActive] = useState("notActive");
    const [Selectedcolm, setSelectedcolm] = useState("");
    const[SeValue,setSeValue] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [searchDetails, setsearchDetails] = useState([]);
    const [userManage, setUserManage] = useState([""]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedJobType, setSelectedJobType] = useState("All");
    const [reachedLastPage, setReachedLastPage] = useState(false);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState("");
    const [selectedfetch, setSelectedfetch] = useState(false);
    console.log("details",searchDetails);
    console.log("ch",selectedStatus)
console.log("Selectedcolm",Selectedcolm)
console.log("query",searchQuery)
const [errorPopupVisible, setErrorPopupVisible] = useState(false);
const [errorPopupMessage, setErrorPopupMessage] = useState("");// State for error popup visibility
const [filteredJobs, setFilteredJobs] = useState([]);
const [resetclear, setResetclear] = useState(true);
    const handleClose = () => {
        setShow(false);
        setSelectedValues([]);
    }
    const handleShow = () => setShow(true);
    const [data, setColumnValue] = useState([""]);

    const handleCheckboxClick = (e) => {
       
        if (selectedValues.includes(e)) {
            const updatedValues = selectedValues.filter((item) => item !== e);
            setSelectedValues(updatedValues);
            
        }else{
            setSelectedValues([...selectedValues, e]);
        }
        
    }
    const handleSearch1 = (e) => {
        setSearch1(e.target.value)
    }
    const handlefatch = (selvalues) => {
        console.log("selecetd",selvalues)
        setSelectedColumns(selvalues)
        setShow(false);
        
        let s = [];
        
            jobLists.map((r,i) =>{                
                let k =[];
                // if(r.jobName === "DOC_FETCH"){

                selvalues.map((x,y)=>{ 
                        
                            if(r[x] === "DOC_FETCH") {
                                k.push("Resource persist job")
                            }else if(r[x] === "Y"){
                                k.push("Completed")
                            }else if(r[x] === "null" || r[x] === "" || r[x] === null || r[x] === undefined){
                                k.push("0");
                            }
                            else if(r[x] === "MAKE_IREC") {
                                k.push("Immutable record job")
                            }else if(r[x] === "P"){
                                k.push("InProgress")
                            }else if(r[x] === "Yes"){
                                k.push("Manual")
                            }else if(r[x] === "No"){
                                k.push("Automatic")
                            }
                            else{
                                k.push(r[x])
                            }
                            
                       
                    }  
                                   
                        ) 
                        console.log("kvalue",k)
                    s.push(k);  
                // }
                  
                }
                )
                console.log("svalue",s)
                setSelectedcolm(s);
                setSelectedfetch(true);
    }

    const handleSearch = (searchQuery) => {
        console.log("Searching for:", searchQuery);
        setSearch1(searchQuery);
    
        if (searchQuery === "") {
            setsearchDetails(jobLists);
        } else {
            const filteredJobLists = jobLists.filter((job) =>
                job.status.toLowerCase().includes(searchQuery.toLowerCase())
            );
             console.log("filtereddata",filteredJobLists,jobLists);
            setsearchDetails(filteredJobLists);

         
        }
    };
        

    const handlefatchforPagination = async (selvalues, jobListing) => {
        setSelectedColumns(selvalues);
        setShow(false);
    
        let s = [];
    
        jobListing.forEach((r, i) => {
            let k = [];
    
            selvalues.forEach((x, y) => {
                if (r[x] === "DOC_FETCH") {
                    k.push("Resource persist job");
                } else if (r[x] === "Y") {
                    k.push("Completed");
                } else if (r[x] === "null" || r[x] === "" || r[x] === null || r[x] === undefined) {
                    k.push("0");
                } else if (r[x] === "MAKE_IREC") {
                    k.push("Immutable record job");
                } else if (r[x] === "P") {
                    k.push("InProgress");
                } else if (r[x] === "Yes") {
                    k.push("Manual");
                } else if (r[x] === "No") {
                    k.push("Automatic");
                } else {
                    k.push(r[x]);
                }
            });
    
            // Apply the selectedStatus filter to the data
            if (selectedStatus === "" || k[2] === selectedStatus) { // Assuming status is at index 2
                s.push(k);
            }
        });
    
        // Apply pagination
        // const startIdx = StartValue;
        // const endIdx = Math.min(startIdx + limit, s.length);
        // const paginatedData = s.slice(startIdx, endIdx);
    
        setSelectedcolm(s);
        console.log("dd",s)
    };

        //  console.log("sech",filteredJobLists)
        // setFilteredJobLists(filteredJobLists);
     
        const handleFilterStatus = (status) => {
            console.log("Clicked status:", status);
            
            setSelectedStatus(status);
            
            // Filter jobs by status
            if (status !== "") {
                const filteredJobs = jobLists.filter((job) => job.status === status);
                setFilteredJobs(filteredJobs);
                
                if (filteredJobs.length === 0) {
                    const errorMessage = getStatusErrorMessage(status);
                    setErrorPopupMessage(errorMessage);
                    setErrorPopupVisible(true); // Show error popup
                } else {
                    setErrorPopupVisible(false); // Hide error popup
                }
            } else {
                setFilteredJobs(jobLists); // Show all jobs
                setErrorPopupVisible(false); // Hide error popup
            }
        };

    useEffect(() => {
        const jobfetch = async () => {
            try {
                // Fetch job list
                const tnId = await getTennantId();
                const response = await getJobList(tnId, StartValue, limit);

                // Apply filters to the job list based on selectedStatus and selectedJobType
                let filteredList = response;

                if (selectedStatusFilter !== "") {
                    filteredList = filteredList.filter(job => job.status === selectedStatusFilter);
                }
                if (selectedJobType !== "All") {
                    filteredList = filteredList.filter(job => job.jobType === selectedJobType);
                }

                setjobList(filteredList);

                // Show error popup if no jobs with the selected status on the current page
                if (selectedStatusFilter !== "") {
                    const errorMessage = getStatusErrorMessage(selectedStatusFilter);
                    setErrorPopupMessage(errorMessage);
                    setErrorPopupVisible(filteredList.length === 0);
                } else {
                    setErrorPopupVisible(false);
                }
            } catch (error) {
                console.error("Error fetching job list:", error);
            }
        };

        jobfetch();
    }, [selectedStatusFilter, selectedJobType]);


    const getStatusErrorMessage = (status) => {
        
        switch (status) {
            case "P":
                return "In this page, all jobs are fully completed. No 'InProgress' jobs found here. Please check on the next page.";
            case "M":
                return "In this page, all jobs are fully Automatic. No 'Manual' jobs found here. Please check on the next page.";
            case "A":
                return "In this page, all jobs are fully Manual. No 'Automatic' jobs found here. Please check on the next page.";
            case "Y":
                return "In this page, all jobs are fully InProgress. No 'Completed' jobs found here. Please check on the next page.";
            default:
                return "";
        }
    };
    
   
    useEffect(() =>{getSigmaConfigcolumns()},[])

    const getSigmaConfigcolumns = async() =>{
        let colmData = ["id","jobName","status","errorSummary","companyCode","runStartTime","runCompletionTime","noOfRecordsProcessed","jobRunByUser","latestDocumentDate","jobType"]
        // console.log("columnData",columnData)
        setColumnValue(colmData);
    }

    const paginationProcess = async (start, limit) => {
        setStartValue(start);
        if (selectedValues[0]) {
            let tnId = await getTennantId();
            let joblisted = await getJobList(tnId, start, limit);
            await handlefatchforPagination(selectedValues, joblisted);
        }
        let tnId = await getTennantId();
        try {
            const response = await getJobList(tnId, start, limit);
            setjobList(response);
            if (response.length === 0) {
                setReachedLastPage(true);
            } else {
                setReachedLastPage(false);
            }
        } catch (error) {
            console.error("Error fetching job list:", error);
        }
        setlimit(limit);
        setActive("active");
    };
    

    const resetColumn = async(value) =>{
        handleShow();
        setSelectedValues([])
        setSeValue(value);
        setResetclear(false);
        setSearch1('')
    }
    useEffect(() => {
        userdata();
      }, []);
      
      const userdata = async () => {
        let algoAddress = localStorage.getItem("UserID");
        let networkType = "type";
        let walletType = "ListJobs";
      
        try {
          await createUserVisits(algoAddress, networkType, walletType);
          console.log("Update successful3");
        } catch (error) {
          console.error("Error updating:", error);
        }
      };
      const handleFilterJobType = (jobType) => {
        console.log("Filtering by job type:", jobType);
        setSearch1(""); // Clear the search query when changing job type filter
        const filteredJobLists = jobLists.filter((job) => {
            if (jobType === "All") {
                return true;
            }
            return job.jobType === jobType;
        });
        setsearchDetails(filteredJobLists);
    };
    return ( 
        <div>
            <Row className="mb-2">
                <Col md={6} xl={4} xxl={3}>
                    <h4 className="page-title mb-0">All Jobs Detail</h4>
                </Col>
            </Row>
            
            <Row className="mb-20" style={{minHeight: '40px'}}>
                <Col xs={8} md={4} className="d-flex align-items-center">
                    <h6 className="me-3 mb-0 text-muted">Versions:</h6>
                    <Dropdown size="sm" className="me-2">
                        <Dropdown.Toggle variant="gray" className="rounded-pill" id="dropdown-basic">
                        {SeValue?SeValue : '23R1'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-filter">
                        <Dropdown.Item onClick={()=>resetColumn("23R1")} >23R1</Dropdown.Item>
                            <Dropdown.Item onClick={()=>resetColumn("Veeva v2")} >Veeva v2</Dropdown.Item>
                            <Dropdown.Item onClick={()=>resetColumn("Veeva v3")} >Veeva v3</Dropdown.Item>
                            <Dropdown.Item onClick={()=>resetColumn("Veeva v4")} >Veeva v4</Dropdown.Item>
                            <Dropdown.Item onClick={()=>resetColumn("Veeva v5")} >Veeva v5</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                
                <Col xs={'auto'} className="ms-md-0 ms-auto order-md-1">
                <Dropdown size="sm">
    <Dropdown.Toggle variant="gray" id="dropdown-basic">
        Status
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-filter">
        <Dropdown.Item onClick={() => handleFilterStatus("")}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterStatus("Y")}>Completed</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterStatus("P")}>InProgress</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
                    </Col>

                <Col xs={'auto'} className="ms-md-0 ms-auto order-md-1">
                <Dropdown size="sm">
    <Dropdown.Toggle variant="gray" id="dropdown-basic">
        Job Type
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-filter">
    <Dropdown.Item onClick={() => setSelectedJobType("All")}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedJobType("Yes")}>Manual</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedJobType("No")}>Automatic</Dropdown.Item>
    </Dropdown.Menu>
</Dropdown>
                </Col>

                <Col md={4} lg={3} className="ms-auto mt-md-0 mt-2 mb-md-0 mb-3">
                    {search && (
                       <Form>
                       <InputGroup className="form-search shadow">
                           <Button variant="reset" id="button-addon1">
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                   {/* Search icon */}
                               </svg>
                           </Button>
                           <Form.Control
                               aria-describedby="basic-addon1"
                               aria-label="Write something to search"
                               placeholder="Write something to search..."
                               value={search1}
                               onChange={(e) => handleSearch(e.target.value)}
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
                      
                            {selectedColumns[0] ? 
                            (<>
                            {selectedColumns.map((r,i)=>{
                                return(
                                    <th className="text-center">{r}</th>
                                )
                            })}
                            </>):(<>
                                <th className="text-center">Job Id</th>
                            <th className="text-center">Job Name</th>
                            <th className="text-center">Job Run By</th>
                            <th className="text-center">Company</th>
                            <th className="text-center">Start Time</th>
                            <th className="text-center">Completion Time</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Job Type</th>
                            </>)}
                            
                        </tr>
                    </thead>
                    <tbody>

                    {/* {Selectedcolm[0] ? */}
                     {selectedfetch ?
                     (<>
                      
                      {Selectedcolm.map((r,i) =>{
                       
                                return(
                                    <tr>
                                        {r.map((x,y)=>{
                                            return(<>
                                              
                                            <td className="text-center text-capitalize ">{x}</td>
                                            </>
                                            )
                                        })}
                                </tr>
                                );
                      
                        })}
                     </>):(<>
                      {jobLists[0] === null || jobLists[0] === "" || jobLists[0] === undefined ?
                        (<>
                        </>):
                        (<>
                        {jobLists.map((r,i) =>{
                          
                                return(
                                    <tr key={i}>
                                    <td className="text-center">{r.id}</td>
                                    <td className="text-center">{r.jobName === "DOC_FETCH" ? "Resource persist job": "Immutable record job"}</td>
                                    <td className="text-center">{r.jobRunByUser}</td>
                                    <td className="text-center">{r.companyCode}</td>
                                    <td className="text-center">{r.runStartTime}</td>
                                    <td className="text-center">{r.runCompletionTime}</td>
                                    <td className="text-center">{r.status === "Y" ? "Completed" : "InProgress"}</td>
                                    <td className="text-center">{r.jobType === "Yes" ? "Manual" : "Automatic"}</td>
                                </tr>
                                )
                           
                        })}
                        </>)}
                     </>)     
                     }      
                    </tbody>
                </Table>

                <Row className="mt-4">
                    
                    {/* Status */}

                    <Col md={8} className="d-flex justify-content-md-end justify-content-center">
                        <ul className="d-flex pagination list-unstyled">
                            <li>
                                <Link   className={StartValue !== 0 ? 'next' : StartValue === 0 ? 'prev disabled' : ''} onClick={()=>paginationProcess(StartValue-10,10)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                    </svg>
                                </Link>
                            </li>
                            <li><Link className='active' onClick={()=>paginationProcess(0,10)} >{StartValue?(StartValue/10)+1:'1'}</Link></li>
                            <li>
                                {/* <Link {`next ${reachedLastPage ? 'disabled' : ''}`} onClick={()=> { if (!reachedLastPage) {paginationProcess(StartValue+15,15)} className="next"> */}
                                <Link className={`next ${reachedLastPage ? 'disabled' : ''}`}onClick={() => { if (!reachedLastPage) { paginationProcess(StartValue+10,10)}  }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>

            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Manage columns</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-4 justify-content-between">
                        <Col md={6} className="py-1 mb-md-0 mb-2">
                            <h6 className="mb-2">Available columns:</h6>
                
                            <Card>
                                <Card.Header className="border-0">
                                    <h5 className="d-flex align-items-center"><img src={CheckBox} alt="CheckBox" className="me-2" /> {selectedValues?.length} {selectedValues?.length < 2 ? 'item' : 'items' } selected</h5>

                                    <InputGroup className="form-search shadow border">
                                        <Form.Control
                                            aria-describedby="basic-addon1"
                                            aria-label="Write something to search"
                                            placeholder="Search columns..."
                                            className="ps-3"
                                            onChange={(e) => handleSearch(e.target.value)}
                                        />
                                        <Button variant="reset"  id="button-addon1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                            </svg>
                                        </Button>
                                    </InputGroup>
                                </Card.Header>
                                <Card.Body className="pt-0">
                                    {data?.filter((item) => item.toLowerCase().includes(search1))?.map((item, index) => (
                                        <div key={index} className={`mb-1 d-flex`}>
                                            <Form.Check
                                                className="mb-0"
                                                type='checkbox'
                                                id={`default-${index}`}
                                                label={item}
                                                value={item}
                                               checked={selectedValues.includes(item)}
                                                onChange={() => handleCheckboxClick(item)}
                                            />
                                        </div>
                                    ))}                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="py-1">
                            <h6 className="mb-2">Selected Columns:</h6>
                            
                            <Card>
                                <Card.Body>
                                    <ul className="selected-list list-unstyled d-flex flex-wrap">
                                        {selectedValues?.map((item, index) => (
                                            <li key={index}><Button variant="outline-gray">{item}</Button></li>
                                        ))}
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Row>
                                <Col xs={6}>
                                    <Button type="submit" variant="dark" className="w-100 btn-button" onClick={()=>handlefatch(selectedValues)}>Fetch</Button>
                                </Col>
                                <Col xs={6}>
                                    <Button type="reset" onClick={()=>setSelectedValues([])} variant="outline-dark" className="w-100 btn-button">Reset</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            {/* <Modal show={errorPopupVisible} onHide={() => setErrorPopupVisible(false)} centered> */}
            <Modal show={errorPopupVisible} onHide={() => setErrorPopupVisible(false)} centered>
    <Modal.Header closeButton>
        <Modal.Title>Status Not Found</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {errorPopupMessage}
    </Modal.Body>
    <Modal.Footer>
        <div className="text-center">
            <Button variant="primary" onClick={() => setErrorPopupVisible(false)}>
                OK
            </Button>
        </div>
    </Modal.Footer>
</Modal>
        </div>
     );
}

export default JobDetails;