import { Button, Form } from 'react-bootstrap';
import Logo from '../asserts/images/logo.svg';
import { OrgAdminmailcheckget1,Orgadminsignup } from "../apifunction";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function SignInwithEnterpriseSSO() {
  const [email, setEmail] = useState('');
  //const [emailId, setemailId] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      let [emailValid, data2] = await OrgAdminmailcheckget1(email);
      console.log("emailValid", emailValid);

      let signupuser1 = await Orgadminsignup(localStorage.getItem('UserID'), password ,"Okta");
      console.log("checksignup1", signupuser1);

      if (emailValid === true) {
        localStorage.setItem("Login", true);
        localStorage.setItem("Email", email);
        
        // Code to execute after the login information is stored successfully
        
        history(`/user?id=${email}`);
      } else {
        // Code to execute if email is not valid
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
            <img className='img-fluid' src={Logo} alt="logo" />
          </div>
          <div className='mb-4'>
            <h2 className='mb-2'>Sign in with Enterprise SSO</h2>
          </div>
          <Form.Group className="mb-5" controlId="form.ControlInput1">
            <Form.Control
              type="email"
              placeholder="example@me.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          {/* Removed the password input field */}
          <Button className='btn-button w-100 mb-4' variant="dark" onClick={handleLogin}>
        
          PROCEED TO LOGIN
        
           
          </Button>
          <p>No organization alias? <Link to="/" className='btn-link'>Login here</Link></p>

         
        </div>
      </div>
    </div>
  );
}

export default SignInwithEnterpriseSSO;
