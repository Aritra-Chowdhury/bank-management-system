import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import UseInput from '../../../hooks/useInput';
import { AuthActions } from '../../../store/Duct/auth-slice';
import { ModalActions } from '../../../store/Duct/modal-slice';

import Input from '../../UI/Input';
import Modal from '../../UI/Modal';
import classes from './DepositeAmount.module.css';

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

const DepositAmount = (props)=>{

    const userDetails = useSelector(state=>state.auth.userDetails);
    
    const dispatch = useDispatch();
    const [formIsValid , setFormIsValid] = useState(false);
    
    const {
        value: enteredAccount,
        hasError: enteredAccountIsInvalid,
        isValid: enteredAccountIsValid,
        inputValueReset: accountReset,
        inputValueChangeHandler: accountChangeHandler,
        inputValueChangeBlur: accountChangeBlurHandler,
        setInputValue: setAccount
    } = UseInput((value) => value!=0);

    const accountInputParams = prepareInputParams('account', 'account', 'number', 'Enter bank account', enteredAccount, 'Enter account', 
        enteredAccountIsInvalid, 'Bank account is required', accountChangeHandler, accountChangeBlurHandler);
    accountInputParams.disabled=true;

    const {
        value: currentAmount,
        hasError: currentAmountIsInvalid,
        isValid: currentAmountIsValid,
        inputValueReset: currentAmountReset,
        inputValueChangeHandler: currentAmountChangeHandler,
        inputValueChangeBlur: currentAmountChangeBlurHandler,
        setInputValue: setCurrentBalance
    } = UseInput((value) => value!=0);

    const currentAmountInputParams = prepareInputParams('currentamount', 'currentamount', 'number', 'Current Balance', currentAmount, 
        'Current Balance', currentAmountIsInvalid, 'Amount deposit is required', currentAmountChangeHandler, currentAmountChangeBlurHandler);

    currentAmountInputParams.disabled=true;

    const {
        value: enteredAmount,
        hasError: enteredAmountIsInvalid,
        isValid: enteredAmountIsValid,
        inputValueReset: amountReset,
        inputValueChangeHandler: amountChangeHandler,
        inputValueChangeBlur: amountChangeBlurHandler,
        setInputValue: setAmount
    } = UseInput((value) => value>0);

    const amountInputParams = prepareInputParams('amount', 'amount', 'number', 'Enter amount deposit', enteredAmount, 
        'Enter Amount Deposit', enteredAmountIsInvalid, 'Amount deposit is required', amountChangeHandler, amountChangeBlurHandler);

    const validateAccountDetails = () => {
        const isValid = enteredAmountIsValid;
        setFormIsValid(isValid);
    }

    const resetForm = () => {
        amountReset();
        setFormIsValid(false);
    }

    const accountDepositSubmitHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }
        const balance = (userDetails.accountInformation.balance?Number(userDetails.accountInformation.balance):0)  + Number(enteredAmount);
        dispatch(AuthActions.updateBalance(balance));

        dispatch(ModalActions.toggleDeposit());
        // remove later
        resetForm();
        
    }

    useEffect(()=>{
        setAccount(userDetails.accountInformation.accountNumber);
        setCurrentBalance(userDetails.accountInformation.balance);
    },[]);

    const depositHandler =(event)=>{
        event.preventDefault();
        dispatch(ModalActions.toggleDeposit());
    }

    return(
        <Modal onClose={depositHandler}>
            <h5 className={classes['form-headers']}>Account Deposit</h5>
            <Form className={classes['form-padding']} onSubmit={accountDepositSubmitHandler}>
                <Input inputParams={accountInputParams}
                    validate={validateAccountDetails}></Input>
                <Input inputParams={currentAmountInputParams}
                    validate={validateAccountDetails}></Input>
                <Input inputParams={amountInputParams}
                    validate={validateAccountDetails}></Input>
                <div className={classes["deposit-form-action"]}>
                    <button className="button-reset" onClick={resetForm}>Reset</button>
                    <button disabled={
                        !formIsValid
                    }>Submit</button>
                 </div>
            </Form>
            <h5 className={classes['form-footer']}><b>*Note:</b> Deposited amount to credited to your main account</h5>
        </Modal>
    );
    
}

export default DepositAmount;