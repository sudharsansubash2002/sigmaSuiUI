import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import Logo from '../asserts/images/logo.svg';
import { resetPasswordSubmit } from "../apifunction";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ResetPasswordSubmit() {
    const [email, setEmail] = useState();
    const [newPassword, setNewPassword] = useState();
    const [reNewPassword, setReNewPassword] = useState();
    const [otp, setOtp] = useState();
    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    const submitMail = async() =>
    {
        if(newPassword === reNewPassword)
        {
            setErr(false);
            let result = await resetPasswordSubmit(email, newPassword, otp);
            if(result === true)
            {
                toast.success("Password updated. Redirecting to sign-in");
                await sleep(5000);
                navigate("/")
            }
            else
                toast.error("Please check Email or OTP");
        }
        else
        {
            setErr(true);
        }
    }
    return ( 
        <div className="vh-100 d-flex py-md-4 py-2 w-100">
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
            <div className="container my-auto">
                <div className="user-card overflow-hidden">
                    <div className="user-card-logo text-center"><img className='img-fluid' src={Logo} alt="logo" /></div>
                    <div className='mb-4'>
                        <h2 className='mb-2'>Reset password verification</h2>
                        {/* <p>Reset password verification</p> */}
                    </div>
                    {/* mb-4 */}
                    <Form.Group className="mb-3" controlId="form.ControlInput1">
                        <Form.Label className='text-muted'>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Enter your Email-id" onChange={event => setEmail(event.target.value)}/>
                        <br/>
                        <Form.Label className='text-muted'>OTP</Form.Label>
                        <Form.Control required type="number" placeholder="Enter your OTP" onChange={event => setOtp(event.target.value)}/>
                        <br/>
                        <Form.Label required className='text-muted'>New password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your new password" onChange={event => setNewPassword(event.target.value)}/>
                        <br/>
                        <Form.Label required className='text-muted'>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter your new password" onChange={event => setReNewPassword(event.target.value)}/>
                    </Form.Group>
                    {err ? <p style={{color: "red"}}>Passwords does not match</p> : <></>}
                    {/* mb-3 */}
                    <Button className='btn-button w-100' variant="dark" onClick={() => submitMail()}>Submit</Button>
                </div>
            </div>
        </div>
     );
}

export default ResetPasswordSubmit;