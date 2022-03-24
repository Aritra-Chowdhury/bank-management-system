import React, {useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import UseHttp from '../../../hooks/useHttp';
import { getLoanList } from '../../../lib/api';
import { ModalActions } from '../../../store/Duct/modal-slice';
import Card from '../../UI/Card';
import LoadingSpinner from '../../UI/LoadingSpinner';
import DisplayLoanDetails from './DisplayLoanDetails';
import classes from './LoanList.module.css';

const LoanList = (props)=>{

    const {doPerform, status, data: loanList} = UseHttp(getLoanList, true);
    const showLoanDetails = useSelector(state=>state.modal.showLoanDetails);
    const [loanDetail, setLoanDetail] = useState({});
    const dispatch = useDispatch();

    useEffect(()=>{
        doPerform();
    },[doPerform]);

    console.log(showLoanDetails);

    let loanListContent = <p>No records found</p>;
    const showLoanDetailsHandler = (item)=>{
        setLoanDetail(item);
        dispatch(ModalActions.showLoanDetails());
    }

    if(status === 'completed' && loanList.length > 0){
        loanListContent = loanList.map((item)=>{
            return (
                <Card key={item.accountNumber} className={classes['form-loan-details']} >
                    <div className={classes['form-content']} onClick={()=>{showLoanDetailsHandler(item)}}>
                        <Row>
                            <Col xs={4}><b>Account Number</b></Col>
                            <Col xs={4}><b>Account Type</b></Col>
                            <Col xs={4}><b>Amount</b></Col>
                        </Row>
                        <Row>
                            <Col xs={4}>{item.accountNumber}</Col>
                            <Col xs={4}>{item.loanInformation.loanType}</Col>
                            <Col xs={4}>Rs.{item.loanInformation.loanAmount}</Col>
                        </Row>
                    </div>
                    <div className={classes['form-footer']}>
                        Applied Date : {item.loanInformation.appliedDate}
                    </div>
                    
                </Card>
            );
        });
    }
    

    return (
        <React.Fragment>
            <h5 className={classes['form-header']}>Your Loan details</h5>
            {status === 'pending' && <div className="centered"> <LoadingSpinner></LoadingSpinner> </div>}
            {status === 'completed' && loanListContent}
            {showLoanDetails && <DisplayLoanDetails loanDetails={loanDetail}></DisplayLoanDetails>}
        </React.Fragment>
      
    );
}

export default LoanList;