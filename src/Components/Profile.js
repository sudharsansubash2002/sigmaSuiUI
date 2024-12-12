import { Button, Col, Form, Row } from "react-bootstrap";
import Avatar from "../asserts/images/avartar.png"
import ProfileHeader from "./Snippets/ProfileHeader";
import React, { useEffect,useState, useMemo } from 'react'
import countryList from 'react-select-country-list'
import ReactCountryFlag from "react-country-flag"
import {userprofileget,Userprofileupdate} from '../apifunction';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import TimezoneSelect from 'react-timezone-select';
import { Link,useHistory,useNavigate,Redirect,Navigate} from 'react-router-dom';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import Compress from "react-image-file-resizer";
function Profile() {
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const[getIProfile,setgetIProfile]=useState("");  
    const [language,setlanguage] = useState(""); 
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);  
    const navigate = useNavigate()

    const [UserName,setUserName] = useState("");
    const [timezoneselected, setTimezoneselected] = useState("");
    console.log("timezoneselected",timezoneselected);
    const [selectedTimezone, setSelectedTimezone] = useState('');
     
    const [Img,setImg] = useState("")    
    console.log("checkprofile1",getIProfile.profilePic)  
    console.log("checkprofile2",Img)  

    const [Imgname,setImgname] = useState("");
    const [mobno,setmobno] = useState("");   
    const [selectedCountry, setSelectedCountry] = useState(""); 
    const [gender,setgender] = useState("");    
    const [state,setState] = useState("");   
    const [lastname,setlastname] = useState("");
const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [editprofile,setEditprofile] = useState(false);
  
    const changeHandler = value => {
    setValue(value.target.value)
    // setCountry(value);
    console.log("country",country);

       }
    const handleSelectgender=(e)=>{   
        console.log("evaluegender",e)     
        setgender(e)
    }

    const handleSelectlanguage=(e)=>{   
        console.log("evalueeng",e)     
        setlanguage(e)
    }

    const selectCountry=(e)=>{  
        // setValue(value.target.value) 
        console.log("counvalue",e)     
        setCountry(e)
    }
    const selectRegion=(e)=>{   
        console.log("revalue",e)     
        setRegion(e)
    }
    const handleSelectMobileNumber = (e) => {
        console.log("mobno value", e);
        setmobno(e);
      };
    const handleTimezoneChange = (event) => {
        setTimezoneselected(event);
        console.log("timezoneselected1",timezoneselected);
      };
      console.log("timezoneselected11",timezoneselected.label);
    const captureFile =async(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        setImgname(file.name)
        let reader = new window.FileReader()
        try{
        Compress.imageFileResizer(file, 500, 500, 'JPEG', 200, 0,
        uri => {          
            setImg(uri)          
        },
        'base64'
        );
        reader.readAsArrayBuffer(file)        
        }catch (err) {      
        }
    }; 
    const getprofiledetails = async() =>{
        let [data,userprofiledetail]=await userprofileget(localStorage.getItem("UserID"));
        setgetIProfile(userprofiledetail);
        console.log("userdetail1",userprofiledetail,userprofiledetail.emailId);
        console.log("userdetail11",getIProfile.emailId,getIProfile.firstName);
        setSelectedCountry(value);
        setmobno(userprofiledetail.mobileNumber);
       }
       useEffect(()=>{
        if(!getIProfile)
        getprofiledetails()
       })


    const Save = async() =>{
        if (getIProfile.emailId){

        // if(lastname === null || lastname === "" || lastname === undefined){
                                         
        //     toast.warning(`please enter Social URL`,{autoClose:5000})
        //     handleHideLoad()
        // }
       
        if (mobno === null || mobno === "" || mobno === undefined) {
            // If mobno is empty, use the previously displayed mobile number
            const previousMobileNumber = getIProfile.mobileNumber;
            if (previousMobileNumber) {
              setmobno(previousMobileNumber);
              console.log("previous",mobno);
            } else {
              toast.warning(`please enter mobno`, { autoClose: 5000 });
              handleHideLoad();
              return; // Exit the function since mobile number is required
            }
          }
        else if(country === "" || country === null || country === undefined){
                                           
            toast.warning(`please enter country`,{autoClose:5000})
            handleHideLoad()
        }
        else if(region === "" || region === null || region === undefined){
                                        
            toast.warning(`please enter state`,{autoClose:5000})
            handleHideLoad()
        }
        else if(timezoneselected === "" || timezoneselected === null || timezoneselected === undefined){
                                      
            toast.warning(`please enter timezoneselected`,{autoClose:5000})
            handleHideLoad()
        }
        else if(Img === "" || Img === null || Img === undefined){
            // setissuesdisplay("please Upload Image")
            // setshowTestAlert(true)                                  
            toast.warning(`please Upload Image`,{autoClose:5000})
            handleHideLoad()
        }
     
        else{
            handleShowLoad()
            toast.dismiss()
            toast.success(`Updating profile Inprogress`,{autoClose:3000});  
            console.log("datapass",getIProfile.firstName,getIProfile.lastName,getIProfile.emailId,mobno,gender,country,region,timezoneselected.label
            ,language,Img);
            let Profileupdate= await Userprofileupdate(getIProfile.firstName,getIProfile.lastName,mobno,Img,gender,region,country,"English",timezoneselected.label
                ,getIProfile.emailId);
            console.log("updated successfully",Profileupdate);
            toast.success(`updated successfully`,{autoClose:3000});  
            navigate('/')
            toast.dismiss();
            handleHideLoad()
                                                             
            }    
        }
        else{
          toast.error("EmailId not found")
        }
    }   
    const clearImage = () =>{
        setImg("")
      }
    return ( 
        <div>
            <ProfileHeader />

            <main className="app-main">
                <div className="container">
                <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
                {getIProfile.launguage === null || getIProfile.launguage === "" || getIProfile.launguage === undefined ?(<>
                
                    <Row className="justify-content-center">
                        <Col lg={10} xl={9}>
                            <div className="d-flex mb-80 user-profile">

        <div className="me-3">
                                    
                                    <div className='upload-box text-center'>  

                                      {/* {getIProfile.profilePic === null || getIProfile.profilePic === "" || getIProfile.profilePic === undefined ?(<> */}
                                      
                                        {Img === null || Img === "" || Img === undefined ?(
                                        <>                                        
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload' className='p-2 label-upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p id="inputID">Support file : png/img</p>
                                        </label>
                                        </>
                                      ):(
                                        <>
                                       
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='Image Uploaded' className='p-2' >                                                                        
                                        <Button variant='link' className='p-0 text-blue btn-closeimg' onClick={()=>{clearImage()}}>
                                       
                                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi m-0 bi-x-circle-fill" viewBox="0 0 16 16">
                                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                       </svg>
                                   </Button> 
                                        <img src={Img} alt="Img" className='img-fluid w-100 rounded-16' />   
                                            
                                        </label>
                                        </>
                                      )}
                                      
                                      {/* </>):(<>
                                      
                                        <img src={getIProfile.profilePic} alt="Avatar" /> 
                                      
                                      
                                      </>)}                                   */}
                                   
                                        
                                    </div>                                
                                </div>
                            
                                <div className="d-flex flex-column justify-content-center">
                                    <h3>{localStorage.getItem("UserName")===""||localStorage.getItem("UserName")===null||localStorage.getItem("UserName")===undefined || !localStorage.getItem("UserName")? "UserName":localStorage.getItem("UserName")}</h3>
                                    <p>{localStorage.getItem("UserID")===""||localStorage.getItem("UserID")===null||localStorage.getItem("UserID")===undefined || !localStorage.getItem("UserID")? "Email":localStorage.getItem("UserID")}</p>
                                   
                                </div>

                                </div> 
                            

                            
                            <Row className="justify-content-between gx-xl-5">
                            <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>First Name</Form.Label>
                                        <Form.Control type="text" value={localStorage.getItem("UserName")===""||localStorage.getItem("UserName")===null||localStorage.getItem("UserName")===undefined || !localStorage.getItem("UserName")? "UserName":localStorage.getItem("UserName")} />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                    {getIProfile.lastName=== "" || getIProfile.lastName=== undefined || getIProfile.lastName=== null || getIProfile.lastName=== "" || getIProfile.lastName === undefined || getIProfile.lastName === null ? (   <> <Form.Label className='text-muted'>Last Name</Form.Label>
                                        <Form.Control type="text" onChange={event => setlastname( event.target.value)} /></>):
                                        ( <>  <Form.Label className='text-muted'>Last Name</Form.Label>
                                        <Form.Control type="text" value={getIProfile.lastName} /></>  )}

                                    
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                    {getIProfile.mobileNumber === "" || getIProfile.mobileNumber=== undefined || getIProfile.mobileNumber === null || getIProfile.mobileNumber === "" || getIProfile.mobileNumber === undefined || getIProfile.mobileNumber === null ? (
                                  <>
                                   <Form.Label className='text-muted'>Contact No</Form.Label>
                                        <Form.Control type="number"  onChange={(e) => handleSelectMobileNumber(e.target.value)}
    />
                                  </>  ):(<>
                                    <Form.Label className='text-muted'>Contact No</Form.Label>
                                   <Form.Control type="number"  value={getIProfile.mobileNumber} />
                                  </>)}
                                       
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>Gender</Form.Label>

    <Form.Select className="form-control" aria-label="Default select example"  value={gender}   onChange={(event)=>{handleSelectgender(event.target.value)} }>
                                            <option>I would prefer not to say</option>
                                            <option value="Male">Male </option>
                                            <option value="Female">Female</option>
                                            <option value="Transgender">Transgender</option>
                                            <option value="Non-binary/non-conforming">Non-binary/non-conforming</option>
                                        </Form.Select>


                                       
                                    </Form.Group>
                                </Col>

                           
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>Country/Region</Form.Label>
                                      
                                        <CountryDropdown  
                                                defaultOptionLabel="Select a country"
                                                value={country}
                                                onChange={selectCountry}
                                                className="form-control form-select" />
                                       
                                    </Form.Group>
                                </Col>

                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>State</Form.Label>
                                     
                                        <RegionDropdown 
  blankOptionLabel="No country selected."
  defaultOptionLabel="Now select a region."
  country={country}
  value={region}
  onChange={selectRegion}
  className="form-control form-select" />
  
   
                                        
                                        
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                    
                                        <Form.Label className='text-muted'>Language</Form.Label>
                                        {/* {getIProfile.launguage === "" || getIProfile.launguage === undefined || getIProfile.launguage === null || getIProfile.launguage=== "" || getIProfile.launguage=== undefined || getIProfile.launguage === null ? ( */}
                                   
                                    <Form.Select className="form-control" aria-label="Default select example" value={language}   onChange={(event)=>{handleSelectlanguage(event.target.value)} }>
                                            
                                            <option value="English">English</option>
                                            {/* <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option> */}
                                        </Form.Select>
                                    
                                    
                                        
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6} >
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>Time Zone</Form.Label>
                                        {getIProfile.timeZone === "" || getIProfile.timeZone === undefined || getIProfile.timeZone === null || getIProfile.timeZone === "" || getIProfile.timeZone === undefined || getIProfile.timeZone === null ? (
                                      <TimezoneSelect 
                                    //   name="timezone"
                                            className="time-zone"
                                      value={timezoneselected}
                                      onChange={handleTimezoneChange}
                                  
                                    /> ):(  <Form.Control type="text" value={getIProfile.timeZone} />)}
                                      
                                    </Form.Group>
                                </Col>

                                
                                <Col className="mb-2" sm={6}>
                                    <Row>
                                        <Col xs={6}>
                                            <Button variant="dark" className="w-100 btn-button" onClick={()=>{Save()}}>Save</Button>
                                        </Col>
                                        <Col xs={6}>
                                            <Button variant="outline-dark" className="w-100 btn-button"   onClick={()=>{navigate('/')}}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                
                            </>):(<>
                {editprofile===false?(<>
                    <Row className="justify-content-center">
                        <Col lg={10} xl={9}>
                            <div className="d-flex mb-80 user-profile">

                          <div className="me-3">
                                    
                                    <div className='upload-box text-center'>  

                                      {getIProfile.profilePic === null || getIProfile.profilePic === "" || getIProfile.profilePic === undefined ?(<>
                                      
                                        {Img === null || Img === "" || Img === undefined ?(
                                        <>                                        
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload' className='p-2 label-upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p id="inputID">Support file : png/img</p>
                                        </label>
                                        </>
                                      ):(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='Image Uploaded' className='p-2' >                                                                        
                                        <Button variant='link' className='p-0 text-white btn-closeimg' onClick={()=>{clearImage()}}>
                                       
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi m-0 bi-x-circle-fill" viewBox="0 0 16 16">
                                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                            </svg>
                                        </Button> 
                                        <img src={Img} alt="Img" className='img-fluid w-100 rounded-16' />            
                                        </label>
                                        </>
                                      )}
                                      
                                      </>):(<>
                                      
                                        <img src={getIProfile.profilePic} alt="Avatar" /> 
                                      
                                      
                                      </>)}                                  
                                   
                                        
                                    </div>                                
                                </div>
                            
                                <div className="d-flex flex-column justify-content-center">
                                    <h3>{localStorage.getItem("UserName")===""||localStorage.getItem("UserName")===null||localStorage.getItem("UserName")===undefined || !localStorage.getItem("UserName")? "UserName":localStorage.getItem("UserName")}</h3>
                                    <p>{localStorage.getItem("UserID")===""||localStorage.getItem("UserID")===null||localStorage.getItem("UserID")===undefined || !localStorage.getItem("UserID")? "Email":localStorage.getItem("UserID")}</p>
                                   
                                </div>

                                </div> 
                            

                            
                            <Row className="justify-content-between gx-xl-5">
                            <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>First Name</Form.Label>
                                        <Form.Control type="text" value={localStorage.getItem("UserName")===""||localStorage.getItem("UserName")===null||localStorage.getItem("UserName")===undefined || !localStorage.getItem("UserName")? "UserName":localStorage.getItem("UserName")} />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                    {getIProfile.lastName=== "" || getIProfile.lastName=== undefined || getIProfile.lastName=== null || getIProfile.lastName=== "" || getIProfile.lastName === undefined || getIProfile.lastName === null ? (  
                                         <> <Form.Label className='text-muted'>Last Name</Form.Label>
                                        <Form.Control type="text" onChange={event => setlastname( event.target.value)} /></>):
                                        ( <>  <Form.Label className='text-muted'>Last Name</Form.Label>
                                        <Form.Control type="text" value={getIProfile.lastName} /></>  )}

                                    
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                    {getIProfile.mobileNumber === "" || getIProfile.mobileNumber=== undefined || getIProfile.mobileNumber === null || getIProfile.mobileNumber === "" || getIProfile.mobileNumber === undefined || getIProfile.mobileNumber === null ? (
                                  <>
                                   <Form.Label className='text-muted'>Contact No</Form.Label>
                                        <Form.Control type="number"  onChange={(e) => handleSelectMobileNumber(e.target.value)}
    />
                                  </>  ):(<>
                                    <Form.Label className='text-muted'>Contact No</Form.Label>
                                   <Form.Control type="number"  value={getIProfile.mobileNumber} />
                                  </>)}
                                       
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>Gender</Form.Label>
{getIProfile.gender === "" || getIProfile.gender === undefined || getIProfile.gender === null || getIProfile.gender=== "" || getIProfile.gender === undefined || getIProfile.gender === null ? (<>

    <Form.Select className="form-control" aria-label="Default select example"  value={gender} >
                                            {/* <option>I would prefer not to say</option>
                                            <option value="1">Male </option>
                                            <option value="2">Female</option>
                                            <option value="3">Transgender</option>
                                            <option value="4">Non-binary/non-conforming</option> */}
                                        </Form.Select>
</>):(<>
    <Form.Select className="form-control" aria-label="Default select example" >
                                            <option>{getIProfile.gender}</option>
                                            {/* <option value="1">Male </option>
                                            <option value="2">Female</option>
                                            <option value="3">Transgender</option>
                                            <option value="4">Non-binary/non-conforming</option> */}
                                        </Form.Select>

</>)}

                                       
                                    </Form.Group>
                                </Col>

                               
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>Country/Region</Form.Label>
                                      
                                        <CountryDropdown  
                                                defaultOptionLabel="Select a country"
                                                value={getIProfile.country}
                                                // onChange={selectCountry}
                                                className="form-control form-select" />
                                       
                                    </Form.Group>
                                </Col>

                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>State</Form.Label>
                                       
                                        <RegionDropdown 
 blankOptionLabel={getIProfile.state}
defaultOptionLabel= {getIProfile.state}
 country={country}
//   value={getIProfile.state}
//   onChange={selectRegion}
  className="form-control form-select" />
  
   
    
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                    
                                        <Form.Label className='text-muted'>Language</Form.Label>
                                        {/* {getIProfile.launguage === "" || getIProfile.launguage === undefined || getIProfile.launguage === null || getIProfile.launguage=== "" || getIProfile.launguage=== undefined || getIProfile.launguage === null ? ( */}
                               
                                    
                                    
                                        <Form.Select className="form-control" aria-label="Default select example">
                                            <option >{getIProfile.launguage}</option>
                                         
                                        </Form.Select>
                            
                                        
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6} >
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>Time Zone</Form.Label>
                                        {getIProfile.timeZone === "" || getIProfile.timeZone === undefined || getIProfile.timeZone === null || getIProfile.timeZone === "" || getIProfile.timeZone === undefined || getIProfile.timeZone === null ? (
                                      <TimezoneSelect 
                                    //   name="timezone"
                                    className="time-zone"
                                      value={timezoneselected}
                                      onChange={handleTimezoneChange}
                                  
                                    /> ):(  <Form.Control type="text" value={getIProfile.timeZone} />)}
                                      
                                    </Form.Group>
                                </Col>

                                
                                <Col className="mb-2" sm={6}>
                                    <Row>
                                        <Col xs={6}>
                                            <Button variant="dark" className="w-100 btn-button" onClick={()=>{setEditprofile(true)}}>Edit</Button>
                                        </Col>
                                        <Col xs={6}>
                                            <Button variant="outline-dark" className="w-100 btn-button" onClick={()=>{navigate('/')}}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                
                </>):(<>
                
                    <Row className="justify-content-center">
                        <Col lg={10} xl={9}>
                            <div className="d-flex mb-80 user-profile">

        <div className="me-3">
                                    
                                    <div className='upload-box text-center'>  

                                      {/* {getIProfile.profilePic === null || getIProfile.profilePic === "" || getIProfile.profilePic === undefined ?(<> */}
                                      
                                        {Img === null || Img === "" || Img === undefined ?(
                                        <>                                        
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload' className='p-2 label-upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p id="inputID">Support file : png/img</p>
                                        </label>
                                        </>
                                      ):(
                                        <>
                                       
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='Image Uploaded' className='p-2' >                                                                        
                                        <Button variant='link' className='p-0 text-blue btn-closeimg' onClick={()=>{clearImage()}}>
                                       
                                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi m-0 bi-x-circle-fill" viewBox="0 0 16 16">
                                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                       </svg>
                                   </Button> 
                                        <img src={Img} alt="Img" className='img-fluid w-100 rounded-16' />   
                                            
                                        </label>
                                        </>
                                      )}
                                      
                                      {/* </>):(<>
                                      
                                        <img src={getIProfile.profilePic} alt="Avatar" /> 
                                      
                                      
                                      </>)}                                   */}
                                   
                                        
                                    </div>                                
                                </div>
                            
                                <div className="d-flex flex-column justify-content-center">
                                    <h3>{localStorage.getItem("UserName")===""||localStorage.getItem("UserName")===null||localStorage.getItem("UserName")===undefined || !localStorage.getItem("UserName")? "UserName":localStorage.getItem("UserName")}</h3>
                                    <p>{localStorage.getItem("UserID")===""||localStorage.getItem("UserID")===null||localStorage.getItem("UserID")===undefined || !localStorage.getItem("UserID")? "Email":localStorage.getItem("UserID")}</p>
                                   
                                </div>

                                </div> 
                            

                            
                            <Row className="justify-content-between gx-xl-5">
                            <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>First Name</Form.Label>
                                        <Form.Control type="text" value={localStorage.getItem("UserName")===""||localStorage.getItem("UserName")===null||localStorage.getItem("UserName")===undefined || !localStorage.getItem("UserName")? "UserName":localStorage.getItem("UserName")} />
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                    {getIProfile.lastName=== "" || getIProfile.lastName=== undefined || getIProfile.lastName=== null || getIProfile.lastName=== "" || getIProfile.lastName === undefined || getIProfile.lastName === null ? (   <> <Form.Label className='text-muted'>Last Name</Form.Label>
                                        <Form.Control type="text" onChange={event => setlastname( event.target.value)} /></>):
                                        ( <>  <Form.Label className='text-muted'>Last Name</Form.Label>
                                        <Form.Control type="text" value={getIProfile.lastName} /></>  )}

                                    
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                    
                                   <Form.Label className='text-muted'>Contact No</Form.Label>
                                        <Form.Control type="number"  onChange={(e) => handleSelectMobileNumber(e.target.value)}
    />
                                 
                                       
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>Gender</Form.Label>

                                        <Form.Select className="form-control" aria-label="Default select example"  value={gender}   onChange={(event)=>{handleSelectgender(event.target.value)} }>
                                            <option>I would prefer not to say</option>
                                            <option value="Male">Male </option>
                                            <option value="Female">Female</option>
                                            <option value="Transgender">Transgender</option>
                                            <option value="Non-binary/non-conforming">Non-binary/non-conforming</option>
                                        </Form.Select>             
                                    </Form.Group>
                                </Col>

                           
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>Country/Region</Form.Label>
                                      
                                        <CountryDropdown  
                                                defaultOptionLabel="Select a country"
                                                value={country}
                                                onChange={selectCountry}
                                                className="form-control form-select" />
                                       
                                    </Form.Group>
                                </Col>

                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>State</Form.Label>
                                     
                                        <RegionDropdown 
  blankOptionLabel="No country selected."
  defaultOptionLabel="Now select a region."
  country={country}
  value={region}
  onChange={selectRegion}
  className="form-control form-select" />
  
   
                                        
                                        
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6}>
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                    
                                        <Form.Label className='text-muted'>Language</Form.Label>
                                        {/* {getIProfile.launguage === "" || getIProfile.launguage === undefined || getIProfile.launguage === null || getIProfile.launguage=== "" || getIProfile.launguage=== undefined || getIProfile.launguage === null ? ( */}
                                   
                                    <Form.Select className="form-control" aria-label="Default select example" value={language}   onChange={(event)=>{handleSelectlanguage(event.target.value)} }>
                                            
                                            <option value="English">English</option>
                                            {/* <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option> */}
                                        </Form.Select>
                                    
                                    
                                        
                                    </Form.Group>
                                </Col>
                                <Col className="mb-2" sm={6} >
                                    <Form.Group className="mb-2" controlId="form.ControlInput1">
                                        <Form.Label className='text-muted'>Time Zone</Form.Label>
                                      <TimezoneSelect 
                                    //   name="timezone"
                                    className="time-zone"
                                      value={timezoneselected}
                                      onChange={handleTimezoneChange}
                                  
                                       />
                                      
                                    </Form.Group>
                                </Col>

                                
                                <Col className="mb-2" sm={6}>
                                    <Row>
                                        <Col xs={6}>
                                            <Button variant="dark" className="w-100 btn-button" onClick={()=>{Save()}}>Update</Button>
                                        </Col>
                                        <Col xs={6}>
                                            <Button variant="outline-dark" className="w-100 btn-button"onClick={()=>{setEditprofile(false)}}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                
                
                
                </>)}
                 
                </>)}

                    
                </div>
            </main>
        </div>
     );
}

export default Profile;