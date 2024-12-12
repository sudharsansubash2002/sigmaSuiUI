import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { getTennantId, getNotificationById1, getNotificationById2, getNotificationById3, getNotificationById4,OrgTenentcheckget } from '../apifunction';
import Question from '../asserts/images/question-icon.svg';
import { ToastContainer, Zoom, toast} from 'react-toastify';

function NotifyDetails() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdateUserPopup, setShowUpdateUserPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [updateUserEmail, setUpdateUserEmail] = useState('');
  const [userManage, setUserManage] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState();
  const [pageSize, setPageSize] = useState(0);  
  const[user,setUser]  = useState();

  const handleUpdateUserButtonClick = () => {
    setShowUpdateUserPopup(true);
  };

  const handleUpdateUserPopupClose = () => {
    setShowUpdateUserPopup(false);
    setUpdateUserEmail(''); // Clear the email input field on close
  };

  const handleUpdateUserEmailChange = (e) => {
    setUpdateUserEmail(e.target.value);
  };

  const handlePopupShow = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const Users = async () => {
    try{
        let tenantid = await getTennantId(localStorage.getItem('UserID'));
        let [value, data] = await OrgTenentcheckget(tenantid, pageSize);  

    setUser(data);

    console.log("details",data);
    }catch(err){
        console.error(err);
    }
}

useEffect(() => {
    Users();
}, [])



//   const newUsers = async () => {
//     user.map((r,i)=>{
//         if(r.emailId===email){
//             console.log("true")  
//         }
//     })
//     const emailId = localStorage.getItem("UserID");
//     const tennantId = await getTennantId(emailId);
    

//     try {
//       let orguser = await getNotificationById2(email, tennantId);
//       console.log("Orguser", orguser);
//       setEmail('');
//       handleClose();
//     } catch (error) {
//       console.error("Error updating:", error);
//     }
//   };
const newUsers = async () => {
    
      const matchingUser = user.find((r) => r.emailId === email);
  
      if (matchingUser) {
        const emailId = localStorage.getItem("UserID");
       const tennantId = await getTennantId(emailId);
        let orguser = await getNotificationById2(email, tennantId);
        console.log("Orguser", orguser);
        setEmail('');
        handleClose();
      } else {
      
       
        toast.error("The emailId does not belong to our organization");
        handleClose();
    }
}
       
       
     
  

  const Deleteorguser1 = async (userId) => {
    try {
      let orguserdelete = await getNotificationById4(userId);
      console.log("deleteOrguser", orguserdelete);
      const emailId = localStorage.getItem("UserID");
      const tenantId = await getTennantId(emailId);
      let [value, data] = await getNotificationById1(tenantId);
      if (value) {
        setUserManage(data);
      }
      setShowButton(false);
      handleClose2();
    } catch (err) {
      console.error(err);
    }
  };

  const attend1 = async (userId) => {
    try {
      const emailId = localStorage.getItem("UserID");
      const tennantId = await getTennantId(emailId);
      await getNotificationById3(userId,email, tennantId);
      let [value, data] = await getNotificationById1(tennantId);
      if (value) {
        setUserManage(data);
      }
      setShowButton(false);
      handlePopupClose();
    } catch (err) {
      console.error(err);
    }
  };

  const memberTableFetch = async (start) => {
    if (!localStorage.getItem("UserID")) {
      // Handle when UserID is not available
      return;
    }

    try {
      const emailId = localStorage.getItem("UserID");
      const tenantId = await getTennantId(emailId);
      let [value, data] = await getNotificationById1(tenantId);
      if (value) {
        setUserManage(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    memberTableFetch();
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);

  const checkedDeleteButton = (userId) => {
    setDeleteEmail(userId);
    setShowButton(true);
  };

  const checkedUpdateButton = (userId) => {
    setUpdateUserEmail(userId);
    setShowButton(true);
  };

  return (
    <div className="container-fluid">
           <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
      <>
      <div className="d-flex align-items-center justify-content-end mb-3">
        <Button variant="gray" className="btn-gray-black rounded-pill me-2" onClick={handleShow}>
          Add User
        </Button>
        <Button variant="gray" className="btn-gray-black rounded-pill me-2" onClick={handlePopupShow}>
          Update User
        </Button>
        <Button variant="outline-gray" className={`me-2 btn-outline-gray-black ${!showButton && 'disabled'}`} onClick={() => handleShow2()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="d-block" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </Button>
      </div>
     
      
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="text-center py-5">
          
        
          <div className="d-flex pt-4 align-items-center justify-content-center">
            {/* <span className="close" onClick={handleClose}>&times;</span> */}
            {/* <label>Enter Email</label>&nbsp;&nbsp; */}
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
            />&nbsp;&nbsp;&nbsp;
          <Button type="submit" variant="dark" className="btn-button btn-sm" onClick={()=>newUsers()}>Submit</Button> &nbsp;&nbsp;
          <Button variant="dark"  className="btn-button btn-sm" onClick={handleClose}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showPopup} onHide={handlePopupClose} centered>
        <Modal.Body className="text-center py-5">
        
        
          <div className="d-flex pt-4 align-items-center justify-content-center">
            {/* <span className="close" onClick={handleClose}>&times;</span> */}
            {/* <label>Enter Email</label>&nbsp;&nbsp; */}
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
            />&nbsp;&nbsp;&nbsp;
          <Button type="submit" variant="dark" className="btn-button btn-sm" onClick={()=>attend1(deleteEmail)}>Submit</Button> &nbsp;&nbsp;
          <Button variant="dark"  className="btn-button btn-sm" onClick={handlePopupClose}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
      </>

      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Body className="text-center py-5">
          <img src={Question} className="mb-2" alt="Question" />
          <h6>Are you sure you want to delete this emailid?</h6>
        
          <div className="d-flex pt-4 align-items-center justify-content-center">
          
          
                 <div className="d-flex pt-4 align-items-center justify-content-center">
            <Button type="submit" variant="dark" className="btn-button btn-sm" onClick={() => Deleteorguser1(deleteEmail)}>Yes</Button>
            <Button type="reset" variant="outline-dark" className="btn-button btn-sm ms-3" onClick={handleClose2}>No</Button>
          </div>
        
          </div>
        </Modal.Body>
      </Modal>
      
  
    
                          
      {/* <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="text-center py-5">
          <img src={Question} className="mb-2" alt="Question" />
          <h6>Are you sure you want to execute this action?</h6>

          <div className="d-flex pt-4 align-items-center justify-content-center">
            <Button type="submit" variant="dark" className="btn-button btn-sm" onClick={() => Deleteorguser1(deleteEmail)}>Yes</Button>
            <Button type="reset" variant="outline-dark" className="btn-button btn-sm ms-3" onClick={handleClose}>No</Button>
          </div>
        </Modal.Body>
      </Modal> */}

      <Table hover responsive>
        <thead>
          <tr>
          <th className="text-center" style={{ width: '100px' }}>Checkbox</th>
            {/* <th className="text-center">Checkbox</th> */}
            <th className="text-center">Sl no</th>
            <th className="text-center">Email Id</th>
          </tr>
        </thead>
        <tbody>
          {userManage.map((x, index) => (
            <tr key={index}>
              <td width="184" className="d-flex justify-content-center">
               
                  <Form.Check
                    className="mb-0 check-single"
                    type="checkbox"
                    id={`checked-${index}`}
                    onClick={() => {
                      checkedDeleteButton(x.userId);
                      checkedUpdateButton(x.userId);
                    }}
                  />
                
              </td>
              <td className="align-middle text-center">{index + 1}</td>
              <td className="text-center">{x.emailId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default NotifyDetails;
