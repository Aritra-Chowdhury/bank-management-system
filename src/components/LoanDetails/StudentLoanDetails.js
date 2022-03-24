import { useState } from "react";
import UseInput from "../../hooks/useInput";
import Input from "../UI/Input";

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

const StudentLoanDetails = (props)=>{
    const [formIsValid, setFormIsValid] = useState(false);

    const {
        value: enteredCourse,
        hasError: enteredCourseIsInvalid,
        isValid: enteredCourseIsValid,
        inputValueReset: courseReset,
        inputValueChangeHandler: courseChangeHandler,
        inputValueChangeBlur: courseChangeBlurHandler,
        setInputValue: setCourse
    } = UseInput((value) => isNotEmpty(value));

    const courseInputParams = prepareInputParams('course', 'course', 'text', 'Enter course name', enteredCourse, 
    'Enter course name', enteredCourseIsInvalid, 'Course name is required', courseChangeHandler, courseChangeBlurHandler);

    const {
        value: enteredCourseFee,
        hasError: enteredCourseFeeIsInvalid,
        isValid: enteredCourseFeeIsValid,
        inputValueReset: courseFeeReset,
        inputValueChangeHandler: courseFeeChangeHandler,
        inputValueChangeBlur: courseFeeChangeBlurHandler,
        setInputValue: setCourseFee
    } = UseInput((value) => isNotEmpty(value));

    const courseFeeInputParams = prepareInputParams('courseFee', 'courseFee', 'number', 'Enter course fee', enteredCourseFee, 
    'Enter course fee', enteredCourseFeeIsInvalid, 'Course fee is required', courseFeeChangeHandler, courseFeeChangeBlurHandler);

    const {
        value: enteredFatherName,
        hasError: enteredFatherNameIsInvalid,
        isValid: enteredFatherNameIsValid,
        inputValueReset: fatherNameReset,
        inputValueChangeHandler: fatherNameChangeHandler,
        inputValueChangeBlur: fatherNameChangeBlurHandler,
        setInputValue: setFatherName
    } = UseInput((value) => isNotEmpty(value));

    const fatherNameInputParams = prepareInputParams('fatherName', 'fatherName', 'text', 'Enter father name', enteredFatherName, 
    'Enter father name', enteredFatherNameIsInvalid, 'Father name is required', fatherNameChangeHandler, fatherNameChangeBlurHandler);


    const {
        value: enteredOccupation,
        hasError: enteredOccupationIsInvalid,
        isValid: enteredOccupationIsValid,
        inputValueReset: occupationReset,
        inputValueChangeHandler: occupationChangeHandler,
        inputValueChangeBlur: occupationChangeBlurHandler,
        setInputValue: setOccupation
    } = UseInput((value) => isNotEmpty(value));

    const occupationInputParams = prepareInputParams('occupation', 'occupation', 'text', "Enter Father's Occupation", enteredOccupation, 
    "Enter Father's Occupation", enteredOccupationIsInvalid, "Father's Occupation is required", occupationChangeHandler, occupationChangeBlurHandler);

    const {
        value: enteredIncome,
        hasError: enteredIncomeIsInvalid,
        isValid: enteredIncomeIsValid,
        inputValueReset: incomeReset,
        inputValueChangeHandler: incomeChangeHandler,
        inputValueChangeBlur: incomeChangeBlurHandler,
        setInputValue: setIncome
    } = UseInput((value) => isNotEmpty(value));

    const incomeInputParams = prepareInputParams('fatherIncome', 'fatherIncome', 'number', "Enter Father's Annual Income", enteredIncome, 
    "Enter Father's Annual Income", enteredIncomeIsInvalid, "Father's Annual Income is required", incomeChangeHandler, incomeChangeBlurHandler);

    const validateLoanDetails = () => {
        const isValid = enteredCourseIsValid && enteredCourseFeeIsValid && enteredFatherNameIsValid 
        && enteredIncomeIsValid && enteredOccupationIsValid;
        setFormIsValid(isValid);
    }

    const resetForm = () => {
       
        courseReset();
        courseFeeReset();
        fatherNameReset();
        occupationReset();
        incomeReset();

        setFormIsValid(false);
    }

    const studentLoanSubmitHandler = (event) => {
        event.preventDefault();


        if (!formIsValid) {
            return;
        }
        props.onSubmitDetails({
            fatherName: enteredFatherName,
            occupation: enteredOccupation,
            annualIncome: enteredIncome,
            course: enteredCourse,
            courseFee: enteredCourseFee
        });

        // remove later
        resetForm();
    }

    return (
        <form className={props.className} onSubmit={studentLoanSubmitHandler}>
            <Input inputParams={courseInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={courseFeeInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={fatherNameInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={occupationInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={incomeInputParams}
                validate={validateLoanDetails}></Input>
            <div className="form-actions">
                <button className="button-reset" onClick={resetForm}>Reset</button>
                <button disabled={
                    !formIsValid
                }>Next</button>
            </div>
        </form>
    );
}

export default StudentLoanDetails;