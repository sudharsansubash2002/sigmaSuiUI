import React, { useState, useEffect } from "react";
import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Sessionstatusget1, uservisitrecords,userByTenantIdAll,getTennantId } from "../apifunction";
import ButtonLoad from 'react-bootstrap-button-loader';
function Audit(props) {
  const [search, setSearch] = useState(false);
  const [userManage, setUserManage] = useState([]);
  const [uservisit1, setUservisit] = useState([]);
  const [searchQuery, setSearchQuery] = useState(false);
  const [searchDetails, setSearchDetails] = useState([]);
  const [startvalue, setstartvalue] = useState(0);
  const[loaderDownload, setLoaderDownload] = useState(false);
  const [pageSize, setPageSize] = useState(10); // Set your desired page size here
  const [outputManage, setUserOutput] = useState([]);
  const handleShowLoadDownload = () => setLoaderDownload(true);
  const handleHideLoadDownload = () => setLoaderDownload(false);
  console.log("search",searchQuery)

  const handleSearch = (searchQuer) => {
    if (!searchQuer) {
      setSearchQuery(false);
    } else {
      setSearchQuery(true);
      const filteredJobLists = userManage.filter((r) =>
        r.emailId.toLowerCase().includes(searchQuer.toLowerCase())
      );
      setSearchDetails(filteredJobLists);
    }
  };
  // const Users = async (start) => {
  //   let r = [];
  //   let countlist = 0;
  //   try {
  //     let [check, data] = await Sessionstatusget1(start);
  //     if (check) {
  //       setUserManage(data);
  //       console.log("ticket1", data);
        
  //     }
      
  //     // settenentid(tenentid.tenantId);
  //     console.log("ticket", data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  const Users = async (start) => {
    try {
      let tnId = await getTennantId();
      let id = tnId;
      const roleTypeMap = {};
      let  data3 = await userByTenantIdAll(id);
      console.log("valid1", data3);
      let [check, data] = await Sessionstatusget1(start);
      setUserManage(data);
      console.log("ticket1", data);
      data3.forEach((item) => {
        roleTypeMap[item.emailId] = item.roleType;
      });
      let [check1, data2] = await uservisitrecords();
      const output = data2.map((item) => {
        return {
          mailId: item.algoAddress,
          roleType: roleTypeMap[item.algoAddress] || '', // Use the roleType from data1 if it exists, otherwise, use an empty string
          activity: item.walletType,
          startDate: item.startDate
        };
      });
      setUserOutput(output.slice(start,start+10));
     
    
      console.log("output",output)
      console.log("outputss",output.slice(0,10));
      
      
    } catch (error) {
      console.error(error);
    }
  };
  console.log("outputmm",outputManage)
  
  const fetchAllData = async () => {
    try {
      const allData = [];
      let currentPage = 0;

      while (true) {
        const [check, data] = await Sessionstatusget1(currentPage * pageSize);
        if (!check || data.length === 0) {
          break;
        }
        allData.push(...data);
        currentPage++;
      }
    
      return allData;
    
    } catch (error) {
      console.error(error);
      return [];
    }
  };
//   useEffect(() => {
//     fetchAllData().then((data) => {
//       setUserManage(data);
//     });
//   }, []);
const ticketTableFetch = async () => {
    if (
      localStorage.getItem("UserID") === null ||
      localStorage.getItem("UserID") === "" ||
      localStorage.getItem("UserID") === " " ||
      localStorage.getItem("UserID") === undefined ||
      localStorage.getItem("UserID") === ""
    ) {
    } else {
      try {
        await Users(startvalue);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    ticketTableFetch();
  }, [startvalue]);

  const uservisit = async () => {
    try {
      let [check, data2] = await uservisitrecords();
      setUservisit(data2);
      console.log("uservistitss",data2);
    } catch (err) {
      console.error(err);
    }
  }
  const pagination = async (start) => {
    setstartvalue(start);
    await Users(start);
  }
  useEffect(() => {
    uservisit();
  }, []);
  const downloadCsv = async () => {
    try {
      handleShowLoadDownload(); // Show loader before starting the download process
  
      const allData = await fetchAllData();
      const combineddata=userManage.concat(outputManage);
      const csvData = [].concat(
        ...combineddata.map((x,i) => {
          // const sessionTime = uservisit1.find((visit) => visit.algoAddress === x.mailId)
          //   ? ` ${uservisit1.find((visit) => visit.algoAddress === x.mailId).startDate}`
          //   : ` ${x.loginTime}`;
          // const sessionTime=x.startDate;
  
          return {
            "Sl no": i+1,
            "Email Id": x.mailId,
            "Role Type": x.roleType,
            "Activity":  x.activity,
            "Session Time": x.startDate,
          };
        })
      );
  
      const csvRows = [];
      const headers = Object.keys(csvData[0]);
      csvRows.push(headers.join(','));
  
      for (const row of csvData) {
        const values = headers.map(header => row[header]);
        csvRows.push(values.join(','));
      }
  
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = 'activity_details.csv';
      link.click();
  
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      handleHideLoadDownload(); // Hide loader after the download process
    }
  };
  
  
  return (
    <div className="container-fluid">
      <Row className="mb-20">
        <Col md={6} xl={4} xxl={3}>
          <h4 className="page-title mb-0">Activity Details</h4>
        </Col>
      </Row>
    
      <Row className="mb-20" style={{ minHeight: '40px' }}>
        <Col xs={12} md={6} className="mt-md-0 mt-2 mb-md-0 mb-3">
          {search && (
            <Form>
              <InputGroup className="form-search shadow">
                <Button variant="reset" id="button-addon1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                </Button>
                <Form.Control
                  aria-describedby="basic-addon1"
                  aria-label="Write something to search"
                  placeholder="Search by User name..."
                  onChange={(e) => { handleSearch(e.target.value) }}
                />
              </InputGroup>
            </Form>
          )}
        </Col>
      </Row>
      
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <ButtonLoad
    loading={loaderDownload}
    variant="gray"
    className="btn-gray-black me-2 mb-1 px-3"
    onClick={() => downloadCsv()}
  >
    Download
  </ButtonLoad>
</div>

  
 
  
      <div className="mb-20">
      <Table hover responsive>
        <thead>
          <tr>
            <th className="text-center">Sl no</th>
            <th className="text-center">Email Id</th>
            <th className="text-center">Role Type</th>
            <th className="text-center">Activity</th>
            <th className="text-center">Session Time</th>
          </tr>
        </thead>
        <tbody>
          {/* ... (other JSX code) */}
          {searchQuery ? (
            searchDetails.map((x) => (
              <tr key={x.id}>
                <td className="text-center">{x.id}</td>
                <td className="text-center">{x.mailId}</td>
                <td className="text-center">{x.roleType}</td>
                <td className="text-center">
                  {/* ... (other td elements) */}
                  {!uservisit1.find((visit) => visit.algoAddress === x.mailId) && x.activity}
                  {uservisit1.find((visit) => visit.algoAddress === x.mailId) && (
                    <div>
                      Wallet Type: {uservisit1.find((visit) => visit.algoAddress === x.mailId).walletType}
                    </div>
                  )}
                </td>
                <td className="text-center">
                  {uservisit1.find((visit) => visit.algoAddress === x.mailId) ? (
                    <div>
                      Start Date: {uservisit1.find((visit) => visit.algoAddress === x.mailId).startDate}
                    </div>
                  ) : (
                    x.loginTime
                  )}
                </td>
              </tr>
            ))
          ) : (
            Array.isArray(userManage) &&
            userManage.map((x) => (
              <tr key={x.id}>
                <td className="text-center">{x.id}</td>
                <td className="text-center">{x.mailId}</td>
                <td className="text-center">{x.roleType}</td>
                <td className="text-center">
                  {/* ... (other td elements) */}
                  
                    <div>
                      {x.activity}
                    </div>
                 
                </td>
                <td className="text-center">
                 
                    <div>
                      {x.startDate}
                    </div>
               
                </td>
              </tr>
            ))
           
          )}
        {outputManage?(
          outputManage.map((x,i) => (
            <tr key={startvalue+i}>
            <td className="text-center">{startvalue > 1 ? (parseInt(startvalue+10)+1)+i : (startvalue+11)+i}</td>
              <td className="text-center">{x.mailId}</td>
              <td className="text-center">{x.roleType}</td>
              <td className="text-center">
                  {/* ... (other td elements) */}
                  
                    <div>
                      {x.activity}
                    </div>
                 
                </td>
                <td className="text-center">
                 
                    <div>
                      {x.startDate}
                    </div>
               
                </td>
              {/* <td className="text-center">
                {uservisit1.find((visit) => visit.algoAddress === x.mailId) ? (
                  <div>
                    {uservisit1.find((visit) => visit.algoAddress === x.mailId).startDate}
                  </div>
                ) : (
                  x.loginTime
                )}
              </td> */}
            </tr>
          ))):(<></>)}
           {!searchQuery && !Array.isArray(userManage) && (
            <tr>
                <td colSpan="6" className="text-center">
                    No data available
                </td>
            </tr>
        )}
        </tbody>
      </Table>
       
 
        <Row className="mt-4">
          <Col md={8} className="d-flex justify-content-md-end justify-content-center">
            <ul className="d-flex pagination list-unstyled">
              <li>
                <Link className={startvalue !== 0 ? 'next' : startvalue === 0 ? 'prev disabled' : ''} onClick={() => { pagination(startvalue - 10) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                  </svg>
                </Link>
              </li>
              <li><Link className="active" onClick={() => { pagination(startvalue + 10) }}>{startvalue ? (startvalue / 10) + 1 : '1'}</Link></li>
              <li>
                <Link className="next" onClick={() => { pagination(startvalue + 10) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Audit;