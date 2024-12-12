import { Link, NavLink } from 'react-router-dom';
import Logo from '../../asserts/images/site-logo.svg';
import NavIcon1 from '../../asserts/images/nav-icon-1.svg';
import NavIcon2 from '../../asserts/images/nav-icon-2.svg';
import NavIcon3 from '../../asserts/images/nav-icon-3.svg';
import NavIcon4 from '../../asserts/images/nav-icon-4.svg';
import NavIcon5 from '../../asserts/images/nav-icon-5.svg';
import NavIcon6 from '../../asserts/images/nav-icon-6.svg';
import NavIcon7 from '../../asserts/images/nav-icon-7.svg';
import NavIcon8 from '../../asserts/images/nav-icon-8.svg';
import NavIcon9 from '../../asserts/images/nav-icon-9.svg';
import NavIconAct1 from '../../asserts/images/nav-icon-active-1.svg';
import NavIconAct2 from '../../asserts/images/nav-icon-active-2.svg';
import NavIconAct3 from '../../asserts/images/nav-icon-active-3.svg';
import NavIconAct4 from '../../asserts/images/nav-icon-active-4.svg';
import NavIconAct5 from '../../asserts/images/nav-icon-active-5.svg';
import NavIconAct6 from '../../asserts/images/nav-icon-active-6.svg';
import NavIconAct7 from '../../asserts/images/nav-icon-active-7.svg';
import NavIconAct8 from '../../asserts/images/nav-icon-active-8.svg';
import NavIconAct9 from '../../asserts/images/nav-icon-active-9.svg';
import SubIcon1 from '../../asserts/images/subnav-icon-1.svg';
import SubIcon2 from '../../asserts/images/subnav-icon-2.svg';
import SubIcon3 from '../../asserts/images/subnav-icon-3.svg';
import SubIconAct1 from '../../asserts/images/subnav-icon-active-1.svg';
import SubIconAct2 from '../../asserts/images/subnav-icon-active-2.svg';
import SubIconAct3 from '../../asserts/images/subnav-icon-active-3.svg';
import heathImg from '../../asserts/images/health-insurance.png';
import heathImg1 from '../../asserts/images/health-check-up 1.png';
import heathImg2 from '../../asserts/images/health-check-up.png';
import userImg from '../../asserts/images/team-management.png';
import adminimg from '../../asserts/images/admin.png';
import adminimg1 from '../../asserts/images/report.png';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function Sidebar({getTheme, getMenuOpt, roleType}) {
    const [theme, setTheme] = useState('light');
    const [menu, setMenu] = useState(false);
    
    if(menu){
        document.getElementsByTagName('body')[0].classList.remove('submenu');
        setMenu(!menu)
    }

    const toggleTheme  = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        getTheme(theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme::SigUI', theme === 'light' ? 'dark' : 'light');
    }
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme::SigUI');
        if(savedTheme !== null){
            applyTheme();
            setTheme(savedTheme)
            getTheme(savedTheme);
        }
    }, [theme]);

    const applyTheme = () => {
        document.body.className = `theme-${theme}`;
    };

    return ( 
        <div className={`sidebar d-flex flex-column align-items-md-center ${getMenuOpt && 'active'}`}>
            <div className="sidebar-logo">
                <img src={Logo} className='img-fluid' alt="site logo" />

                <Button variant="reset" onClick={() => setMenu(!menu)} className="p-0 d-md-none border-0 me-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="d-block" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </Button>
            </div>
            {roleType === "System Admin" ? <>
            <div className='sidebar-nav mb-auto'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/home">
                            <img src={NavIcon1} alt='NavIcon1' />
                            <img src={NavIconAct1} alt='NavIcon1' />

                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/document-details">
                            <img src={NavIcon2} alt='NavIcon2' />
                            <img src={NavIconAct2} alt='NavIcon2' />

                            <span>Documents</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/job/job-details">
                            <img src={NavIcon3} alt='NavIcon3' />
                            <img src={NavIconAct3} alt='NavIcon3' />

                            <span>Jobs</span>
                        </NavLink>

                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Jobs</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    {/* <li>
                                        <Link to="/job">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Document Export Job
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/job-details">
                                            <span>
                                                <img src={SubIcon2} alt='SubIcon2' />
                                                <img src={SubIconAct2} alt='SubIconAct2' />
                                            </span>
                                            List All Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/immutable-record-jobs">
                                            <span>
                                                <img src={SubIcon3} alt='SubIcon3' />
                                                <img src={SubIconAct3} alt='SubIconAct3' />
                                            </span>
                                            NFT Minter Jobs
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/health-check">
                                            <span>
                                                <img src={heathImg} alt='SubIcon3' />
                                                <img src={heathImg} alt='SubIconAct3' />
                                            </span>
                                            Health Check
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/health-check">
                        <img src={heathImg1} style={{height:"24px"}}alt='NavIcon5' />
                            <img src={heathImg2} style={{height:"24px"}} alt='NavIcon5' />
                            <span> Health Check</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourite-documents">
                            <img src={NavIcon4} alt='NavIcon4' />
                            <img src={NavIconAct4} alt='NavIcon4' />

                            <span>Favourite</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-management">
                        <img src={adminimg} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg}style ={{height:"24px"}} alt='NavIcon5' />
                            <span>User Management</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/schedlue/job-schedule">
                            <img src={adminimg1} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg1}style ={{height:"24px"}} alt='NavIcon5' />

                            <span>Job Schedule</span>
                        </NavLink>
                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Job Schedule</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/schedlue/job-schedule">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Job Scheduler
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/schedlue/job-schedule-log">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Job Schedule Log
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink to='/admin-manager/create-org'>
                        <img src={NavIcon5} alt='NavIcon5' />
                            <img src={NavIconAct5} alt='NavIcon5' />

                            <span>Admin Manager</span>
                        </NavLink>

                        {/* <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Admin Manager</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/user-management">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            User Management
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </li>
                    {/* <li>
                        <NavLink to="/environment">
                            <img src={NavIcon7} alt='NavIcon7' />
                            <img src={NavIconAct7} alt='NavIcon7' />
                        </NavLink>
                    </li> */}
                </ul>
            </div>
            <div className='sidebar-nav mt-3'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/help-support">
                            <img src={NavIcon8} alt='NavIcon8' />
                            <img src={NavIconAct8} alt='NavIcon8' />

                            <span>Help & Support</span>
                        </NavLink>
                    </li>
                    <li>
                        <Link className={theme === 'dark' && 'active-icon'} onClick={toggleTheme}>
                            <img src={NavIcon9} alt='NavIcon9' />
                            <img src={NavIconAct9} alt='NavIcon9' />

                            <span>Dark Theme</span>
                        </Link>
                    </li>
                </ul>
            </div>            
            </> : <>
            {roleType === "Vault Owner" ? <>
            <div className='sidebar-nav mb-auto'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/home">
                            <img src={NavIcon1} alt='NavIcon1' />
                            <img src={NavIconAct1} alt='NavIcon1' />
                                
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/document-details">
                            <img src={NavIcon2} alt='NavIcon2' />
                            <img src={NavIconAct2} alt='NavIcon2' />
                                
                            <span>Documents</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/job/job-details">
                            <img src={NavIcon3} alt='NavIcon3' />
                            <img src={NavIconAct3} alt='NavIcon3' />
                                
                            <span>Jobs</span>
                        </NavLink>
                                
                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Jobs</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    {/* <li>
                                        <Link to="/job">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Document Export Job
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/job-details">
                                            <span>
                                                <img src={SubIcon2} alt='SubIcon2' />
                                                <img src={SubIconAct2} alt='SubIconAct2' />
                                            </span>
                                            List All Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/immutable-record-jobs">
                                            <span>
                                                <img src={SubIcon3} alt='SubIcon3' />
                                                <img src={SubIconAct3} alt='SubIconAct3' />
                                            </span>
                                            NFT Minter Jobs
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/health-check">
                                            <span>
                                                <img src={heathImg} alt='SubIcon3' />
                                                <img src={heathImg} alt='SubIconAct3' />
                                            </span>
                                            Health Check
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/health-check">
                        <img src={heathImg1} style={{height:"24px"}}alt='NavIcon5' />
                            <img src={heathImg2} style={{height:"24px"}} alt='NavIcon5' />
                            <span> Health Check</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourite-documents">
                            <img src={NavIcon4} alt='NavIcon4' />
                            <img src={NavIconAct4} alt='NavIcon4' />
                                
                            <span>Favourite</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-management">
                        <img src={adminimg} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg}style ={{height:"24px"}} alt='NavIcon5' />
                            <span>User Management</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin">
                             <img src={adminimg1} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg1}style ={{height:"24px"}} alt='NavIcon5' />
                                
                            <span>Node Reports</span>
                        </NavLink>
                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Node Reports</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin/nft-transactions-report">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            NFT Transactions Report
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin/block-transactions-report">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Block Transactions Report
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink to='/admin-manager/create-org'>
                        <img src={NavIcon5} alt='NavIcon5' />
                            <img src={NavIconAct5} alt='NavIcon5' />
                                
                            <span>Admin Manager</span>
                        </NavLink>
                                
                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Admin Manager</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    {/* <li>
                                        <Link to="/admin-manager">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            API Logs
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/create-org">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Create Org
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/admin-manager/environment">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Create Env
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/user-management">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            User Management
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </li>
                    {/* <li>
                        <NavLink to="/environment">
                            <img src={NavIcon7} alt='NavIcon7' />
                            <img src={NavIconAct7} alt='NavIcon7' />
                        </NavLink>
                    </li> */}
                </ul>
                </div>
                <div className='sidebar-nav mt-3'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/help-support">
                            <img src={NavIcon8} alt='NavIcon8' />
                            <img src={NavIconAct8} alt='NavIcon8' />
                
                            <span>Help & Support</span>
                        </NavLink>
                    </li>
                    <li>
                        <Link className={theme === 'dark' && 'active-icon'} onClick={toggleTheme}>
                            <img src={NavIcon9} alt='NavIcon9' />
                            <img src={NavIconAct9} alt='NavIcon9' />
                
                            <span>Dark Theme</span>
                        </Link>
                    </li>
                </ul>
                </div>            
            </> : <>
            {roleType === "FDA Auditor" ? <>
            <div className='sidebar-nav mb-auto'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/home">
                            <img src={NavIcon1} alt='NavIcon1' />
                            <img src={NavIconAct1} alt='NavIcon1' />

                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/document-details">
                            <img src={NavIcon2} alt='NavIcon2' />
                            <img src={NavIconAct2} alt='NavIcon2' />

                            <span>Documents</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourite-documents">
                            <img src={NavIcon4} alt='NavIcon4' />
                            <img src={NavIconAct4} alt='NavIcon4' />

                            <span>Favourite</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-management">
                        <img src={adminimg} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg}style ={{height:"24px"}} alt='NavIcon5' />
                            <span>User Management</span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/environment">
                            <img src={NavIcon7} alt='NavIcon7' />
                            <img src={NavIconAct7} alt='NavIcon7' />
                        </NavLink>
                    </li> */}
                </ul>
            </div>
            <div className='sidebar-nav mt-3'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/help-support">
                            <img src={NavIcon8} alt='NavIcon8' />
                            <img src={NavIconAct8} alt='NavIcon8' />

                            <span>Help & Support</span>
                        </NavLink>
                    </li>
                    <li>
                        <Link className={theme === 'dark' && 'active-icon'} onClick={toggleTheme}>
                            <img src={NavIcon9} alt='NavIcon9' />
                            <img src={NavIconAct9} alt='NavIcon9' />

                            <span>Dark Theme</span>
                        </Link>
                    </li>
                </ul>
            </div>            
            </> : <>
            {roleType === "Business Admin" ? <>
            <div className='sidebar-nav mb-auto'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/home">
                            <img src={NavIcon1} alt='NavIcon1' />
                            <img src={NavIconAct1} alt='NavIcon1' />

                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/document-details">
                            <img src={NavIcon2} alt='NavIcon2' />
                            <img src={NavIconAct2} alt='NavIcon2' />

                            <span>Documents</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/job/job-details">
                            <img src={NavIcon3} alt='NavIcon3' />
                            <img src={NavIconAct3} alt='NavIcon3' />

                            <span>Jobs</span>
                        </NavLink>

                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Jobs</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    {/* <li>
                                        <Link to="/job">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Document Export Job
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/job-details">
                                            <span>
                                                <img src={SubIcon2} alt='SubIcon2' />
                                                <img src={SubIconAct2} alt='SubIconAct2' />
                                            </span>
                                            List All Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/immutable-record-jobs">
                                            <span>
                                                <img src={SubIcon3} alt='SubIcon3' />
                                                <img src={SubIconAct3} alt='SubIconAct3' />
                                            </span>
                                            NFT Minter Jobs
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/health-check">
                                            <span>
                                                <img src={heathImg} alt='SubIcon3' />
                                                <img src={heathImg} alt='SubIconAct3' />
                                            </span>
                                            Health Check
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/health-check">
                        <img src={heathImg1} style={{height:"24px"}}alt='NavIcon5' />
                            <img src={heathImg2} style={{height:"24px"}} alt='NavIcon5' />
                            <span> Health Check</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourite-documents">
                            <img src={NavIcon4} alt='NavIcon4' />
                            <img src={NavIconAct4} alt='NavIcon4' />

                            <span>Favourite</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-management">
                        <img src={adminimg} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg}style ={{height:"24px"}} alt='NavIcon5' />
                            <span>User Management</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/admin-manager/create-org'>
                        <img src={NavIcon5} alt='NavIcon5' />
                            <img src={NavIconAct5} alt='NavIcon5' />
                            <span>Admin Manager</span>
                        </NavLink>
                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Admin Manager</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    {/* <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/job-management">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Job Management
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/job-handling">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Job Status
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Admin Manager</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/user-management">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            User Management
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </li>
                    {/* <li>
                        <NavLink to="/environment">
                            <img src={NavIcon7} alt='NavIcon7' />
                            <img src={NavIconAct7} alt='NavIcon7' />
                        </NavLink>
                    </li> */}
                </ul>
            </div>
            <div className='sidebar-nav mt-3'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/help-support">
                            <img src={NavIcon8} alt='NavIcon8' />
                            <img src={NavIconAct8} alt='NavIcon8' />

                            <span>Help & Support</span>
                        </NavLink>
                    </li>
                    <li>
                        <Link className={theme === 'dark' && 'active-icon'} onClick={toggleTheme}>
                            <img src={NavIcon9} alt='NavIcon9' />
                            <img src={NavIconAct9} alt='NavIcon9' />

                            <span>Dark Theme</span>
                        </Link>
                    </li>
                </ul>
            </div>            
            </> : <>
            {roleType === "Full User" ? <>
            <div className='sidebar-nav mb-auto'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/home">
                            <img src={NavIcon1} alt='NavIcon1' />
                            <img src={NavIconAct1} alt='NavIcon1' />

                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/document-details">
                            <img src={NavIcon2} alt='NavIcon2' />
                            <img src={NavIconAct2} alt='NavIcon2' />

                            <span>Documents</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourite-documents">
                            <img src={NavIcon4} alt='NavIcon4' />
                            <img src={NavIconAct4} alt='NavIcon4' />

                            <span>Favourite</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-management">
                        <img src={adminimg} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg}style ={{height:"24px"}} alt='NavIcon5' />
                            <span>User Management</span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/environment">
                            <img src={NavIcon7} alt='NavIcon7' />
                            <img src={NavIconAct7} alt='NavIcon7' />
                        </NavLink>
                    </li> */}
                </ul>
            </div>
            <div className='sidebar-nav mt-3'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/help-support">
                            <img src={NavIcon8} alt='NavIcon8' />
                            <img src={NavIconAct8} alt='NavIcon8' />

                            <span>Help & Support</span>
                        </NavLink>
                    </li>
                    <li>
                        <Link className={theme === 'dark' && 'active-icon'} onClick={toggleTheme}>
                            <img src={NavIcon9} alt='NavIcon9' />
                            <img src={NavIconAct9} alt='NavIcon9' />

                            <span>Dark Theme</span>
                        </Link>
                    </li>
                </ul>
            </div>            
            </> : <>
            {roleType === "Viewer" ? <>
            <div className='sidebar-nav mb-auto'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/home">
                            <img src={NavIcon1} alt='NavIcon1' />
                            <img src={NavIconAct1} alt='NavIcon1' />

                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/document-details">
                            <img src={NavIcon2} alt='NavIcon2' />
                            <img src={NavIconAct2} alt='NavIcon2' />

                            <span>Documents</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourite-documents">
                            <img src={NavIcon4} alt='NavIcon4' />
                            <img src={NavIconAct4} alt='NavIcon4' />

                            <span>Favourite</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-management">
                        <img src={adminimg} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg}style ={{height:"24px"}} alt='NavIcon5' />
                            <span>User Management</span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/environment">
                            <img src={NavIcon7} alt='NavIcon7' />
                            <img src={NavIconAct7} alt='NavIcon7' />
                        </NavLink>
                    </li> */}
                </ul>
            </div>
            <div className='sidebar-nav mt-3'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/help-support">
                            <img src={NavIcon8} alt='NavIcon8' />
                            <img src={NavIconAct8} alt='NavIcon8' />

                            <span>Help & Support</span>
                        </NavLink>
                    </li>
                    <li>
                        <Link className={theme === 'dark' && 'active-icon'} onClick={toggleTheme}>
                            <img src={NavIcon9} alt='NavIcon9' />
                            <img src={NavIconAct9} alt='NavIcon9' />

                            <span>Dark Theme</span>
                        </Link>
                    </li>
                </ul>
            </div>             
            </> : <>
            {roleType === "Super User" ? <>
                <div className='sidebar-nav mb-auto'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/home">
                            <img src={NavIcon1} alt='NavIcon1' />
                            <img src={NavIconAct1} alt='NavIcon1' />

                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/document-details">
                            <img src={NavIcon2} alt='NavIcon2' />
                            <img src={NavIconAct2} alt='NavIcon2' />

                            <span>Documents</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/job/job-details">
                            <img src={NavIcon3} alt='NavIcon3' />
                            <img src={NavIconAct3} alt='NavIcon3' />

                            <span>Jobs</span>
                        </NavLink>

                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Jobs</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    {/* <li>
                                        <Link to="/job">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Document Export Job
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/job-details">
                                            <span>
                                                <img src={SubIcon2} alt='SubIcon2' />
                                                <img src={SubIconAct2} alt='SubIconAct2' />
                                            </span>
                                            List All Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/immutable-record-jobs">
                                            <span>
                                                <img src={SubIcon3} alt='SubIcon3' />
                                                <img src={SubIconAct3} alt='SubIconAct3' />
                                            </span>
                                            NFT Minter Jobs
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link onClick={() => setMenu(!menu)} to="/job/health-check">
                                            <span>
                                                <img src={heathImg} alt='SubIcon3' />
                                                <img src={heathImg} alt='SubIconAct3' />
                                            </span>
                                            Health Check
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/health-check">
                        <img src={heathImg1} style={{height:"24px"}}alt='NavIcon5' />
                            <img src={heathImg2} style={{height:"24px"}} alt='NavIcon5' />
                            <span> Health Check</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourite-documents">
                            <img src={NavIcon4} alt='NavIcon4' />
                            <img src={NavIconAct4} alt='NavIcon4' />

                            <span>Favourite</span>
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/user-management">
                        <img src={adminimg} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg}style ={{height:"24px"}} alt='NavIcon5' />
                            <span>User Management</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin">
                            <img src={adminimg1} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg1}style ={{height:"24px"}} alt='NavIcon5' />

                            <span>Node Reports</span>
                        </NavLink>
                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Node Reports</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin/nft-transactions-report">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            NFT Transactions Report
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin/block-transactions-report">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Block Transactions Report
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/schedlue/job-schedule">
                            <img src={adminimg1} style ={{height:"24px"}}alt='NavIcon5' />
                            <img src={adminimg1}style ={{height:"24px"}} alt='NavIcon5' />

                            <span>Job Schedule</span>
                        </NavLink>
                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Job Schedule</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/schedlue/job-schedule">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Job Scheduler
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/schedlue/job-schedule-log">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Job Schedule Log
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <NavLink to='/admin-manager/create-org'>
                        <img src={NavIcon5} alt='NavIcon5' />
                            <img src={NavIconAct5} alt='NavIcon5' />

                            <span>Admin Manager</span>
                        </NavLink>

                        <div className='sidebar-subnav'>
                            <div className='sidebar-subnav-inner'>
                                <h4>Admin Manager</h4>
                                <ul className='p-0 m-0 list-unstyled'>
                                    {/* <li>
                                        <Link to="/admin-manager">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            API Logs
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/create-org">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Create Org
                                        </Link>
                                    </li>
                                   
                                    {/* <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/job-management">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Job Management
                                        </Link>
                                    </li> */}
                               
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/job-handling">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Job Status
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/admin-manager/environment">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Create Env
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/user-management">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            User Management
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/ticket-management">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                            Ticket Management
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/query-management">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                           Configuration Details
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/audit-log">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                         Audit Log
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => setMenu(!menu)} to="/admin-manager/notify">
                                            <span>
                                                <img src={SubIcon1} alt='SubIcon1' />
                                                <img src={SubIconAct1} alt='SubIconAct1' />
                                            </span>
                                           Notification details
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    {/* <li>
                        <NavLink to="/environment">
                            <img src={NavIcon7} alt='NavIcon7' />
                            <img src={NavIconAct7} alt='NavIcon7' />
                        </NavLink>
                    </li> */}
                </ul>
                </div>
                <div className='sidebar-nav mt-3'>
                <ul className='list-unstyled p-0 m-0 d-flex flex-column align-items-md-center'>
                    <li>
                        <NavLink to="/help-support">
                            <img src={NavIcon8} alt='NavIcon8' />
                            <img src={NavIconAct8} alt='NavIcon8' />
                
                            <span>Help & Support</span>
                        </NavLink>
                    </li>
                    <li>
                        <Link className={theme === 'dark' && 'active-icon'} onClick={toggleTheme}>
                            <img src={NavIcon9} alt='NavIcon9' />
                            <img src={NavIconAct9} alt='NavIcon9' />
                
                            <span>Dark Theme</span>
                        </Link>
                    </li>
                </ul>
                </div>
            </> : <>

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

export default Sidebar;

