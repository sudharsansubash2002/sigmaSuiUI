import { Col, Row } from "react-bootstrap";
import Layout from "./Snippets/Layout";

import {  Outlet } from "react-router-dom";
import {createUserVisits} from "../apifunction"
import { useState,useEffect , useContext} from "react";

function Document(props) {
    useEffect(() => {
        userdata();
      }, []);
      
      const userdata = async () => {
        let algoAddress = localStorage.getItem("UserID");
        let networkType = "type";
        let walletType = "document-details";
      
        try {
          await createUserVisits(algoAddress, networkType, walletType);
          console.log("Update successful8");
        } catch (error) {
          console.error("Error updating:", error);
        }
      };
    return ( 
        <Layout getThemeMode={() => undefined} roleType = {props.roleType} getIProfile = {props.getIProfile}>
            <div className="container-fluid">
                <Outlet />

            </div>
        </Layout>
     );
}

export default Document;