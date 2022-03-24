import React, {useEffect, useReducer, useState} from "react";
import Card from "../../components/UI/Card";
import HomePersonalLoanDetails from "../../components/LoanDetails/HomePersonalLoanDetails";
import LoanInformation from "../../components/LoanDetails/LoanInformation";
import StudentLoanDetails from "../../components/LoanDetails/StudentLoanDetails";

import classes from './LoanDetailsForm.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fa1,fa2, fa3  } from '@fortawesome/free-solid-svg-icons'
import ReviewAndConfirmation from "../../components/LoanDetails/ReviewAndConfirmation";
import UseHttp from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { saveLoanDetails } from "../../lib/api";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const initialLoanDetailsState = {
    personalDetails: {
        email: '',
    },
    loanInformation: {
        loanType: '',
        loanAmount: '',
        appliedDate: '',
        rate: '',
        duration: ''
    },
    additionalDetails: {
        personalOrHomeLoan: {
            companyName: '',
            designation: '',
            yearsofExperienceCurrent: '',
            totalExperience: '',
            annualIncome: ''
        },
        studentLoan: {
            fatherName: '',
            occupation: '',
            annualIncome: '',
            course: '',
            courseFee: ''
        }
    }
};

const loanFormReducer = (state, action) => {

    if (action.type === 'LoanInformation') {
        return {
            ...state,
            loanInformation: action.value
        };
    }

    if (action.type === 'StudentLoanDetails') {
        return {
            loanInformation: state.loanInformation,
            additionalDetails: {
                studentLoan: action.value,
                personalOrHomeLoan: state.additionalDetails.personalOrHomeLoan
            }
        };
    }

    if (action.type === 'HomeOrPersonalLoanDetails') {
        return {

            loanInformation: state.loanInformation,
            additionalDetails: {
                studentLoan: state.additionalDetails.studentLoan,
                personalOrHomeLoan: action.value

            }
        };
    }


    return initialLoanDetailsState;
}


const LoanDetailsForm = (props) => {

    const [isLoanInfomartionSumitted, setIsLoanInfomartionSumitted] = useState(false);
    const [isStudentLoanDetailsSumitted, setIsStudentLoanDetailsSumitted] = useState(false);
    const [isHomePersonalLoanDetailsSumitted, setIsHomePersonalLoanDetailsSumitted] = useState(false);
    const [isReviewConfirm, setIsReviewConfirm] = useState(false);
    const [loanType, setLoanType] = useState('');

    const userDetails = useSelector(state=>state.auth.userDetails);
    const navigate = useNavigate();

    const location = useLocation();
  

  const queryParams = new URLSearchParams(location.search);

    const [loanFormState, dispatch] = useReducer(loanFormReducer, initialLoanDetailsState);

    const loanInformationSubmitHandler = (loanInformation) => {
        setIsLoanInfomartionSumitted(true);
        dispatch({type: 'LoanInformation', value: loanInformation});
        if (loanInformation && loanInformation.loanType) {
            setLoanType(loanInformation.loanType);
        }

    }

    const studentLoanDetailsSubmitHandler = (studentLoan) => {
        setIsStudentLoanDetailsSumitted(true);
        dispatch({type: 'StudentLoanDetails', value: studentLoan})
    }

    const homePersonalLoanDetailsSubmitHandler = (personalOrHomeLoan) => {
        setIsHomePersonalLoanDetailsSumitted(true);
        dispatch({type: 'HomeOrPersonalLoanDetails', value: personalOrHomeLoan})
    }

    const {doPerform : saveLoan , status , error} = UseHttp(saveLoanDetails);

    useEffect(()=>{
        if(status === 'completed' && !error){
            navigate("/home");
        }
    },[status, error, navigate])
   

    const reviewAndConfirmSubmitHandler = () => {
        setIsReviewConfirm(true);
    }

    useEffect(()=>{
        if(isReviewConfirm){
            const loggedUserEmail = userDetails.personalDetails.email;
            saveLoan({
                ...loanFormState,
                personalDetails : {
                    email: loggedUserEmail
                }
            });
        }
    },[isReviewConfirm, saveLoan]);

    const loanInformationClasses = `${classes.trackerItem}  ${classes.active}`;
    const additionalInformationClasses = `${classes.trackerItem} ${ isLoanInfomartionSumitted? classes.active : ''}`;
    const reviewAndConfirmClasses = `${classes.trackerItem} ${ isStudentLoanDetailsSumitted || isHomePersonalLoanDetailsSumitted? classes.active : ''}`;
    
    return (
        <div className={classes['form-width']}>
            <ul className={classes['tracker']}>
                <li className={loanInformationClasses} >
                    <FontAwesomeIcon icon={fa1} />&nbsp;
                    Loan Information
                </li>
                <hr className={classes['tracker-trace']}></hr>
                <li className={additionalInformationClasses}>
                    <FontAwesomeIcon icon={fa2} />&nbsp;
                    Additional Information
                </li>
                <hr className={classes['tracker-trace']}></hr>
                <li className={reviewAndConfirmClasses}>
                    <FontAwesomeIcon icon={fa3} />&nbsp;
                    Review and confirm
                </li>
            </ul>
            {status === 'pending' && <div className="centered"> <LoadingSpinner></LoadingSpinner> </div>}
            {status !== 'pending' && <Card>
                {status === 'completed' && error && <p className={classes['error-message']}>{error}</p>}
                {!isLoanInfomartionSumitted && <h5 className={classes['form-headers']}>Loan Information</h5>}
                {!isLoanInfomartionSumitted  && <LoanInformation className={classes['form-padding']} loanType={queryParams.get('loanType')?queryParams.get('loanType'):''} onSubmitDetails={loanInformationSubmitHandler}></LoanInformation>}
                {isLoanInfomartionSumitted && !(isStudentLoanDetailsSumitted || isHomePersonalLoanDetailsSumitted) && <h5 className={classes['form-headers']}>Additional Details</h5>}
                {loanType === 'Educational' && !isStudentLoanDetailsSumitted && <StudentLoanDetails className={classes['form-padding']}
                    onSubmitDetails={studentLoanDetailsSubmitHandler}></StudentLoanDetails>
                }
                {
                (loanType === 'Personal' || loanType === 'Housing') && !isHomePersonalLoanDetailsSumitted && <HomePersonalLoanDetails className={classes['form-padding']}
                    onSubmitDetails={homePersonalLoanDetailsSubmitHandler}></HomePersonalLoanDetails>} 
                {isLoanInfomartionSumitted && (isStudentLoanDetailsSumitted || isHomePersonalLoanDetailsSumitted) && <h5 className={classes['form-headers']}>Review And Confirm</h5>}
                {isLoanInfomartionSumitted && (isStudentLoanDetailsSumitted || isHomePersonalLoanDetailsSumitted) && <ReviewAndConfirmation loanDetails={loanFormState} onConfirm={reviewAndConfirmSubmitHandler}></ReviewAndConfirmation>}
            </Card>}
        </div>
    );


}

export default LoanDetailsForm;
