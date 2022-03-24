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

const HomePersonalLoanDetails = (props)=>{

    const [formIsValid, setFormIsValid] = useState(false);

    const {
        value: enteredCompanyName,
        hasError: enteredCompanyNameIsInvalid,
        isValid: enteredCompanyNameIsValid,
        inputValueReset: companyNameReset,
        inputValueChangeHandler: companyNameChangeHandler,
        inputValueChangeBlur: companyNameChangeBlurHandler,
        setInputValue: setCompanyName
    } = UseInput((value) => isNotEmpty(value));

    const companyNameInputParams = prepareInputParams('companyName', 'companyName', 'text', 'Enter Company Name', enteredCompanyName, 
    'Enter Company Name', enteredCompanyNameIsInvalid, 'Company Name is required', companyNameChangeHandler, companyNameChangeBlurHandler);

    const {
        value: enteredDesignation,
        hasError: enteredDesignationIsInvalid,
        isValid: enteredDesignationIsValid,
        inputValueReset: designationReset,
        inputValueChangeHandler: designationChangeHandler,
        inputValueChangeBlur: designationChangeBlurHandler,
        setInputValue: setDesignation
    } = UseInput((value) => isNotEmpty(value));

    const designationInputParams = prepareInputParams('designation', 'designation', 'text', 'Enter Designation', enteredDesignation, 
    'Enter Designation', enteredDesignationIsInvalid, 'Designation is required', designationChangeHandler, designationChangeBlurHandler);

    const {
        value: enteredExperienceCurrent,
        hasError: enteredExperienceCurrentIsInvalid,
        isValid: enteredExperienceCurrentIsValid,
        inputValueReset: currentExperienceReset,
        inputValueChangeHandler: currentExperienceChangeHandler,
        inputValueChangeBlur: currentExperienceChangeBlurHandler,
        setInputValue: setExperienceCurrent
    } = UseInput((value) => isNotEmpty(value));

    const currentExperienceInputParams = prepareInputParams('currentExperience', 'currentExperience', 'number', 'Enter Current Experience', enteredExperienceCurrent, 
    'Enter Current Experience', enteredExperienceCurrentIsInvalid, 'Current Experience is required', currentExperienceChangeHandler, currentExperienceChangeBlurHandler);

    const {
        value: enteredIncome,
        hasError: enteredIncomeIsInvalid,
        isValid: enteredIncomeIsValid,
        inputValueReset: incomeReset,
        inputValueChangeHandler: incomeChangeHandler,
        inputValueChangeBlur: incomeChangeBlurHandler,
        setInputValue: setIncome
    } = UseInput((value) => isNotEmpty(value));

    const incomeInputParams = prepareInputParams('income', 'income', 'number', 'Enter Annual Income', enteredIncome, 
    'Enter Annual Income', enteredIncomeIsInvalid, 'Annual Income is required', incomeChangeHandler, incomeChangeBlurHandler);

    const {
        value: enteredTotalExperience,
        hasError: enteredTotalExperienceIsInvalid,
        isValid: enteredTotalExperienceIsValid,
        inputValueReset: totalExperienceReset,
        inputValueChangeHandler:totalExperienceChangeHandler,
        inputValueChangeBlur:totalExperienceChangeBlurHandler,
        setInputValue: setTotalExperience
    } = UseInput((value) => isNotEmpty(value));

    const totalExperienceInputParams = prepareInputParams('totalExperience', 'totalExperience', 'number', 'Enter Total Experience', enteredTotalExperience, 
    'Enter Total Experience', enteredTotalExperienceIsInvalid, 'Total Experience is required', totalExperienceChangeHandler, totalExperienceChangeBlurHandler);

    const validateLoanDetails = () => {
        const isValid = enteredCompanyNameIsValid && enteredDesignationIsValid && enteredExperienceCurrentIsValid 
        && enteredIncomeIsValid && enteredTotalExperienceIsValid;
        setFormIsValid(isValid);
    }

    const resetForm = () => {
       
        companyNameReset();
        designationReset();
        currentExperienceReset();
        incomeReset();
        totalExperienceReset();

        setFormIsValid(false);
    }

    const homePersonalLoanSubmitHandler = (event) => {
        event.preventDefault();


        if (!formIsValid) {
            return;
        }
        props.onSubmitDetails({
            companyName: enteredCompanyName,
            designation: enteredDesignation,
            yearsofExperienceCurrent: enteredExperienceCurrent,
            totalExperience: enteredTotalExperience,
            annualIncome: enteredIncome
        });

        // remove later
        resetForm();
    }
    

    return (
        <form className={props.className} onSubmit={homePersonalLoanSubmitHandler}>
            <Input inputParams={companyNameInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={designationInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={currentExperienceInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={incomeInputParams}
                validate={validateLoanDetails}></Input>
            <Input inputParams={totalExperienceInputParams}
                validate={validateLoanDetails}></Input>
            <div className="form-actions">
                <button  className="button-reset" onClick={resetForm}>Reset</button>
                <button disabled={
                    !formIsValid
                }>Next</button>
            </div>
        </form>
    );
}

export default HomePersonalLoanDetails;