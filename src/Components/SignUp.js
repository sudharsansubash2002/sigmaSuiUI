// import { Link } from 'react-router-dom';
import { Button, Col, Form, OverlayTrigger, Row, Tooltip ,Alert} from 'react-bootstrap';
import Logo from '../asserts/images/logo.svg'
import Google from '../asserts/images/google-icon.svg'
import SSO from '../asserts/images/sso-icon.svg'

import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import React, { useState,useEffect } from 'react';
import { Link,useNavigate,Redirect, useLocation } from "react-router-dom";
// import AuthContext from "./AuthContext";
// import useIdle from "./useIdleTimeout";
// import { useContext } from "react"
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
// import { Container, Modal } from "react-bootstrap";
// import { Col, Row,Button,Alert} from "react-bootstrap";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import {CreateOrganizationPost,CreateOrguserrolepost,userprofileget,OrgAdminmailcheckget1,Orgadminsignup,OrgAdminmailcheckget,Userprofileupload,Orguserlogincheck,OrgPwdCheck} from '../apifunction';



function SignUp() {
    const navigate = useNavigate()
    const [pass, setPass] = useState(true);
    const [error, setError] = useState("")
    const [email, setEmail] = useState("");
    const [passwordnew, setPassword] = useState("");
    const [passwordconfirm, setPasswordconfirm] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastname, setlastName] = useState("");
    const submit = async () =>
    {       
      
     
         let [emailvalid,data2] = await OrgAdminmailcheckget1(email);
        //  console.log("pwdget1",emailvalid);
         let pwdget = await OrgPwdCheck(email);
         console.log("pwdget",pwdget);
         if (firstName === "" || firstName === null || firstName === undefined) {
            setError("Please enter your First Name!");
          } 
          else if (lastname === "" || lastname === null || lastname === undefined) {
            setError("Please enter your Last Name!");
          } 
          else if (email === null || email === "" || email === undefined) {
            setError("Please enter an Email ID!");
          }
           else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setError("Please enter a valid Email ID!");
          } 
          
          else if (passwordnew === null || passwordnew === "" || passwordnew === undefined) {
            setError("Please enter an Password!");
          }
          else if (passwordconfirm === null || passwordconfirm === "" || passwordconfirm === undefined) {
            setError("Please enter an Confirm Password!");
          }
          else if (emailvalid === true) {
            console.log("validcheck");
            console.log("pwdget",pwdget);
           
            if (pwdget=== "N") {
              if (passwordnew !== passwordconfirm) {
                setError("Password mismatch!");
              } else {
                let signupuser = await Orgadminsignup(email, passwordnew);
                console.log("checksignup", signupuser);

                let signupuser1 = await Orgadminsignup(localStorage.getItem('UserID'), data2.password ,"Google");
                console.log("checksignup1", signupuser1);
                if (signupuser === true) {
                  console.log("validcheck23");
                  let userprofileuploading1 = await Userprofileupload(firstName,lastname,email);
                  console.log(userprofileuploading1,userprofileuploading1)
                  toast.success("Account created Successfully");
                  navigate('/');
                  console.log("Account created Successfully");
                } else {
                  setError("An account with the given credentials already exists!");
                }
              }
            } else {
              setError("An account with the given credentials already exists!");
            }
          } else {
            setError("Your user account has not been created. Please contact the Business Administrator or System Administrator to add your account to the platform");
          }

          
    }
    const getprofiledetails = async(email) =>{
      localStorage.setItem("Login",true)
      localStorage.setItem("UserID",email);
        let [data,userprofiledetail]=await userprofileget(email);
        localStorage.setItem("UserName",userprofiledetail.firstName);
      
       
            
        // setgetIProfile(userprofiledetail);
        // console.log("userdetail1",userprofiledetail,userprofiledetail.emailId);
        // console.log("userdetail11",getIProfile.emailId,getIProfile.firstName);
        
       }
    return ( 
        <div className="vh-100 d-flex w-100">
    <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>

            <div className="container py-md-4 py-2 my-auto">
                <div className="user-card overflow-hidden">
                    <div className="user-card-logo text-center"><img className='img-fluid' src={Logo} alt="logo" /></div>
                    <div className='mb-3'>
                        <h2 className='mb-1'>Get Started</h2>
                        <p>Already have an account? <Link className='btn-link' to="/">Sign In</Link></p>
                    </div>
                    {/* mb-4 */}
                    <Row>
                    {error && <Alert variant="danger">{error}</Alert>}
                        <Col className="mb-2" sm={6} xs={12}>
                            <Form.Group controlId="form.ControlInput1">
                                <Form.Label className='text-muted'>First Name</Form.Label>
                                <Form.Control type="text" onChange={event => setfirstName(event.target.value)} placeholder="Enter your First Name" />
                            </Form.Group>
                        </Col>
                        <Col className="mb-2" sm={6} xs={12}>
                            <Form.Group controlId="form.ControlInput2">
                                <Form.Label className='text-muted'>Last Name</Form.Label>
                                <Form.Control type="text" onChange={event => setlastName(event.target.value)}placeholder="Enter your Last Name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-2" controlId="form.ControlInput3">
                        <Form.Label className='text-muted'>Email</Form.Label>
                        <Form.Control type="email" onChange={event => setEmail(event.target.value)}  placeholder="Enter your email" />
                    </Form.Group>
                    {/* mb-2 */}
                    <Form.Group className="mb-4" controlId="form.ControlInput4">
                        <Form.Label className='text-muted'>Password</Form.Label>
                        <Form.Control type="password"  onChange={event => setPassword(event.target.value)} placeholder="Choose a password (min 10 characters)" />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="form.ControlInput4">
                        <Form.Label className='text-muted'>Confirm Password</Form.Label>
                        <Form.Control type="password"  onChange={event => setPasswordconfirm(event.target.value)} placeholder="Enter your repeat password" />
                    </Form.Group>
                    {/* mb-2 */}
                    <Button className='btn-button w-100' variant="dark"onClick={()=>{submit()}}>Sign up</Button>

                    <div className='divider d-flex align-items-center'><span className='mx-auto'>Or</span></div>

                    <div className='mb-50'>
                        {/* <Button className='btn-access w-100 mb-2'><img src={Google} alt="Google icon" /> Sign in with Google </Button> */}
                        {/* <Button className='btn-access w-100 mb-2' onClick={() => history('/google')}>
  <img src={Google} alt="Google icon" /> Sign in with Google
    


</Button> */}

<Button className='btn-access w-100 mb-2'>
  <LoginSocialGoogle
    client_id="1049128880015-uv90shothrpgk5k786fplv6td0e2mjf1.apps.googleusercontent.com"
    scope="openid profile email"
    discoveryDocs="claims_supported"
    access_type="offline"
    onResolve={async ({ provider, data }) => {
      console.log("provider", provider, data.email);
      try {
        let [emailvalid, data2] = await OrgAdminmailcheckget1(data.email);
        console.log("emailvalid1", emailvalid);
        
        // if (emailvalid === true) {
        //     localStorage.setItem("Login",true)
        //     localStorage.setItem("UserID",data.email);
        //     let [data,userprofiledetail]=await userprofileget(data.email);
        //       localStorage.setItem("UserName",userprofiledetail.firstName);
        //   navigate("/home");
        // }

        if (emailvalid === true) {
          await getprofiledetails(data.email);
          navigate("/home");
          setTimeout(() => {
            window.location.reload();
          }, 1000); 
        }
        else{
          setError("Your user account has not been created. Please contact the Business Administrator or System Administrator to add your account to the platform");
        }
        
      } catch (error) {
        console.error(error);
      }
    }}
    onReject={(err) => {
      console.log(err);
    }}
  >
    <img src={Google} alt="Google icon" /> Sign in with Google
  </LoginSocialGoogle>
</Button>




                        <Link to="/sign-in-with-enterprise-sso"><Button className='btn-access w-100'><img src={SSO} alt="SSO icon" /> Sign in with Enterprise SSO</Button></Link>
                    </div>

                    {/* <div className='d-flex user-card-footer align-items-center justify-content-center'>
                        Sigma region: 
                        <Form.Select aria-label="Default">
                            <option>Default</option>
                            <option value="1">USA</option>
                            <option value="2">INDIA</option>
                            <option value="3">CANADA</option>
                        </Form.Select>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="button-tooltip">Hover Tooltip</Tooltip>}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                            </svg>
                        </OverlayTrigger>
                    </div> */}
                </div>
            </div>
        </div>
     );
}

export default SignUp;