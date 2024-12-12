import axios from "axios";
import { saveAs } from 'file-saver';
export const OrgAdminmailcheckget = async (id) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  //Get method start
  try {
    let response2 = await fetch(`/bank/v1/sigmadocsummary/${id}`,
      {
        headers: {
          'x-api-key': `${key}`
        },
      }
    )
    console.log("err",response2)
    const data2 = await response2.json();
    console.log("Api inside", data2);
    // return {data2};
    return [true, data2];
  } catch (err) {
    console.log("vercelerrro", err);
    return [false, ""];
  }
};

export const OrgAdminmailcheckget1 = async(email) =>{
   console.log("mailcheck",email)
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let cancelToken;
      if(typeof cancelToken != typeof undefined)
      {
        cancelToken.cancel("API Call cancelled")
      }
      let response2 = await fetch(`/bank/v1/userinfo/${email}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2[0]);
      // return {data2};
      if ((data2[0]) === "" || (data2[0]) === null || (data2[0]) === undefined) {
        return [false,""];
      } 
    else{
      return [true,(data2[0])];
    }
      
      // return [true, (data2[0]).tennantId];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}
export const OrgAdminmailcheckget2 = async(id) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/bank/v1/networkbytennatid/${id}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside1", data2)
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const CreateOrganizationPost = async (name, organizationname) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/bank/v1/org',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'name': `${name}`,
            'createdBy': `${organizationname}`,
        }
      };
      let tentidresponse ="";
      try {
     let response = await axios.request(options2);
     tentidresponse= await response.data;
     console.log("response",tentidresponse);
      }catch(error){
        console.error("done2",error);
      }
      // axios.request(options2).then(function (response2) {
      // //  window.location.reload();
      // }).catch(function (error) {
      //     console.error("done2",error);
      // });
     
      return tentidresponse;
}
export const CreateOrguserrolepost = async (emailid, name, role, tenentid) =>
{         
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/bank/v1/userinfo',
        data: {
            'emailId': `${emailid}`,
            'userName': `${name}`,
            'password':"",
            'roleType': `${role}`,
            'method':"",
            'tennantId':`${tenentid}`
        }
      };
      try {
        const response = await axios(options2);
        const result = response.data;
        const title = 'User access';
        const description = `You have successfully added ${emailid} as a role: ${role} and the added user will receive an E-mail for confirmation.`;
        const tennat_id = tenentid;
        const statuses = false;
      
        await NotificationPost(title, description, localStorage.getItem("UserID"), tennat_id, statuses);
        console.log('Response:', result);
        return result;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
}
export const Orgadminsignup = async (emailid,Pwd,signInMethod) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: '/bank/v1/userinfo',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'password': `${Pwd}`,
            'method':`${signInMethod}`,
            'emailId': `${emailid}`
          
          
        }
      };
      let usercheck=true;
      try {
        let response = await axios.request(options2);
        let statuscheck= await response.data;
        console.log("response",statuscheck);
         }catch(error){
           console.error("done2",error);
           usercheck=false;
         }
         return usercheck;


      // await axios.request(options2).then(function (response2) {
      //  console.log("response",response2);
      //  return true;
      // //  window.location.reload();
      // }).catch(function (error) {
      //     console.error("done2",error);
      //     return false;
      // });
}


export const updateuser = async (emailId,roleType) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: `/bank/v1/userinfo/${emailId}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'emailId': `${emailId}`,
            'roleType': `${roleType}`
          
        }
      };
      let usercheck=true;
      try {
        let response = await axios.request(options2);
        let statuscheck= await response.data;
        console.log("response",statuscheck);
         }catch(error){
           console.error("done2",error);
           usercheck=false;
         }
         return usercheck;
}

export const Orguserlogincheck = async (emailid,pwd) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/bank/v1/userdetailexists',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'emailId': `${emailid}`,
            'password':`${pwd}`
           
        }
      };

     let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;
    
}
export const Sessionloginpost = async (currentDateTime,logouttime,userlogstatus,tenentid,role,email) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/bank/v1/session',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'loginTime': currentDateTime.toString(),
            'logoutTime': "",
            'activity':`${userlogstatus}`,
            'tennatId': `${tenentid}`,
            'roleType':`${role}`,
            'mailId':`${email}`
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
       return response2;
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}
export const Sessionstatusget= async(email) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/bank/v1/session/${email}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
}


export const Sessionstatusget1 = async (id) => {
  console.log("getticket",id)
  const url = `/bank/v1/session/${id}`;
  const key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': key,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};


export const Sessionstatusupdate = async (logintime,logouttime,logstatus,email) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let profilepicofuserdefault = "https://gateway.pinata.cloud/ipfs/Qma6vhaA98FmVUMyMUJLvdxVsT2wJJWH5key2gtKr3jftZ?_gl=1*j61wws";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: '/bank/v1/session',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          'loginTime':`${logintime}`,
          'logoutTime':`${logouttime}`,
          'activity':`${logstatus}`,
          'mailId':`${email}`,
          
           
           
        }
      };

     let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;
    
}
export const fetchSigmadocByTid = async (start, limit, tenantId) => {
  const url = '/bank/v1/sigmadocbytid';
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';
  
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const options = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key
    },
    data: {
      start: start,
      limit: limit,
      tenantId: tenantId
    }
  };

  try {
    const response = await axios(options);
    const sigmadocData = response.data;
    console.log('Response:', sigmadocData);
    return sigmadocData;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
export const fetchSigmadocdetails = async (sigmaId) => {
  console.log("id", sigmaId);
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  try {
    const response3 = await fetch(`/bank/v1/sigmadoc/${sigmaId}`, {
      headers: {
        'x-api-key': `${key}`
      },
    });
    console.log("response", response3);

    const data = await response3.json();
    console.log("Api inside", data);
    return [true, data];
  } catch (err) {
    console.log("Error fetching document details:", err);
    return [false, ""];
  }
};

export const addToFavorites = async (emailId, sigmaId, name__v, filename__v, status__v, tenantId) => {
  const url = '/bank/v1/favourite';
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const options = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key
    },
    data: {
      emailId:emailId,
      docId: sigmaId,
      docName: name__v,
      fileName: filename__v,
      docStatus: status__v
    }
  };

  console.log("docId", sigmaId);
  
  try {
    const response = await axios(options);
    const result = response.data;
    const title = 'Favourites';
    const description = `${filename__v} is added to favourites.`;
    const tennat_id = tenantId;
    const statuses = false;
  
    await NotificationPost(title, description, emailId, tennat_id, statuses);
    console.log('Response:', result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const fetchFavoriteDetails = async (emailId,limit) => {
  console.log("mail",emailId)
  const url = `/bank/v1/favourite/${emailId}/${limit}`;
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';

  try {
    const response = await axios.get(url, {
      headers: {
        'x-api-key': key
      }
    });
    
    console.log('Response:', response);

    // Assuming the response data is in the 'data' field
    const data = response.data;
    console.log('fetchFavoriteDetails:', data);
    return [true, data];
  } catch (error) {
    console.error('Error fetching favorite details:', error);
    return [false, null];
  }
};

export const deleteFavorite = async (emailId, sigmaId, filename_v, tenantId) => {
  const url = `/bank/v1/favourite/${emailId}/${sigmaId}`;
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const options = {
    method: 'DELETE',
    url,
    headers: {
      'x-api-key': key
    },
    data: {}
  };

  try {
    const responsed = await axios(options);
    console.log('Responsed:', responsed);
    const title = 'Favourites';
    const description = `${filename_v} is removed from favourites.`;
    const tennat_id = tenantId;
    const statuses = false;
  
    await NotificationPost(title, description, emailId, tennat_id, statuses);
    return responsed;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const forgetPasswordMailVerification = async(email) =>{

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  //console.log("done1",response.data);
    // console.log("date",date);
    const options2 = {
      method: 'POST',
      url: `platform/v1/userdetails/${email}`,
    };
    let MailVerify = false;
    await axios.request(options2).then(async function (response2) {
     console.log("response",response2);
     let present = await userDetailWithEmail(email)
     MailVerify = present[0];
    //  window.location.reload();
    }).catch(function (error) {
        console.error("done2",error);
        MailVerify = false;
    });
 return MailVerify;
}

export const resetPasswordSubmit = async (email, password, otp) =>
{       
let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
// let userID = localStorage.getItem('UserID');
// let connectAddress = localStorage.getItem("walletAddress");
// let profilepicofuserdefault = "https://gateway.pinata.cloud/ipfs/Qma6vhaA98FmVUMyMUJLvdxVsT2wJJWH5key2gtKr3jftZ?_gl=1*j61wws";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//console.log("done1",response.data);
  // console.log("date",date);
  const options2 = {
    method: 'PUT',
    url: `bank/v1/userPassword/${email}`,
    headers: {
      'x-api-key': `${key}`    
    },
    data: {
      'emailId':`${email}`,
      'password':`${password}`,
      'otp':`${otp}`
    }
  };

  let MailVerify = false;
  try {
    let response = await axios.request(options2);
    MailVerify = true;
    let ev = response.data.result;
      let present = ev.indexOf("Failed")
      if(present>1){
        MailVerify =false;
      }
      else{
        MailVerify=true;
      }
    console.log("response",response.data);
  }catch(error){
    console.error("done2",error);
    MailVerify = false;
  }
 
  return MailVerify;
}
export const Userprofileupload = async (Firstname,lastname,emailid) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let profilepicofuserdefault = "https://gateway.pinata.cloud/ipfs/Qma6vhaA98FmVUMyMUJLvdxVsT2wJJWH5key2gtKr3jftZ?_gl=1*j61wws";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/userprofile',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          'firstName':`${Firstname}`,
          'lastName':`${lastname}`,
          'mobileNumber':"",
          'profilePic':"",
          'gender':"",
          'state':"",
          'country':"",
          'launguage':"",
          'timeZone':"",
          'emailId': `${emailid}`,
           
           
        }
      };

     let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;
    
}

export const Userprofileupdate = async (Firstname,lastname,mobno,Img,gender,state,selectedCountry,launguage,timezone,emailid) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  let profilepicofuserdefault = "https://gateway.pinata.cloud/ipfs/Qma6vhaA98FmVUMyMUJLvdxVsT2wJJWH5key2gtKr3jftZ?_gl=1*j61wws";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: '/platform/v1/userprofile',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          'firstName':`${Firstname}`,
          'lastName':`${lastname}`,
          'mobileNumber':`${mobno}`,
          'profilePic':`${Img}`,
          'gender':`${gender}`,
          'state':`${state}`,
          'country':`${selectedCountry}`,
          'launguage':`${launguage}`,
          'timeZone':`${timezone}`,
          'emailId': `${emailid}`
           
           
        }
      };

     let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;
    
}

export const userprofileget = async(email) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/userprofile/${email}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const getSigmafieldConfig = async (tennatid) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
  try{
    let response2 = await fetch(`/bank/v1/sigmafieldconf/${tennatid}`, 
    {
        headers: {
            'x-api-key': `${key}`    
          },
      }
      )
    //console.log(response2);
    // let response = await axios.request(options2);
    // tentidresponse= await response.data;
    // console.log("response",tentidresponse)
      
    const data2 = await response2.json();
    // console.log("Api inside", data2)
    // return {data2};
    return [true,data2];
  }catch(err){
    console.log("vercelerrro",err)
    return [false,""];
  }
    
}

export const getJobList = async (tennatid,start,limit) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/bank/v1/job',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          tenantId:tennatid,
          limit:limit,
          start:start
           
        }
      };

     let jobsList =[];
      try {
        const response = await axios(options2);
         jobsList = response.data;
        console.log('Responsejob:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}

export const getJobListImmutable = async (tennatid,start,limit) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/bank/v1/job',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          tenantId:tennatid,
          limit:limit,
          start:start
           
        }
      };

     let jobsList =[];
      try {
        const response = await axios(options2);
         let jobsLists = response.data;
         jobsLists.map((r,i)=>{
          if(r.jobName === "MAKE_IREC"){
            jobsList.push(r);
          }
          console.log("datasr",jobsList)
         })
        // console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}

export const executeJobListImmutable = async () =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/bank/v1/finalisedocs',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          
           
        }
      };

     let jobsList ;
      try {
        const response = await axios(options2);
        jobsList = response.data;
         
        console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}

export const userDetailWithEmail = async (emailid) =>
{       
  try{
    let cancelToken;
    if(typeof cancelToken != typeof undefined)
    {
      cancelToken.cancel("API Call cancelled")
    }
    let response2 = await fetch(`/bank/v1/userdetail/${emailid}`)
    //console.log(response2);
    // let response = await axios.request(options2);
    // tentidresponse= await response.data;
    // console.log("response",tentidresponse)
      
    const data2 = await response2.json();
    // console.log("Api inside", data2)
    // return {data2};
    return [true, data2];
  }catch(err){
    console.log("vercelerrro",err)
    return [false, ""];
  }
}

export const OrgTenentcheckget = async(tenentId, pageSize) =>{
   console.log("orgTenant", tenentId);
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let cancelToken;
      if(typeof cancelToken != typeof undefined)
      {
        cancelToken.cancel("API Call cancelled")
      }
      let response2 = await fetch(`/bank/v1/userdetailbytennant/${tenentId}/${parseInt(pageSize)}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("orgTenant check", data2);
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const DeleteOrgUser = async (emailid) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'DELETE',
        url: `/bank/v1/userdetail/${emailid}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            
        }
      };
      try {
      const response2 = await axios.request(options2);
      console.log("response", response2);
      if (response2.status === 200) {
        const title = 'User Deletion';
        const description = `User with email ${emailid} has been deleted.`;
        
        const tennat_id = await getTennantId(); // Assuming tenentid is defined
        const statuses = false;
  console.log("tennat_id",tennat_id);
        await NotificationPost(title, description, localStorage.getItem("UserID"), tennat_id, statuses);
      }
  
      return response2;
      // axios.request(options2).then(function (response2) {
        
      //  console.log("response",response2);
      //  return response2;
       
      // //  window.location.reload();
      // })
      }
      catch (error) {
        console.error("Error:", error);
        throw error;
      }
}

export const getTransaction = async (start,limit,tennatId) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/bank/v1/tx',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          "start":start,
          "limit":limit,
          "tenantId":tennatId
           
        }
      };

     let jobsList=[] ;
      try {
        const response = await axios(options2);
        jobsList = response.data;
         
        console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}
export const getTransactionblock = async (start,limit,tennatId) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/bank/v1/blockstx',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          "start":start,
          "limit":limit,
          "tenantId":tennatId
           
        }
      };

     let jobsList=[] ;
      try {
        const response = await axios(options2);
        jobsList = response.data;
         
        console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}
export const nodeDetails = async (tenantId) =>
{       
  try{
    let response2 = await fetch(`/bank/v1/sigmanodesummary/${tenantId}`)
    //console.log(response2);
    // let response = await axios.request(options2);
    // tentidresponse= await response.data;
    // console.log("response",tentidresponse)
      
    const data2 = await response2.json();
    // console.log("Api inside", data2)
    // return {data2};
    return [true, data2];
  }catch(err){
    console.log("vercelerrro",err)
    return [false, ""];
  }
    
}



export const getTennantId = async () =>
{       
  let usermailid = localStorage.getItem("UserID");
  
  try{
    let response2 = await fetch(`/bank/v1/userdetail/${usermailid}`)
    //console.log(response2);
    // let response = await axios.request(options2);
    // tentidresponse= await response.data;
    // console.log("response",tentidresponse)
      
    const data2 = await response2.json();
    console.log("getTennantId", data2)
    // return {data2};
    return  (data2[0]).tennantId;
  }catch(err){
    console.log("vercelerrro",err)
    return "";
  }
    
}
export const createUserVisits = async(emailid,type,page) =>{

  const res = await fetch('https://geolocation-db.com/json/')
  // console.log("ipv4",await res.json())
  let k = (await res.json()).IPv4;
  console.log("ipv4",k)

    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    let datas = {
         "ipAddress":(k).toString(),
        "algoAddress":emailid,
        "networkType":type,
        "walletType":page
        
        }


const options2 = {
    method: 'POST',
    url: '/bank/v1/userVisitRecord',
    headers: {
        'x-api-key': `${key}`    
    },
    data: datas
    };
    
    axios.request(options2).then(function (response2) {
    console.log("hlo",response2);
    console.log("update successfull15")
    }).catch(function (error) {
        console.error("done2",error);
    });
    
}
export const NotificationPost = async(title, description, email_id, tennat_id, statuses) => {

  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = {
           
    "title": title,
    "descriptions": description,
    "mailId": email_id,
    "epochtime": (Date.now())/1000,
    "tennatId": tennat_id,
    "statuses": statuses
  }

  const options2 = {
  method: 'POST',
  url: '/bank/v1/notification',
  data: data
  };
  
  axios.request(options2).then(function (response2) {
  console.log("notification", response2);
  return [true, response2];
  }).catch(function (error) {
      console.error("done2", error);
      return [false, 'Error occurred while fetching data'];
});
}

export const NotificationSingle = async(id, email_id, status) => {
  console.log("status", status);
if(status != true)
{
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = {
           
    "id": id,
    "mailId": email_id,
    "statuses": true
  }

  const options2 = {
  method: 'PUT',
  url: '/bank/v1/notificationbyid',
  data: data
  };
  
  axios.request(options2).then(function (response2) {
  console.log("notification", response2);
  return [true, response2];
  }).catch(function (error) {
      console.error("done2", error);
      return [false, 'Error occurred while fetching data'];
});
}
}

export const NotificationAll = async(email_id) => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = {   
    "mailId": email_id,
    "statuses": true
  }

  const options2 = {
  method: 'PUT',
  url: '/bank/v1/notification',
  data: data
  };
  
  axios.request(options2).then(function (response2) {
  console.log("notification", response2);
  return [true, response2];
  }).catch(function (error) {
      console.error("done2", error);
      return [false, 'Error occurred while fetching data'];
});

}

export const getNotificationById = async (emailid) => {
  console.log("mailnotify",emailid)
  const url = `/bank/v1/notification/${emailid}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const userByTenantId = async (tenantId) => {
  const url = `bank/v1/userdetailbytennantall/${tenantId}`;

  try {
    const response = await fetch(url);

    const data2 = await response.json();
    console.log("userdetailbytennant", data2)
    // return {data2};
    return [true, data2.length];
  }catch(err){
    console.log("userdetailbytennant",err)
    return [false,""];
  }
};
export const HelpandsupportPost = async(Ticket,Description,firstname,lastname,emailid,TennatId,statuse) =>{
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let datas = {
           
    "ticket": Ticket,
    "descriptions": Description,
    "firstName":firstname,
    "lastName":lastname,
    "mailId": emailid,
    "epochtime":"",
    "tennatId": TennatId,
    "statuses": statuse
  }

  const options2 = {
  method: 'POST',
  url: '/bank/v1/helpandsupport',
  headers: {
      'x-api-key': `${key}`    
  },
  data: datas
  };
  
  axios.request(options2).then(function (response2) {
  console.log("notification",response2);
  
  // console.log("update successfull15")
  }).catch(function (error) {
      console.error("done2",error);
});
}

export const getTicketsById = async (pageno) => {
  console.log("getticket",pageno)
  const url = `/bank/v1/helpandsupport/${pageno}`;
  const key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': key,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const ResolveTicket = async(email_id,id,tenantId) => {
  console.log("email",email_id,id,tenantId);
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = { 
    "id":id,  
    "mailId": email_id,
    "statuses": true
  }

  const options2 = {
  method: 'PUT',
  url: '/bank/v1/helpandsupportbyid',
  data: data
  };
  try {
    const response = await axios(options2);
    const result = response.data;
    const title = 'Sigma Help and Support';
    const description = `The ticket originating from ${email_id} has been resolved. Kindly review your email for updates. If you have any additional questions, please feel free to reach out to us through the admin mail or the Help and Support Ticket System.`;
    const tennat_id = tenantId;
    const statuses = false;
  
    await NotificationPost(title, description, email_id, tennat_id, statuses);
    console.log('Response:', result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
//   axios.request(options2).then(function (response2) {
//   console.log("helpandsupportbyid", response2);
//   return [true, response2];
//   }).catch(function (error) {
//       console.error("done2", error);
//       return [false, 'Error occurred while fetching data'];
// });

}
export const getNFTProp = async (id,tennatId) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: `/bank/v1/nftdetails/${id}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
          
          "tenantId":tennatId
           
        }
      };

     let jobsList=[] ;
      try {
        const response = await axios(options2);
        jobsList = response.data;
         
        console.log('Response:', jobsList);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return jobsList;
    
}

export const getJobsCountByType = async (type) => {
  const url = `/bank/v1/jobname/${type}`;
  const key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': key,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return  data;
    } else {
      return 0;
    }
  } catch (error) {
    console.log('Error:', error);
    return 0;
  }
};
export const getLatestJObTime = async () => {
  const url = `/bank/v1/jobmanagetime`;
  const key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': key,
      },
    });
  console.log("timeresponse", response);
    if (response.ok) {
      const data = await response.text();
      console.log("API Response Data:", data);
      console.log("--time--", data);
      return data;
    } else {
      return 0; 
    }
  } catch (error) {
    console.log('--time--', error);
    return 0;
  }
};


export const help1 = async(id,email_id,assignee) => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = { 
    "id": id,  
    "mailId": email_id,
    "assignee":assignee
  
  }

  const options2 = {
  method: 'PUT',
  url: '/bank/v1/helpandsupportstatus',
  data: data
  };
  
  axios.request(options2).then(function (response2) {
  console.log("notification1", response2);
  return [true, response2];
  }).catch(function (error) {
      console.error("done2", error);
      return [false, 'Error occurred while fetching data'];
});

};
export const getNotificationById1 = async (id) => {
  
  console.log("hi",id)
  const url = `/bank/v1/jobnotifyemail/${id}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};



export const getNotificationById2 = async(emailId,tenantId) =>{
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let datas = {
           
   
    "emailId": emailId,
    "tenantId": tenantId
   
  }

  const options2 = {
  method: 'POST',
  url: '/bank/v1/jobnotifyemail',
  headers: {
      'x-api-key': `${key}`    
  },
  data: datas
  };
  
  axios.request(options2).then(function (response2) {
  console.log("notification1",response2);
  
  // console.log("update successfull15")
  }).catch(function (error) {
      console.error("done2",error);
});
}



export const getNotificationById3 = async (userId, emailId, tenantId) => {
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  let data = {
    "userId": userId,
    "emailId": emailId,
    "tenantId": tenantId
  };

  const options2 = {
    method: 'PUT',
    url: '/bank/v1/jobnotifyemail',
    data: data
  };

  try {
    const response2 = await axios.request(options2);
    console.log("notification2", response2);
    return [true, response2];
  } catch (error) {
    console.error("done2", error);
    return [false, 'Error occurred while fetching data'];
  }
};


export const getNotificationById4 = async (userId) =>

{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'DELETE',
        url: `/bank/v1/jobnotifyemail/${userId}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("response",response2);
       return response2;
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}

export const jobschedulardetailpost = async (email,role,tenentid,userlogstatus) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: '/platform/v1/jobschedule',
        headers: {
          'x-api-key': `${key}`    
        },
        data: {
            'mailId':`${email}`,
            'roleType': `${role}`,
            'tennatId':`${tenentid}`,
            'activity':`${userlogstatus}`
        }
      };
      
      axios.request(options2).then(function (response2) {
       console.log("responsepost",response2);
       return response2;
      //  window.location.reload();
      }).catch(function (error) {
          console.error("done2",error);
      });
}
// export const jobreschedulardetail = async (schduletime) =>
// {       
//   let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
//   // let userID = localStorage.getItem('UserID');
//   // let connectAddress = localStorage.getItem("walletAddress");
//   // let network = "AB";
  
//     axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//     //console.log("done1",response.data);
//       // console.log("date",date);
//       const options2 = {
//         method: 'POST',
//         url: `/platform/v1/updatedelay/${schduletime}`,
//         headers: {
//           'x-api-key': `${key}`    
//         },
       
//       };
      
//       axios.request(options2).then(function (response2) {
//        console.log("response",response2);
//        return response2;
//       //  window.location.reload();
//       }).catch(function (error) {
//           console.error("done2",error);
//       });
// }


export const jobreschedulardetail = async (schduletime,email,role,tenentid,userlogstatus) =>
{         
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'POST',
        url: `/bank/v1/update-delay/${schduletime}`,
        
      };
      try {
        const response = await axios(options2);
        const result = response.data;
      
        const mail_Id = email;
        const roletype=role;
        const tennat_id = tenentid;
        const usersettime = userlogstatus;
      
        await jobschedulardetailpost(localStorage.getItem("UserID"),roletype,tennat_id, usersettime);
        console.log('Response:', result);
        return result;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
}
export const jobschedulardetailget= async() =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/jobschedule`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const jobschedulardetailgetbyid= async(tennantId) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/jobschedule/${tennantId}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}
export const handleWriteToFile = async(tennantId,ipfshash) => {
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
 
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    const options2 = {
      method: 'POST',
      url: '/bank/v1/sigmadocbytid/rest/download',
      headers: {
        'x-api-key': key,
        'Content-Disposition': 'attachment; filename="picture.pdf"',
      },
      data: {
        "tenantId": `${tennantId}`,
        "ipfsHash": `${ipfshash}`,
      },
      responseType: 'arraybuffer', // Set the response type to arraybuffer
    };
    

      try {
        
       
        const response = await axios(options2);
        console.log("reponsecheck",response);
        let datavalue = response.data;
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'document.pdf'); // Set the desired file name
        document.body.appendChild(link);
        link.click();
       
        console.log('download:', response);
       
      }catch(error){
      }
        
    
}
export const handleWriteToDocumentlist = async (start, limit,tennantId) => {
  const url = '/bank/v1/sigmadocbytid';
  const key = 'BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5';
  
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  const options = {
    method: 'POST',
    url,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key
    },
    data: {
      start: start,
      limit: limit,
      tenantId:tennantId
    }
  };

  try {
    const response = await axios(options);
  const sigmadocData = response.data;
  console.log('Response:', sigmadocData);

  // Download the data as CSV
  if (sigmadocData && sigmadocData.length > 0) {
    const csvData = [
      "Document Name,Document ID,Version ID,Document Creation Date,File Modified Date,File Created Date,Document Status,NFT Creation Status,",
      ...sigmadocData.map(row => (
        `"${row.filename__v}","${row.sigmaId}","${row.jobId}","${row.document_creation_date__v}","${row.file_modified_date__v}","${row.file_created_date__v}","${row.status__v}","${row.nftCreationStatus === '0' ? 'Pending' : row.nftCreationStatus === '1' ? 'Approved' : ''}"`
      )),
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'document_list.csv');
  }

  return sigmadocData;
} catch (error) {
  console.error('Error:', error);
  return null;
}
};
export const jobstatusupdate = async (tennantId,jobtype,jobstatus) =>
{       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  // let userID = localStorage.getItem('UserID');
  // let connectAddress = localStorage.getItem("walletAddress");
  // let network = "AB";
  
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    //console.log("done1",response.data);
      // console.log("date",date);
      const options2 = {
        method: 'PUT',
        url: `/bank/v1/jobtrigger/${tennantId}/${jobtype}/${jobstatus}`,
        headers: {
          'x-api-key': `${key}`    
        },
        data: {}
      };
      let userlogincheck ="";
      try {
     let response = await axios.request(options2);
     userlogincheck= await response.data;
     console.log("response",userlogincheck);
      }catch(error){
        console.error("done2",error);
      }
    
     
      return userlogincheck;


    
}

export const Jobstatusget= async() =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/platform/v1/jobhandle`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}
export const uservisitrecord= async(id) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/bank/v1/uservisitrecord/${id}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}


export const uservisitrecords= async(id) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/bank/v1/uservisitrecord`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      return [true,data2];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}
export const getoriginaldocprop = async (tennatId, docid) => {       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  // const id = 31;

  const options2 = {
    method: 'POST',
    url: `/bank/v1/veevadocs/${tennatId}/${docid}`,
    headers: {
      'x-api-key': `${key}`    
    },
    data: '1',
  };

  let docsList = [];

  try {
    const response = await axios(options2);
    docsList = response.data;
    console.log('Response:', docsList);
  } catch (error) {
    console.error("Error:", error);
  }
  
  return docsList;
}

export const getoriginaldoccount = async (tennatId) => {       
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
  
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  // const id = 31;

  const options2 = {
    method: 'POST',
    url: `/bank/v1/sigmadoc2countbytid/${tennatId}`,
    headers: {
      'x-api-key': `${key}`    
    },
    data: '1',
  };

  let docscount = [];

  try {
    const response = await axios(options2);
    docscount = response.data;
    console.log('Response:', docscount);
  } catch (error) {
    console.error("Error:", error);
  }
  
  return docscount;
}
export const OrgPwdCheck = async(email) =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let cancelToken;
      if(typeof cancelToken != typeof undefined)
      {
        cancelToken.cancel("API Call cancelled")
      }
      let response2 = await fetch(`/platform/v1/pwdcheck/${email}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
 
        const data2 = await response2.text(); // Get the raw response text
        
        console.log("PWD check", data2);
        return data2;
      // return {data2};
      // return data2;

      
      // return [true, (data2[0]).tennantId];
    }catch(err){
      console.log("vercelerrro",err)
      return [false,""];
    }
     
}

export const userByTenantIdAll = async (tenantId) => {
  const url = `platform/v1/userdetailbytennantall/${tenantId}`;
  console.log("url", url)
  let tidall;
  try {
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    const options2 = {
       method: 'GET',
    url: `/bank/v1/userdetailbytennantall/${tenantId}`,
    headers: {
        'x-api-key': `${key}`    
    },
   
    };
    
    await axios.request(options2).then(function (response2) {
    console.log("notification",response2);
    let dt =  response2.data;
    tidall=dt;
    console.log("notification",dt);
    // return [true, dt];
    // console.log("update successfull15")
    })
    // return {data2};
    // return [true, data2];
  }catch(err){
    console.log("userdetailbytennant",err)
    // return [false,""];
  }
  return tidall;
};
export const joblasttime= async() =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    try{
      let response2 = await fetch(`/bank/v1/joblasttime`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
      // let response = await axios.request(options2);
      // tentidresponse= await response.data;
      // console.log("response",tentidresponse)
        
      const data2 = await response2.json();
      console.log("Api inside", data2)
      // return {data2};
      return data2;
    }catch(err){
      console.log("vercelerrro",err)
      return "";
    }
     
}