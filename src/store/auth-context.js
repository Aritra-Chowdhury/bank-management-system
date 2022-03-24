// import React, {useEffect, useState } from "react";
// import UseHttp from "../hooks/useHttp";
// import { getCustomerDetails } from "../lib/api";

// const initialUserDetails = {
//     personalDetails: {
//         name: '',
//         username: '',
//         password: '',
//         email: '',
//         contactNumber: '',
//         dateOfBirth: ''
//     },
//     address: {
//         street: '',
//         city: '',
//         state: '',
//         country: '',
//         zipcode: ''
//     },
//     accountInformation: {
//         accountNumber: '',
//         branchName: '',
//         balance: '',
//         identityProofType: '',
//         indentityProofNumber: ''
//     }
// };

// const AuthContext = React.createContext({
//     userDetails: initialUserDetails,
//     isLoggedIn: false,
//     onLogout: () => {},
//     onLogin: (userData) => {},
//     updateUserDetails: (userDetails)=>{}
// });

// export const AuthContextProvider = (props)=>{

//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userDetails, setUserDetails] = useState(initialUserDetails);


//     const {doPerform, status, error, data:loadedCustomers } = UseHttp(getCustomerDetails);

//     useEffect(()=>{
//         if(status === 'completed' && !error && loadedCustomers.length > 0){
//             setUserDetails(loadedCustomers[0]);
//         }
//     },[loadedCustomers,error,status,userDetails]);
    
//     useEffect(()=>{
//         const localStorageInfo = localStorage.getItem('isLoggedIn');
//         const localStorageLoggeduser = localStorage.getItem('loggeduser');
//         if(localStorageInfo === "1" && localStorageLoggeduser !== null){
//             setIsLoggedIn(true);
//             if(userDetails.personalDetails.email === ''){
//                 doPerform(localStorageLoggeduser);
//             }
            
//         }
//     },[isLoggedIn, doPerform]);

//     const loginHandler = (userData)=>{
//         localStorage.setItem('isLoggedIn', '1');
//         localStorage.setItem('loggeduser', userData.personalDetails.email);
//         setIsLoggedIn(true);
//         setUserDetails(userData);
//     }

//     const logoutHandler = ()=>{
//         localStorage.removeItem('isLoggedIn');
//         localStorage.removeItem('loggeduser');
//         setIsLoggedIn(false);
//         setUserDetails(initialUserDetails);
//     }

//     const userDetailsHandler = (userData)=>{
//         setUserDetails(userData);
//     }

//     return(
//         <AuthContext.Provider value={{
//             userDetails: userDetails,
//             isLoggedIn: isLoggedIn,
//             onLogout : logoutHandler,
//             onLogin : loginHandler,
//             updateUserDetails: userDetailsHandler
//         }}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// }

// export default AuthContext;