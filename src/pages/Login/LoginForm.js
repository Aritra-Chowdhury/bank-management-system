import React, {useEffect, useState} from "react";
import { Form } from "react-bootstrap";
import UseHttp from "../../hooks/useHttp";
import UseInput from "../../hooks/useInput";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";

import classes from "./LoginForm.module.css";
import { login } from "../../lib/api";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../store/Duct/auth-slice";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const prepareInputParams = (name, id, type, label, value, placeholder, error, invalidMessage, inputChangeHandler, inputBlurHandler) => {

    return {
        name: name,
        id: id,
        type: type,
        label: label,
        value: value,
        placeholder: placeholder,
        error: error,
        invalidMessage: invalidMessage,
        inputChangeHandler: inputChangeHandler,
        inputBlurHandler: inputBlurHandler,
        required: true
    }
}

const isNotEmpty = (value) => value.trim() !== '';
const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const isPasswordValid = (value) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value.trim());

const LoginForm = (props) => {

    const [formIsValid, setFormIsValid] = useState(false);

    const dispatch = useDispatch();
    const {
        value: enteredUserName,
        hasError: enteredUserNameIsInvalid,
        isValid: enteredUserNameIsValid,
        inputValueReset: userNameReset,
        inputValueChangeHandler: userNameChangeHandler,
        inputValueChangeBlur: userNameChangeBlurHandler,
    } = UseInput((value) => isNotEmpty(value));

    const userNameInputParams = prepareInputParams('loginusername', 'loginusername', 'text', 'Enter user name', enteredUserName, 'User name', enteredUserNameIsInvalid, 'User Name is required', userNameChangeHandler, userNameChangeBlurHandler);
    
    const {
        value: enteredPassword,
        hasError: enteredPasswordIsInvalid,
        isValid: enteredPasswordIsValid,
        inputValueReset: passwordReset,
        inputValueChangeHandler: passwordChangeHandler,
        inputValueChangeBlur: passwordChangeBlurHandler,
    } = UseInput((value) => isNotEmpty(value) && isPasswordValid(value));

    const passwordInputParams = prepareInputParams('loginpassword', 'loginpassword', 'password', 'Enter password', enteredPassword, 'Enter password', enteredPasswordIsInvalid, 'Password is required and should be follow pattern', passwordChangeHandler, passwordChangeBlurHandler);

    const {
        value: enteredEmail,
        hasError: enteredEmailIsInvalid,
        isValid: enteredEmailIsValid,
        inputValueReset: emailReset,
        inputValueChangeHandler: emailChangeHandler,
        inputValueChangeBlur: emailBlurChangeHandler,
    } = UseInput((value) => isNotEmpty(value) && isEmailValid(value));

    const emailInputParams = prepareInputParams('loginemail', 'loginemail', 'email', 'Enter Your Email', enteredEmail, 'something@mail.com', enteredEmailIsInvalid, 'Email is required', emailChangeHandler, emailBlurChangeHandler);


    const validatePersonalDetails = () => {
        const isValid = enteredUserNameIsValid && enteredPasswordIsValid && enteredEmailIsValid ;
        setFormIsValid(isValid);
    }

    const resetForm = () => {
        userNameReset();
        passwordReset();
        emailReset();

        setFormIsValid(false);
    }

    const {doPerform, status , error , data:loadedCustomers } = UseHttp(login);

    useEffect(()=>{
        if(status === 'completed' && !error && loadedCustomers.length > 0){
            dispatch(AuthActions.login(loadedCustomers[0]));
        }
    },[status,error,dispatch,loadedCustomers]);
   

    const loginSubmitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }
        
        doPerform({username: enteredUserName, password: enteredPassword, email: enteredEmail});

    }


    return (

        <React.Fragment>
             <Card className={classes['form-width']}>
                <Form className={classes['form-padding']} onSubmit={loginSubmitHandler}>
                    <h5 className={classes['form-header']}>LOGIN</h5>
                    {status === 'pending' && <div className="centered"> <LoadingSpinner></LoadingSpinner> </div>}
                    {status === 'completed' && error !== '' && <p className="error-text">INVALID CREDENTIALS</p>}
                    
                    {status !== 'pending' && <React.Fragment>
                        <Input inputParams={emailInputParams}
                            validate={validatePersonalDetails}></Input>
                        <Input inputParams={userNameInputParams}
                            validate={validatePersonalDetails}></Input>
                        <Input inputParams={passwordInputParams}
                            validate={validatePersonalDetails}></Input>
                        <div className="form-actions">
                            <button className="button-reset" onClick={resetForm}>Reset</button>
                            <button disabled={
                                !formIsValid
                            }>Login</button>
                        </div>
                    </React.Fragment>}        
                </Form>
            </Card>
        </React.Fragment>
       
    );

}

export default LoginForm;
