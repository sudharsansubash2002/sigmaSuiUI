import React, {useState, useEffect} from 'react';
import { Routes, Route } from "react-router-dom"
import './asserts/fonts/fonts.css';
import './App.scss';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
// import Google from './Components/Google';
import ResetPassword from './Components/resetPassword';
import ResetPasswordSubmit from './Components/resetPasswordSubmit';
import SignInwithEnterpriseSSO from './Components/SignInwithEnterpriseSSO';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import DocumentDetails from './Components/DocumentDetails';
import DocumentDetailsSingle from './Components/DocumentDetailsSingle';
import DocumentCheck from './Components/DocumentCheck';
import Document from './Components/Document';
import ResourcePersistJob from './Components/ResourcePersistJob';
import JobDetails from './Components/JobDetails';
import Job from './Components/Job';
import FavouriteDocuments from './Components/FavouriteDocuments';
import Admin from './Components/Admin';
import AdminMain from './Components/AdminMain';
import NftTransactionsReport from './Components/NftTransactionsReport';
import NftTransactionPage from './Components/NftTransactionPage';
import BlockTransactionsReport from './Components/BlockTransactionsReport';
import JobScheduleMain from './Components/JobScheduleMain';
import JobSchedule from './Components/JobSchedule';
import JobScheduleLog from './Components/JobScheduleLog';
import AdminManager from './Components/AdminManager';
import APILogs from './Components/APILogs';
import CreateOrg from './Components/CreateOrg';
import AuditLog from './Components/AuditLog';
import Environment from './Components/Environment';
import HelpSupport from './Components/HelpSupport';
import HealthCheck from './Components/HealthCheck';
import ImmutableRecordJobs from './Components/ImmutableRecordJobs';
import UserManagement from './Components/UserManagement';
import TicketManagement from './Components/TicketManagement';
import JobManagement from './Components/JobManagement';
import JobHandling from './Components/JobHandling';
import QueryManagement from './Components/QueryManagement';
import NotifyDetails from './Components/NotifyDetails';
import AddUser from './Components/AddUser';
import User from './Components/User';
import Layout from './Components/Snippets/Layout';
import { userDetailWithEmail, userprofileget } from "./apifunction";

function App () {
  const [roleType, setRoleType] = useState();
  const[getIProfile,setgetIProfile]=useState("");

  const fetchRole = async () => {
    if(localStorage.getItem("UserID"))
    {
    let [value, data] = await userDetailWithEmail(localStorage.getItem("UserID"));
    console.log("app.js role", (data[0]).roleType);
    setRoleType((data[0]).roleType);

    }
  }

  useEffect(() => {
    if(!roleType && roleType === undefined)
    {
      fetchRole();
    }
  }, [roleType]);

  const getprofiledetails = async() =>{
    let [data,userprofiledetail] = await userprofileget(localStorage.getItem("UserID"));
    setgetIProfile(userprofiledetail);
    // console.log("userdetail1",userprofiledetail,userprofiledetail.emailId);
    // console.log("userdetail11",getIProfile.emailId,getIProfile.firstName);
    // localStorage.setItem("UserName",userprofiledetail.firstName);
   }
   useEffect(()=>{
    if(!getIProfile)
      getprofiledetails();
  })
  
  return (
    <div className="App">
            {roleType === "System Admin" ? <>
            <Routes>
              <Route path="/" element={ <SignIn /> } />
              <Route path="/sign-up" element={ <SignUp/> } />
              <Route path="/reset-password" element={ <ResetPassword /> } />
              <Route path="/reset-submission" element={ <ResetPasswordSubmit /> } />
              <Route path="/sign-in-with-enterprise-sso" element={ <SignInwithEnterpriseSSO /> } />
              <Route path="/user" element={ <User /> } /> 
              {/* <Route path="/google" element={ <Google /> } /> */}
              <Route path="/account" element={ <Profile /> } />
              <Route path="/home" element={ <Dashboard roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/document-details" element={<Document roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <DocumentDetails /> } />
                <Route path=":slug" element={ <DocumentDetailsSingle /> } />
                <Route path=":slug" element={ <DocumentCheck /> } />
              </Route>
              <Route path="/job" element={<Job roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <ResourcePersistJob /> } />
                <Route path="/job/job-details" element={ <JobDetails /> } />
                <Route path="/job/immutable-record-jobs" element={ <ImmutableRecordJobs /> } />
                {/* <Route path="/job/health-check" element={ <HealthCheck roleType = {roleType}/> } /> */}
              </Route>
              <Route path="/health-check" element={ <HealthCheck roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/favourite-documents" element={ <FavouriteDocuments roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/admin-manager" element={ <AdminManager roleType = {roleType} getIProfile={getIProfile}/> }>
                {/* <Route path="/admin-manager/user-management" element={ <UserManagement/> } /> */}
                <Route path="/admin-manager/add-user" element={ <AddUser roleType = {roleType} getIProfile={getIProfile}/> } />
              </Route>
              <Route path="/schedlue/job-schedule" element={ <JobSchedule roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/schedlue" element={ <JobScheduleMain roleType = {roleType} getIProfile={getIProfile}/> }>
                <Route path="/schedlue/job-schedule-log" element={ <JobScheduleLog /> } />
              </Route>
              <Route path="/user-management" element={ <UserManagement roleType = {roleType} getIProfile={getIProfile}/> } />

              <Route path="/help-support" element={ <HelpSupport roleType = {roleType} getIProfile={getIProfile}/> } />
              {/* <Route path="about" element={ <About/> } />
              <Route path="contact" element={ <Contact/> } /> */}
            </Routes>          
            </> : <>
            {roleType === "Vault Owner" ? <>
            <Routes>
              <Route path="/" element={ <SignIn /> } />
              <Route path="/sign-up" element={ <SignUp/> } />
              <Route path="/reset-password" element={ <ResetPassword /> } />
              <Route path="/reset-submission" element={ <ResetPasswordSubmit /> } />
              <Route path="/sign-in-with-enterprise-sso" element={ <SignInwithEnterpriseSSO /> } />
              <Route path="/user" element={ <User /> } /> 
              {/* <Route path="/google" element={ <Google /> } /> */}
              <Route path="/account" element={ <Profile /> } />
              <Route path="/home" element={ <Dashboard roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/document-details" element={<Document roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <DocumentDetails /> } />
                <Route path="/document-details/single" element={ <DocumentDetailsSingle /> } />
                <Route path="/document-details/check" element={ <DocumentCheck /> } />
              </Route>
              <Route path="/job" element={<Job roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <ResourcePersistJob /> } />
                <Route path="/job/job-details" element={ <JobDetails /> } />
                <Route path="/job/immutable-record-jobs" element={ <ImmutableRecordJobs /> } />
                {/* <Route path="/job/health-check" element={ <HealthCheck roleType = {roleType}/> } /> */}
              </Route>
              <Route path="/health-check" element={ <HealthCheck roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/favourite-documents" element={ <FavouriteDocuments roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/admin" element={ <AdminMain roleType = {roleType} getIProfile={getIProfile}/> }>
                <Route index element={ <Admin /> } />
                <Route path="/admin/nft-transactions-report" element={ <NftTransactionsReport /> } />
                <Route path="/admin/block-transactions-report" element={ <BlockTransactionsReport /> } />
              </Route>
              <Route path="/admin-manager" element={ <AdminManager roleType = {roleType} getIProfile={getIProfile}/> }>
                <Route index element={ <APILogs /> } />
                <Route path="/admin-manager/create-org" element={ <CreateOrg /> } />
                <Route path="/admin-manager/environment" element={ <Environment/> } />
                {/* <Route path="/admin-manager/user-management" element={ <UserManagement/> } /> */}
                <Route path="/admin-manager/add-user" element={ <AddUser roleType = {roleType} getIProfile={getIProfile}/> } />
              </Route>
              <Route path="/user-management" element={ <UserManagement roleType = {roleType} getIProfile={getIProfile}/> } />

              <Route path="/help-support" element={ <HelpSupport  roleType = {roleType} getIProfile={getIProfile}/> } />
              {/* <Route path="about" element={ <About/> } />
              <Route path="contact" element={ <Contact/> } /> */}
            </Routes>            
            </> : <>
            {roleType === "FDA Auditor" ? <>
            <Routes>
              <Route path="/" element={ <SignIn /> } />
              <Route path="/sign-up" element={ <SignUp/> } />
              <Route path="/reset-password" element={ <ResetPassword /> } />
              <Route path="/reset-submission" element={ <ResetPasswordSubmit /> } />
              <Route path="/sign-in-with-enterprise-sso" element={ <SignInwithEnterpriseSSO /> } />
              <Route path="/user" element={ <User /> } /> 
              {/* <Route path="/google" element={ <Google /> } /> */}
              <Route path="/account" element={ <Profile /> } />
              <Route path="/home" element={ <Dashboard roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/document-details" element={<Document roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <DocumentDetails /> } />
                <Route path=":slug" element={ <DocumentDetailsSingle /> } />
                <Route path=":slug" element={ <DocumentCheck /> } />
              </Route>
              <Route path="/favourite-documents" element={ <FavouriteDocuments roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/help-support" element={ <HelpSupport  roleType = {roleType} getIProfile={getIProfile}/> } />
              {/* <Route path="about" element={ <About/> } />
              <Route path="contact" element={ <Contact/> } /> */}
            </Routes>            
            </> : <>
            {roleType === "Business Admin" ? <>
            <Routes>
              <Route path="/" element={ <SignIn /> } />
              <Route path="/sign-up" element={ <SignUp/> } />
              <Route path="/reset-password" element={ <ResetPassword /> } />
              <Route path="/reset-submission" element={ <ResetPasswordSubmit /> } />
              <Route path="/sign-in-with-enterprise-sso" element={ <SignInwithEnterpriseSSO /> } />
              <Route path="/user" element={ <User /> } /> 
              {/* <Route path="/google" element={ <Google /> } /> */}
              <Route path="/account" element={ <Profile /> } />
              <Route path="/home" element={ <Dashboard roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/document-details" element={<Document roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <DocumentDetails /> } />
                <Route path=":slug" element={ <DocumentDetailsSingle /> } />
                <Route path=":slug" element={ <DocumentCheck /> } />
              </Route>
              <Route path="/job" element={<Job roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <ResourcePersistJob /> } />
                <Route path="/job/job-details" element={ <JobDetails /> } />
                <Route path="/job/immutable-record-jobs" element={ <ImmutableRecordJobs /> } />
                <Route path="/job/health-check" element={ <HealthCheck roleType = {roleType} getIProfile={getIProfile}/> } />
              </Route>
              <Route path="/favourite-documents" element={ <FavouriteDocuments roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/admin-manager" element={ <AdminManager roleType = {roleType} getIProfile={getIProfile}/> }>
              <Route path="/admin-manager/job-management" element={ <JobManagement roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/admin-manager/job-handling" element={ <JobHandling roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/admin-manager/audit-log" element={ <AuditLog roleType = {roleType} getIProfile={getIProfile}/> } />
                {/* <Route path="/admin-manager/user-management" element={ <UserManagement/> } /> */}
                <Route path="/admin-manager/add-user" element={ <AddUser roleType = {roleType} getIProfile={getIProfile}/> } />
              </Route>

              <Route path="/user-management" element={ <UserManagement roleType = {roleType} getIProfile={getIProfile}/> } />

              <Route path="/help-support" element={ <HelpSupport  roleType = {roleType} getIProfile={getIProfile}/> } />
              {/* <Route path="about" element={ <About/> } />
              <Route path="contact" element={ <Contact/> } /> */}
            </Routes>            
            </> : <>
            {roleType === "Full User" ? <>
            <Routes>
              <Route path="/" element={ <SignIn /> } />
              <Route path="/sign-up" element={ <SignUp/> } />
              <Route path="/reset-password" element={ <ResetPassword /> } />
              <Route path="/reset-submission" element={ <ResetPasswordSubmit /> } />
              <Route path="/sign-in-with-enterprise-sso" element={ <SignInwithEnterpriseSSO /> } />
              <Route path="/user" element={ <User /> } /> 
              {/* <Route path="/google" element={ <Google /> } /> */}
              <Route path="/account" element={ <Profile /> } />
              <Route path="/home" element={ <Dashboard roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/document-details" element={<Document roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <DocumentDetails /> } />
                <Route path=":slug" element={ <DocumentDetailsSingle /> } />
                <Route path=":slug" element={ <DocumentCheck /> } />
              </Route>
              <Route path="/favourite-documents" element={ <FavouriteDocuments roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/help-support" element={ <HelpSupport  roleType = {roleType} getIProfile={getIProfile}/> } />
              {/* <Route path="about" element={ <About/> } />
              <Route path="contact" element={ <Contact/> } /> */}
            </Routes>            
            </> : <>
            {roleType === "Viewer" ? <>
            <Routes>
              <Route path="/" element={ <SignIn /> } />
              <Route path="/sign-up" element={ <SignUp/> } />
              <Route path="/reset-password" element={ <ResetPassword /> } />
              <Route path="/reset-submission" element={ <ResetPasswordSubmit /> } />
              <Route path="/sign-in-with-enterprise-sso" element={ <SignInwithEnterpriseSSO /> } />
              <Route path="/user" element={ <User /> } /> 
              {/* <Route path="/google" element={ <Google /> } /> */}
              <Route path="/account" element={ <Profile /> } />
              <Route path="/home" element={ <Dashboard roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/document-details" element={<Document roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <DocumentDetails /> } />
                <Route path=":slug" element={ <DocumentDetailsSingle /> } />
                <Route path=":slug" element={ <DocumentCheck /> } />
              </Route>
              <Route path="/favourite-documents" element={ <FavouriteDocuments roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/help-support" element={ <HelpSupport  roleType = {roleType} getIProfile={getIProfile}/> } />
              {/* <Route path="about" element={ <About/> } />
              <Route path="contact" element={ <Contact/> } /> */}
            </Routes>
            </> : <>
            {roleType === "Super User" ? <>
            <Routes>
              <Route path="/" element={ <SignIn /> } />
              <Route path="/sign-up" element={ <SignUp/> } />
              <Route path="/reset-password" element={ <ResetPassword /> } />
              <Route path="/reset-submission" element={ <ResetPasswordSubmit /> } />
              <Route path="/sign-in-with-enterprise-sso" element={ <SignInwithEnterpriseSSO /> } />
              <Route path="/user" element={ <User /> } /> 
              {/* <Route path="/google" element={ <Google /> } /> */}
              <Route path="/account" element={ <Profile /> } />
              <Route path="/home" element={ <Dashboard roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/document-details" element={<Document roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <DocumentDetails /> } />
                <Route path="/document-details/single" element={ <DocumentDetailsSingle /> } />
                <Route path="/document-details/check" element={ <DocumentCheck /> } />
              </Route>
              <Route path="/job" element={<Job roleType = {roleType} getIProfile={getIProfile}/>}>
                <Route index element={ <ResourcePersistJob /> } />
                <Route path="/job/job-details" element={ <JobDetails /> } />
                <Route path="/job/immutable-record-jobs" element={ <ImmutableRecordJobs /> } />
                {/* <Route path="/job/health-check" element={ <HealthCheck roleType = {roleType}/> } /> */}
              </Route>
              <Route path="/health-check" element={ <HealthCheck roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/favourite-documents" element={ <FavouriteDocuments roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/admin" element={ <AdminMain roleType = {roleType} getIProfile={getIProfile}/> }>
                <Route index element={ <Admin /> } />
                <Route path="/admin/nft-transactions-report" element={ <NftTransactionsReport /> } />
                <Route path="/admin/nft-transactions-report/single-transaction" element={ <NftTransactionPage /> } />
                <Route path="/admin/block-transactions-report" element={ <BlockTransactionsReport /> } />
              </Route>
              <Route path="/schedlue/job-schedule" element={ <JobSchedule roleType = {roleType} getIProfile={getIProfile}/> } />
              <Route path="/schedlue" element={ <JobScheduleMain roleType = {roleType} getIProfile={getIProfile}/> }>
                <Route path="/schedlue/job-schedule-log" element={ <JobScheduleLog /> } />
              </Route>
              <Route path="/admin-manager" element={ <AdminManager roleType = {roleType} getIProfile={getIProfile}/> }>
                <Route index element={ <APILogs /> } />
                <Route path="/admin-manager/create-org" element={ <CreateOrg /> } />
                <Route path="/admin-manager/audit-log" element={ <AuditLog roleType = {roleType} getIProfile={getIProfile}/> } />
                <Route path="/admin-manager/environment" element={ <Environment/> } />
                <Route path="/admin-manager/job-management" element={ <JobManagement/> } />
                <Route path="/admin-manager/job-handling" element={ <JobHandling/> } />
                {/* <Route path="/admin-manager/user-management" element={ <UserManagement/> } /> */}
                <Route path="/admin-manager/ticket-management" element={ <TicketManagement/> } />
                <Route path="/admin-manager/query-management" element={ <QueryManagement/> } />
                <Route path ="/admin-manager/notify" element={ <NotifyDetails/> } />
                <Route path="/admin-manager/add-user" element={ <AddUser roleType = {roleType} getIProfile={getIProfile}/> } />
              </Route>
              <Route path="/user-management" element={ <UserManagement roleType = {roleType} getIProfile={getIProfile}/> } />

              <Route path="/help-support" element={ <HelpSupport  roleType = {roleType} getIProfile={getIProfile}/> } />
              {/* <Route path="about" element={ <About/> } />
              <Route path="contact" element={ <Contact/> } /> */}
            </Routes>
            </> : <>
            <Routes>
              <Route path="/" element={ <SignIn /> } />
              <Route path="/sign-up" element={ <SignUp/> } />
              <Route path="/reset-password" element={ <ResetPassword /> } />
              <Route path="/reset-submission" element={ <ResetPasswordSubmit /> } />
              <Route path="/sign-in-with-enterprise-sso" element={ <SignInwithEnterpriseSSO /> } />
              <Route path="/user" element={ <User /> } />
            </Routes>
            </>} 
            </>}  
            </>}            
            </>}            
            </>}
            </>}
            </>}
    </div>
  );
}

export default App;