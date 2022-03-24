
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './Offer.module.css';

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

const Offer =(props)=>{

    const dateOfBirth = useSelector(state=>state.auth.userDetails.personalDetails.dateOfBirth);
    const age = calculate_age(dateOfBirth);
    const navigate = useNavigate();

    const applyPersonalLoanHandler =()=>{
        navigate('/home/applyloan?loanType=Personal');
    }

    const applyHousingLoanHandler =()=>{
        navigate('/home/applyloan?loanType=Housing');
    }

    const applyStudentLoanHandler =()=>{
        navigate('/home/applyloan?loanType=Educational');
    }

    return (
        <ul className={classes['offers']}>
            <h5 className={classes['form-header']}>Today's Offer</h5>
            <li className={classes['card-body']}>
                <div className={classes['card-header']}></div>
                <div className={classes['card-content']}>Home Loan at <span className={classes['content-highlight']}>6.7%</span>*.</div>
                <div className={classes['card-action']}>
                    <button onClick={applyHousingLoanHandler}>Apply loan</button>
                </div>
            </li>
            <li className={classes['card-body']}>
                <div className={classes['card-header']}></div>
                <div className={classes['card-content']}>Personal Loan at <span className={classes['content-highlight']}>9.8%</span>*.</div>
                <div className={classes['card-action']}>
                    <button onClick={applyPersonalLoanHandler}>Apply loan</button>
                </div>
            </li>
            <li className={classes['card-body']}>
                <div className={classes['card-header']}></div>
                <div className={classes['card-content']}> Student Loan at <span className={classes['content-highlight']}>6.9%</span>*.</div>
                <div className={classes['card-action']}>
                    <button onClick={applyStudentLoanHandler}>Apply loan</button>
                </div>
            </li>
            {
                age>=60 &&  
                <li className={classes['card-body']}>
                    <div className={classes['card-header']}></div>
                    <div className={classes['card-content']}>Senior citizen Home Loan at <span className={classes['content-highlight']}>6.4%</span>*.</div>
                    <div className={classes['card-action']}>
                        <button onClick={applyHousingLoanHandler}>Apply loan</button>
                    </div>
                </li>
            }
           
            {
                age>=60 &&
                <li className={classes['card-body']}>
                    <div className={classes['card-header']}></div>
                    <div className={classes['card-content']}>Senior citizen Personal Loan at <span className={classes['content-highlight']}>9.4%</span>*.</div>
                    <div className={classes['card-action']}>
                        <button onClick={applyPersonalLoanHandler}>Apply loan</button>
                    </div>
                </li>
            }
            
        </ul>
    );
}

export default Offer;