import React, {useEffect, useReducer, useState} from "react";
import AccountDetails from "../../components/Customer/Registration/AccountDetails";
import Address from "../../components/Customer/Registration/Address";
import PersonalDetails from "../../components/Customer/Registration/PersonalDetails";
import Card from "../../components/UI/Card";

import classes from './RegistrationForm.module.css';
import UseHttp from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { register } from "../../lib/api";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const initialCustomerDetailsState = {
    personalDetails: {
        name: '',
        username: '',
        password: '',
        email: '',
        contactNumber: '',
        dateOfBirth: ''
    },
    address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zipcode: ''
    },
    accountInformation: {
        accountNumber: '',
        branchName: '',
        balance: '',
        identityProofType: '',
        indentityProofNumber: ''
    }
};

const registrationDetailsReducer = (state, action) => {

    if (action.type === 'PersonalDetails') {
        return {
            ...state,
            personalDetails: action.value
        };
    }

    if (action.type === 'Addess') {
        return {
            ...state,
            address: action.value
        };
    }

    if (action.type === 'AccountDetails') {
        return {
            ...state,
            accountInformation: action.value
        };
    }

    return initialCustomerDetailsState;
}

const RegistrationForm = (props) => {

    const [isPersonalDetailsSumitted, setIsPersonalDetailsSumitted] = useState(false);
    const [isAdressSumitted, setIsAdressSumitted] = useState(false);
    const [isAccountDetailsSumitted, setIsAccountDetailsSumitted] = useState(false);

    const navigate = useNavigate();

    const {doPerform, status, error} = UseHttp(register);
    useEffect(()=>{
        if(status === 'completed' && !error){
            navigate("/login");
        }
    },[status, error, navigate])
   

    const [formState, dispatch] = useReducer(registrationDetailsReducer, initialCustomerDetailsState);
    
    const personalDetailsSubmitHandler = (personalDetails) => {
        setIsPersonalDetailsSumitted(true);
        dispatch({type: 'PersonalDetails', value: personalDetails})
    }

    const adressSubmitHandler = (address) => {
        setIsAdressSumitted(true);
        dispatch({type: 'Addess', value: address})
    }

    const accountDetailsSubmitHandler = (accountDetails) => {
        setIsAccountDetailsSumitted(true);
        dispatch({type: 'AccountDetails', value: accountDetails});
    };

    useEffect(()=>{
        if(isAccountDetailsSumitted){
            doPerform(formState);
        }
    },[isAccountDetailsSumitted,doPerform]);

    const personaDetailsFormCheckClass =  `form-check ${isPersonalDetailsSumitted? 'checked': ''}`;;
    const addessDetailsFormCheckClass = `form-check ${isAdressSumitted? 'checked': ''}`;
    const accountDetailsFormCheckClass = `form-check ${isAccountDetailsSumitted? 'active': ''}`;

    return (
        <React.Fragment>
            <h5 className={classes['form-header']}>REGISTER</h5>
            {status === 'pending' && <div className="centered"> <LoadingSpinner></LoadingSpinner> </div>}
            {status !== 'pending' && <React.Fragment>
                <Card className={classes['form-width']}>
                        <h6 className={classes['form-headers']}>Peronal Information<span className={personaDetailsFormCheckClass}><FontAwesomeIcon icon={faCircleCheck} /></span></h6>
                        {!isPersonalDetailsSumitted && <PersonalDetails className={classes['form-padding']} onSubmitDetails={personalDetailsSubmitHandler}></PersonalDetails>}
                </Card>
                <Card className={classes['form-width']}>
                    
                    <h6 className={classes['form-headers']}>Address Details <span className={addessDetailsFormCheckClass}><FontAwesomeIcon icon={faCircleCheck} /></span></h6>
                        {isPersonalDetailsSumitted && !isAdressSumitted && <Address className={classes['form-padding']} onSubmitDetails={adressSubmitHandler}></Address>}
                    
                </Card>
                <Card className={classes['form-width']}>
                        <h6 className={classes['form-headers']}>Account Details <span className={accountDetailsFormCheckClass}><FontAwesomeIcon icon={faCircleCheck} /></span></h6>
                        {isPersonalDetailsSumitted && isAdressSumitted && <AccountDetails className={classes['form-padding']} onSubmitDetails={accountDetailsSubmitHandler}></AccountDetails>}
                </Card>
            </React.Fragment> }
        </React.Fragment>
        

    );
}

export default RegistrationForm;
