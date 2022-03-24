import { render, screen, waitFor } from "@testing-library/react";
import ReviewAndConfirmation from "./ReviewAndConfirmation";

describe('<ReviewAndConfirmation',()=>{

    const mockLoanDetails = {
        personalDetails: {
            email: 'test@mail.com',
        },
        loanInformation: {
            loanType: 'Personal',
            loanAmount: '1223',
            appliedDate: '01-01-1996',
            rate: '6.7',
            duration: '5'
        },
        additionalDetails: {
            personalOrHomeLoan: {
                companyName: 'test',
                designation: 'test',
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

    test('renders ReviewAndConfirmation',()=>{

        render(
            <ReviewAndConfirmation loanDetails={mockLoanDetails}></ReviewAndConfirmation>
        );

        const submitButton = screen.getByRole('button',{
            name: /Submit/i
        });
        expect(submitButton).not.toBeDisabled();

    });

    test('renders ReviewAndConfirmation and reset values',async ()=>{

        render(
            <ReviewAndConfirmation loanDetails={mockLoanDetails}></ReviewAndConfirmation>
        );

        const inputExperience = screen.getByText(/Current Years of Experience/i);

        await waitFor(() => {
            expect(inputExperience).toBeInTheDocument(); 
         });
        
    });

});