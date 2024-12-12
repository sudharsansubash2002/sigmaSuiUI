import { useContext } from "react"
import { Button, Form } from 'react-bootstrap';
import Logo from '../asserts/images/logo.svg'
import {OrgAdminmailcheckget1} from "../apifunction";
import { Link,Redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import React,{ useState,useRef, useEffect } from "react";
import { OktaAuth } from '@okta/okta-auth-js';
import AuthContext from "./AuthContext";
import SignInwithEnterpriseSSO from "./SignInwithEnterpriseSSO";

const oktaAuth = new OktaAuth({
    issuer: 'https://dev-14662214.okta.com/oauth2/default',
    clientId: '0oaavk9mjvBQORadI5d7',
    redirectUri: window.location.origin + '/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
  });
  const User = (props)=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    const { login } = useContext(AuthContext);
    const location = useLocation();

   
    const [search, setSearch] = useState(false);
    const searchParams = new URLSearchParams(location.search);
    console.log("all",searchParams);
    const id = searchParams.get('id');
    console.log("hello",id);
   
   

  
    const handleLogin = async (event) => {
    
        
      if (event) {
        event.preventDefault();
      }
  
      try {
        // Authenticate user with Okta
        const transaction = await oktaAuth.signInWithCredentials({
          username:id,
          password
        });
  
        if (transaction.status === "SUCCESS") {
          // let [emailvalid, data2] = await OrgAdminmailcheckget1(email);
          // console.log("emailvalid1", emailvalid);
  
          // if (emailvalid === true) {
         
          // Code to execute after the login information is stored successfully
          localStorage.setItem("Login",true)
            localStorage.setItem("UserID",id);
          history("/");
          setTimeout(() => {
            window.location.reload();
          }, 1000); 
          // } else {
          //   // Code to execute if email is not valid
          // }
        } else {
          // Authentication failed
          console.log("Authentication failed");
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
  
    return (
      <div className="vh-100 d-flex py-md-4 py-2 w-100">
        <div className="container my-auto">
          <div className="user-card overflow-hidden">
            <div className="user-card-logo mb-4 text-center">
              <img className="img-fluid" src={Logo} alt="logo" />
            </div>
            <div className="mb-4">
              <h2 className="mb-2">Sign in with Enterprise SSO</h2>
            </div>
            {/* mb-4 */}
            {/* <Form.Group className="mb-5" controlId="form.ControlInput1">
              <Form.Control
                type="email"
                placeholder="example@me.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group> */}
            <Form.Group className="mb-5" controlId="form.ControlInput1">
              <Form.Control
                type="password"
                placeholder="Enter a Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            {/* mb-4 */}
           < Button className='btn-button w-100 mb-4' variant="dark" onClick={(event) => handleLogin(event, id)}>
            
        
        PROCEED TO LOGIN
      
         
        </Button>
            {/* <p>
              No organization alias?{" "}
              <Link to="/sign-in" className="btn-link">
                Login here
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    );
  }
  
  export default User;
  