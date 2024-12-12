import Layout from "./Snippets/Layout";
import { Badge, Button, Modal} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { fetchFavoriteDetails,deleteFavorite,fetchSigmadocdetails,createUserVisits } from "../apifunction";
import { Link,useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import useIdle from "./useIdleTimeout"; 
function AdminManager(props) {
    useEffect(() => {
        userdata();
      }, []);
      const history = useNavigate();
      const navigate = useNavigate()
     // console.log("selected",roleId);
   
     const [openModal, setOpenModal] = useState(false)
         
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
      const userdata = async () => {
        let algoAddress = localStorage.getItem("UserID");
        let networkType = "type";
        let walletType = "Admin-manager";
      
        try {
          await createUserVisits(algoAddress, networkType, walletType);
          console.log("Update successful11");
        } catch (error) {
          console.error("Error updating:", error);
        }
      };
    return ( 
        <Layout getThemeMode={() => undefined} roleType = {props.roleType} getIProfile = {props.getIProfile}>
            <div className="container-fluid">
                <Outlet />

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

export default AdminManager;