import {useState} from "react";
import UseInput from "../../../hooks/useInput";
import Input from "../../UI/Input";
import Select from "../../UI/Select";

const identityProofOptions = [
    {'name' : 'Aadhar', 'value' : 'Aadhar card'},
    {'name' : 'Pan', 'value' : 'Pan card'},
    {'name' : 'Driving', 'value' : 'Driving license'},
];

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
        required: true
    }
}

const isNotEmpty = (value) => value.trim() !== '';

const AccountDetails = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);

    const {
        value: enteredAccount,
        hasError: enteredAccountIsInvalid,
        isValid: enteredAccountIsValid,
        inputValueReset: accountReset,
        inputValueChangeHandler: accountChangeHandler,
        inputValueChangeBlur: accountChangeBlurHandler,
        setInputValue: setAccount
    } = UseInput((value) => isNotEmpty(value));

    const accountInputParams = prepareInputParams('account', 'account', 'number', 'Enter bank account', enteredAccount, 'Enter account', enteredAccountIsInvalid, 'Bank account is required', accountChangeHandler, accountChangeBlurHandler);

    const {
        value: enteredBranch,
        hasError: enteredBranchIsInvalid,
        isValid: enteredBranchIsValid,
        inputValueReset: branchReset,
        inputValueChangeHandler: branchChangeHandler,
        inputValueChangeBlur: branchChangeBlurHandler,
        setInputValue: setBranch
    } = UseInput((value) => isNotEmpty(value));

    const branchInputParams = prepareInputParams('branch', 'branch', 'text', 'Enter bank branch name', enteredBranch, 'Enter branch name', enteredBranchIsInvalid, 'Bank branch name is required', branchChangeHandler, branchChangeBlurHandler);

    const {
        value: enteredAmount,
        hasError: enteredAmountIsInvalid,
        isValid: enteredAmountIsValid,
        inputValueReset: amountReset,
        inputValueChangeHandler: amountChangeHandler,
        inputValueChangeBlur: amountChangeBlurHandler,
        setInputValue: setAmount
    } = UseInput((value) => isNotEmpty(value));

    const amountInputParams = prepareInputParams('amount', 'amount', 'number', 'Enter amount deposit', enteredAmount, 'Enter Amount Deposit', enteredAmountIsInvalid, 'Amount deposit is required', amountChangeHandler, amountChangeBlurHandler);

    const {
        value: enteredIdProofType,
        hasError: enteredIdProofTypeIsInvalid,
        isValid: enteredIdProofTypeIsValid,
        inputValueReset: idProofTypeReset,
        inputValueChangeHandler: idProofTypeChangeHandler,
        inputValueChangeBlur: idProofTypeChangeBlurHandler,
        setInputValue: setIdProofType
    } = UseInput((value) => isNotEmpty(value));

    const idProofTypeSelectParams = prepareSelectParams('idProofType', 'idProofType', 'text', 'Enter Identity Proof Type', 
    enteredIdProofType, identityProofOptions, enteredIdProofTypeIsInvalid, 'Identity Proof Type is required', idProofTypeChangeHandler, idProofTypeChangeBlurHandler);

    const {
        value: enteredIdProof,
        hasError: enteredIdProofIsInvalid,
        isValid: enteredIdProofIsValid,
        inputValueReset: idProofReset,
        inputValueChangeHandler: idProofChangeHandler,
        inputValueChangeBlur: idProofChangeBlurHandler,
        setInputValue: setIdProof
    } = UseInput((value) => isNotEmpty(value));

    const idProofInputParams = prepareSelectParams('idProof', 'idProof', 'text', 'Enter Intdentity Proof Number', enteredIdProof, 'Enter Intentity Proof ', enteredIdProofIsInvalid, 'Identity Proof Number is required', idProofChangeHandler, idProofChangeBlurHandler);


    const validateAccountDetails = () => {
        const isValid = enteredAccountIsValid && enteredBranchIsValid && enteredAmountIsValid && enteredIdProofTypeIsValid && enteredIdProofIsValid;
        setFormIsValid(isValid);
    }

    const resetForm = () => {
        accountReset();
        branchReset();
        amountReset();
        idProofTypeReset();
        idProofReset();

        setFormIsValid(false);
    }

    const accountDetailsSubmitHandler = (event) => {
        event.preventDefault();


        if (!formIsValid) {
            return;
        }
        props.onSubmitDetails({
            accountNumber: enteredAccount,
            branchName: enteredBranch,
            balance: enteredAmount,
            identityProofType: enteredIdProofType,
            indentityProofNumber: enteredIdProof
        });

        // remove later
        resetForm();
    }

    return (
        <form className={props.className} onSubmit={accountDetailsSubmitHandler}>
            <Input inputParams={accountInputParams}
                validate={validateAccountDetails}></Input>
            <Input inputParams={branchInputParams}
                validate={validateAccountDetails}></Input>
            <Input inputParams={amountInputParams}
                validate={validateAccountDetails}></Input>
            <Select inputParams={idProofTypeSelectParams}
                validate={validateAccountDetails}></Select>
            <Input inputParams={idProofInputParams}
                validate={validateAccountDetails}></Input>
            <div className="form-actions">
                <button className="button-reset" onClick={resetForm}>Reset</button>
                <button disabled={
                    !formIsValid
                }>Submit</button>
            </div>
        </form>
    );
}

export default AccountDetails;
