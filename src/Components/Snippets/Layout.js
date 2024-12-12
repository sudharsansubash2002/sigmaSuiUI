import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout(props) {
    const setTheme = (e) => {
        props.getThemeMode(e)
    }
    // console.log("roleDashboard", props)
    return ( 
        <div className="app-outer">
            <Sidebar 
                getTheme={(e) => setTheme(e)} 
                roleType = {props.roleType}
            />
            <Header getIProfile={props.getIProfile} />

            <main className="app-main">
                {props.children}
            </main>
        </div>
     );
}

export default Layout;