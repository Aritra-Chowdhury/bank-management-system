import React from 'react';

import classes from './Navigation.module.css';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ModalActions } from '../../../store/Duct/modal-slice';
import { AuthActions } from '../../../store/Duct/auth-slice';

  const Navigation = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const userDetails = useSelector(state=>state.auth.userDetails);

  const logoutHandler =(event)=>{
    event.preventDefault();
    dispatch(AuthActions.logout());
  }


  const depositHandler =(event)=>{
    event.preventDefault();
    dispatch(ModalActions.toggleDeposit());
  }

  return (
    <nav className={classes.nav}>
      <ul>
        {!isLoggedIn && <li>
          <NavLink className={(navData) => 
                                navData.isActive ? classes.active: ''} to="/register">Register</NavLink>
        </li>}
        {!isLoggedIn && <li>
          <NavLink  className={(navData) => 
                                navData.isActive ? classes.active: ''} to="/login">Login</NavLink>
        </li>}
        {isLoggedIn && <li>
          <NavLink className={(navData) => 
                                navData.isActive ? classes.active: ''} onClick={props.onApplyLoan} to="/home/applyloan">Apply loan</NavLink>
        </li>}
        {isLoggedIn && <li>
          <button onClick={depositHandler}>Deposit</button>
        </li>}
        {isLoggedIn && <li>
          <NavLink className={(navData) => 
                                navData.isActive ? classes.active: ''} to="/home"><FontAwesomeIcon icon={faUser} />&nbsp; {userDetails.personalDetails.username}</NavLink>
        </li>}
        {isLoggedIn && <li>
          <NavLink onClick={logoutHandler} to="/login">Logout</NavLink>
        </li>}
      </ul>
    </nav>
        
  );

};

export default Navigation;
