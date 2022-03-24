import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {  ModalActions } from "../../../store/Duct/modal-slice";
import Modal from "../../UI/Modal";
import classes from './DisplayLoanDetails.module.css';

const DisplayLoanDetails = (props)=>{

    const loanDetails = props.loanDetails;

    const dispatch = useDispatch();

    const onCloseHandler = (event) =>{
        event.preventDefault();
        dispatch(ModalActions.hideLoanDetails());
    }

    console.log("DisplayLoanDetails",loanDetails);

    const personalLoanDetailsContent = <div>
        <Row><Col><b>Company Name</b></Col><Col>{loanDetails.additionalDetails.personalOrHomeLoan.companyName}</Col></Row>
        <Row ><Col><b>Designation</b></Col><Col>{loanDetails.additionalDetails.personalOrHomeLoan.designation}</Col></Row>
        <Row ><Col><b>Current Years of Experience</b></Col><Col>{loanDetails.additionalDetails.personalOrHomeLoan.yearsofExperienceCurrent} years</Col></Row>
        <Row><Col><b>Total Experience</b></Col><Col>{loanDetails.additionalDetails.personalOrHomeLoan.totalExperience} years</Col></Row>
        <Row ><Col><b>Annual Income</b></Col><Col>$ {loanDetails.additionalDetails.personalOrHomeLoan.annualIncome}</Col></Row>
    </div>;

    const studentLoanDetailsContent = <div>
        <Row><Col><b>Father Name</b></Col><Col>{loanDetails.additionalDetails.studentLoan.fatherName}</Col></Row>
        <Row ><Col><b>Occupation</b></Col><Col>{loanDetails.additionalDetails.studentLoan.occupation}</Col></Row>
        <Row><Col><b>Annual Income</b></Col><Col>$ {loanDetails.additionalDetails.studentLoan.annualIncome}</Col></Row>
        <Row ><Col><b>Course Name</b></Col><Col>{loanDetails.additionalDetails.studentLoan.course}</Col></Row>
        <Row ><Col><b>Course Fee</b></Col><Col>$ {loanDetails.additionalDetails.studentLoan.courseFee}</Col></Row>
    </div>;


    
    return(
        <Modal onClose={onCloseHandler}>

            <h5 className={classes['form-headers']}>Loan Details</h5>
            <div className={classes['review-item']}>
                <Row ><Col><b>Loan Type</b></Col><Col>{loanDetails.loanInformation.loanType}</Col></Row>
                <Row><Col><b>Loan Rate</b></Col><Col>{loanDetails.loanInformation.rate} %</Col></Row>
                <Row><Col><b>Loan Amount</b></Col><Col>$ {loanDetails.loanInformation.loanAmount}</Col></Row>
                <Row ><Col><b>Loan Duration</b></Col><Col>{loanDetails.loanInformation.duration} years</Col></Row>
            </div>
            <hr></hr>
            <div className={classes['review-item']}>
                {loanDetails.additionalDetails.personalOrHomeLoan.companyName !== '' && personalLoanDetailsContent }
                {loanDetails.additionalDetails.studentLoan.course !== '' && studentLoanDetailsContent }
            </div>
            <h5 className={classes['form-footer']}> Applied Date : {loanDetails.loanInformation.appliedDate}</h5>
        </Modal>
    );

}

export default DisplayLoanDetails;