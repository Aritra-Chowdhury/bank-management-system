import './App.css';
import LoginForm from './pages/Login/LoginForm';
import RegistrationForm from './pages/Register/RegistrationForm';
import MainHeader from './components/UI/MainHeader/MainHeader';
import React, { useEffect } from 'react';
import Home from './components/Home/Home';
import DepositAmount from './components/Home/Deposit/DepositAmount';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoanDetailsForm from './pages/Loan/LoanDetailsForm';
import LoanList from './components/Home/LoanList/LoanList';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from './store/Duct/auth-slice';

function App() {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const userDetails = useSelector(state=>state.auth.userDetails);
  const showDeposit = useSelector(state=>state.modal.showDeposite);


  useEffect(()=>{
    const localStorageInfo = localStorage.getItem('isLoggedIn');
    const localStorageLoggeduser = localStorage.getItem('loggeduser');
    if(localStorageInfo === "1" && localStorageLoggeduser !== null){
      dispatch(AuthActions.setIsLoggedIn(true));
      if(userDetails.personalDetails.email === ''){
        dispatch(AuthActions.getUserDetails(localStorageLoggeduser));
      }   
    }
  },[dispatch]);

 

  const homeContent = (
    <React.Fragment>
      <Home></Home> 
      {showDeposit && <DepositAmount></DepositAmount>}
    </React.Fragment>
  );

  return (
    <div className="app">
      <MainHeader></MainHeader>
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate replace to="/home"></Navigate> : <LoginForm></LoginForm>
        }/>
        <Route path="/register" element={
          isLoggedIn ? <Navigate replace to="/home"></Navigate> : <RegistrationForm></RegistrationForm>
        }/>
        <Route path="/home" element={
          isLoggedIn ?  homeContent :
          <Navigate to="/login"></Navigate>
        }>
          <Route path="applyloan" element={<LoanDetailsForm></LoanDetailsForm>}/>
          <Route path="" element={<LoanList></LoanList>}/>
        </Route>
        <Route path="*" element={
          <Navigate replace to={ isLoggedIn ?"/home":"/login"}></Navigate>
        }/>

      </Routes>  
    </div>
  );
}

export default App;
