import Layout from "./Snippets/Layout";
import { Outlet } from "react-router-dom";

function AdminMain(props) {
    return ( 
        <Layout 
            getThemeMode={() => undefined}
            roleType = {props.roleType}
            getIProfile = {props.getIProfile}
        >
            <div className="container-fluid">
                <Outlet />
            </div>
        </Layout>
     );
}

export default AdminMain;