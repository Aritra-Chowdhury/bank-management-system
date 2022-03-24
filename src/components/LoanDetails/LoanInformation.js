import {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UseInput from "../../hooks/useInput";
import Input from '../UI/Input';
import Select from '../UI/Select';

const loanTypeOptions =[
    {'name' : 'Personal ', 'value' : 'Personal'},
    {'name' : 'Housing', 'value' : 'Housing'},
    {'name' : 'Educational', 'value' : 'Educational'},
];

const duraionOptions = [
    {'name' : 5, 'value' : 5},
    {'name' : 10, 'value' : 10},
    {'name' : 15, 'value' : 15},
    {'name' : 20, 'value' : 20},
];

const rateSheet = {
    'Personal' : 9.8,
    'Housing' : 6.7,
    'Educational' : 6.9
}

const seniorCitizenRateSheet = {
    'Personal' : 9.4,
    'Housing' : 6.4,
    'Educational' : 6.9
}

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
        required: true,
        disabled: false
    }
}

const prepareSelectParams = (name, id, type, label, value, options, error, invalidMessage, inputChangeHandler, inputBlurHandler) => {

    return {
        name: name,
        id: id,
        type: type,
        label: label,
        value: value,
        options: options,
        error: error,
        invalidMessage: invalidMessage,
        inputChangeHandler: inputChangeHandler,
        inputBlurHandler: inputBlurHandler,
        required: true,
        disabled: false
    }
}

const calculate_age = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);  
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    return age_now;
}

const isNotEmpty = (value) => value && value.trim() !== '';

const LoanInformation = (props)=>{

    const [formIsValid, setFormIsValid] = useState(false);

    const dateOfBirth = useSelector(state=>state.auth.userDetails.personalDetails.dateOfBirth);
    const age = calculate_age(dateOfBirth);

    const {
        value: enteredLoanType,
        hasError: enteredLoanTypeIsInvalid,
        isValid: enteredLoanTypeIsValid,
        inputValueReset: loanTypeReset,
        inputValueChangeHandler: loanTypeChangeHandler,
        inputValueChangeBlur:loanTypeChangeBlurHandler,
        setInputValue: setLoanType
    } = UseInput((value) => isNotEmpty(value));

    const loanTypeSelectParams = prepareSelectParams('loanType', 'loanType', 'text', 'Enter loan type', enteredLoanType, 
    loanTypeOptions , enteredLoanTypeIsInvalid, 'LoanType is required', loanTypeChangeHandler, loanTypeChangeBlurHandler);

    const {
        value: enteredAmount,
        hasError: enteredAmountIsInvalid,
        isValid: enteredAmountIsValid,
        inputValueReset: amountReset,
        inputValueChangeHandler: amountChangeHandler,
        inputValueChangeBlur: amountChangeBlurHandler,
        setInputValue: setAmount
    } = UseInput((value) => isNotEmpty(value));

    const amountInputParams = prepareInputParams('loanamount', 'loanamount', 'number', 'Enter loan amount', enteredAmount, 'Enter Loan Amount', enteredAmountIsInvalid, 'Loan Amount is required', amountChangeHandler, amountChangeBlurHandler);

    const {
        value: enteredDate,
        hasError: enteredDateIsInvalid,
        isValid: enteredDateIsValid,
        inputValueReset: dateReset,
        inputValueChangeHandler: dateChangeHandler,
        inputValueChangeBlur: dateChangeBlurHandler,
        setInputValue: setDate
    } = UseInput((value) => isNotEmpty(value));

    const dateInputParams = prepareInputParams('date', 'date', 'date', 'Applied Date', enteredDate, 'Applied Date', 
    enteredDateIsInvalid, 'Applied Date is required', dateChangeHandler, dateChangeBlurHandler);

    dateInputParams.disabled = true;
    
    const {
        value: enteredRate,
        hasError: enteredRateIsInvalid,
        isValid: enteredRateIsValid,
        inputValueReset: rateReset,
        inputValueChangeHandler: rateChangeHandler,
        inputValueChangeBlur: rateChangeBlurHandler,
        setInputValue: setRate
    } = UseInput((value) => value!=0);

    let rateInputParams = prepareInputParams('rate', 'rate', 'number', 'Enter rate', enteredRate, 
    'Enter rate', enteredRateIsInvalid, 'Rate is required', rateChangeHandler, rateChangeBlurHandler);
    rateInputParams.disabled = true;

    const {
        value: enteredDuration,
        hasError: enteredDurationIsInvalid,
        isValid: enteredDurationIsValid,
        inputValueReset: durationReset,
        inputValueChangeHandler: durationChangeHandler,
        inputValueChangeBlur: durationChangeBlurHandler,
        setInputValue: setenteredDuration
    } = UseInput((value) => isNotEmpty(value));

    const durationSelectParams = prepareSelectParams('duration', 'duration', 'number', 'Enter duration', enteredDuration, 
    duraionOptions, enteredDurationIsInvalid, 'Duration is required', durationChangeHandler, durationChangeBlurHandler);

    const validateLoanDetails = () => {
        const isValid = enteredLoanTypeIsValid && enteredDateIsValid && enteredAmountIsValid 
        && enteredRateIsValid && enteredDurationIsValid;
        setFormIsValid(isValid);
    }

    useEffect(()=>{
        if(enteredLoanType!==''){
            if(age<60){
                console.log(rateSheet[enteredLoanType]);
                setRate(rateSheet[enteredLoanType]);
            }else{
                setRate(seniorCitizenRateSheet[enteredLoanType]);
            }
        }else{
            setRate(0);
        }
       
    },[enteredLoanType]);

    const resetForm = () => {
       
        loanTypeReset();
        dateReset();
        amountReset();
        rateReset();
        durationReset();

        setFormIsValid(false);
    }

    const loanInfomartionSubmitHandler = (event) => {
        event.preventDefault();


        if (!formIsValid) {
            return;
        }
        props.onSubmitDetails({
            loanType: enteredLoanType,
            loanAmount: enteredAmount,
            appliedDate: enteredDate,
            rate: enteredRate,
            duration: enteredDuration
        });

        // remove later
        resetForm();
    }

    useEffect(()=>{
        setLoanType(props.loanType);
    },[props.loanType]);

    useEffect(() => {
        setDate(new Date(Date.now()).toISOString().slice(0, 10));
    }, []);

    return (
        <form className={props.className} onSubmit={loanInfomartionSubmitHandler}>
            <Select inputParams={loanTypeSelectParams}
                validate={validateLoanDetails}></Select>
            <Input inputParams={amountInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={dateInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={rateInputParams}
                validate={validateLoanDetails}></Input>
            <Select inputParams={durationSelectParams}
                validate={validateLoanDetails}></Select>
            <div className="form-actions">
                <button  className="button-reset" onClick={resetForm}>Reset</button>
                <button disabled={
                    !formIsValid
                }>Next</button>
            </div>
        </form>
    );
}

export default LoanInformation ;