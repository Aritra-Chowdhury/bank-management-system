import {useEffect, useState} from "react";
import UseInput from "../../../hooks/useInput";
import Input from "../../UI/Input";

import classes from './PersonalDetails.module.css';

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
const isMinChars = (value, minSize) => value.trim().length === minSize;
const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const isAphabetsAndSpace = (value) => /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(value);
const isPasswordValid = (value) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value.trim());

const PersonalDetails = (props) => {

    const [formIsValid, setFormIsValid] = useState(false);

    const {
        value: enteredName,
        hasError: enteredNameIsInvalid,
        isValid: enteredNameIsValid,
        inputValueReset: nameReset,
        inputValueChangeHandler: nameChangeHandler,
        inputValueChangeBlur: nameChangeBlurHandler,
        setInputValue: setName
    } = UseInput((value) => isNotEmpty(value) && isAphabetsAndSpace(value));

    const nameInputParams = prepareInputParams('name', 'name', 'text', 'Enter your name', enteredName, 'Enter your name', enteredNameIsInvalid, 'Name is required and should contain only Alphabets and Space', nameChangeHandler, nameChangeBlurHandler);
    const {
        value: enteredUserName,
        hasError: enteredUserNameIsInvalid,
        isValid: enteredUserNameIsValid,
        inputValueReset: userNameReset,
        inputValueChangeHandler: userNameChangeHandler,
        inputValueChangeBlur: userNameChangeBlurHandler,
        setInputValue: setUserName
    } = UseInput((value) => isNotEmpty(value));

    const userNameInputParams = prepareInputParams('username', 'username', 'text', 'Enter user name', enteredUserName, 'User name', enteredUserNameIsInvalid, 'User Name is required', userNameChangeHandler, userNameChangeBlurHandler);
    const {
        value: enteredPassword,
        hasError: enteredPasswordIsInvalid,
        isValid: enteredPasswordIsValid,
        inputValueReset: passwordReset,
        inputValueChangeHandler: passwordChangeHandler,
        inputValueChangeBlur: passwordChangeBlurHandler,
        setInputValue: setPassword
    } = UseInput((value) => isNotEmpty(value) && isPasswordValid(value));

    const passwordInputParams = prepareInputParams('password', 'password', 'password', 'Enter password', enteredPassword, 'Enter password', enteredPasswordIsInvalid, 'Password is required and should be follow pattern', passwordChangeHandler, passwordChangeBlurHandler);

    const {
        value: enteredEmail,
        hasError: enteredEmailIsInvalid,
        isValid: enteredEmailIsValid,
        inputValueReset: emailReset,
        inputValueChangeHandler: emailChangeHandler,
        inputValueChangeBlur: emailBlurChangeHandler,
        setInputValue: setEmail
    } = UseInput((value) => isNotEmpty(value) && isEmailValid(value));

    const emailInputParams = prepareInputParams('email', 'email', 'email', 'Enter Your Email', enteredEmail, 'something@mail.com', enteredEmailIsInvalid, 'Email is required', emailChangeHandler, emailBlurChangeHandler);


    const {
        value: enteredNumber,
        hasError: enteredNumberIsInvalid,
        isValid: enteredNumberIsValid,
        inputValueReset: numberReset,
        inputValueChangeHandler: numberChangeHandler,
        inputValueChangeBlur: numberChangeBlurHandler,
        setInputValue: setNumber
    } = UseInput((value) => isNotEmpty(value) && isMinChars(value, 10));

    const contactNumberInputParams = prepareInputParams('contactNumber', 'contactNumber', 'number', 'Enter Your contact number', enteredNumber, '1234567890', enteredNumberIsInvalid, 'Contact number is required', numberChangeHandler, numberChangeBlurHandler);

    const {
        value: enteredDOB,
        hasError: enteredDobIsInvalid,
        isValid: enteredDobIsValid,
        inputValueReset: dobReset,
        inputValueChangeHandler: dobChangeHandler,
        inputValueChangeBlur: dobChangeBlurHandler,
        setInputValue: setDob
    } = UseInput((value) => isNotEmpty(value));

    const dobInputParams = prepareInputParams('dob', 'dob', 'date', 'Enter Your Date of birth', enteredDOB, '13-01-1996', enteredDobIsInvalid, 'Date of birth is required', dobChangeHandler, dobChangeBlurHandler);


    const validatePersonalDetails = () => {
        const isValid = enteredNameIsValid && enteredUserNameIsValid && enteredPasswordIsValid && enteredEmailIsValid && enteredNumberIsValid && enteredDobIsValid;
        setFormIsValid(isValid);
    }

    const resetForm = () => {
        nameReset();
        userNameReset();
        passwordReset();
        emailReset();
        numberReset();
        dobReset();

        setFormIsValid(false);
    }

    useEffect(() => {
        setDob(new Date(Date.now()).toISOString().slice(0, 10));
    }, []);

    const personalDetailsSubmitHandler = (event) => {
        event.preventDefault();


        if (!formIsValid) {
            return;
        }
        props.onSubmitDetails({
            name: enteredName,
            username: enteredUserName,
            password: enteredPassword,
            email: enteredEmail,
            contactNumber: enteredNumber,
            dateOfBirth: enteredDOB
        });

        // remove later
        resetForm();
    }

    return (
        <form className={props.className} onSubmit={personalDetailsSubmitHandler}>
            <Input inputParams={nameInputParams}
                validate={validatePersonalDetails}></Input>
            <Input inputParams={userNameInputParams}
                validate={validatePersonalDetails}></Input>
            <Input inputParams={passwordInputParams}
                validate={validatePersonalDetails}></Input>
            <Input inputParams={emailInputParams}
                validate={validatePersonalDetails}></Input>
            <Input inputParams={contactNumberInputParams}
                validate={validatePersonalDetails}></Input>
            <Input inputParams={dobInputParams}
                validate={validatePersonalDetails}></Input>
            <div className="form-actions">
                <button className="button-reset" onClick={resetForm}>Reset</button>
                <button disabled={
                    !formIsValid
                }>Next</button>
            </div>
        </form>
    );

}

export default PersonalDetails;
