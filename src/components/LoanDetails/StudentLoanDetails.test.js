import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StudentLoanDetails from "./StudentLoanDetails";

describe('<StudentLoanDetails',()=>{

    test('renders HomePersonalLoanDetails',()=>{

        render(
            <StudentLoanDetails></StudentLoanDetails>
        );

        const nextButton = screen.getByRole('button',{
            name: /Next/i
        });
        expect(nextButton).toBeDisabled();

    });

    test('renders StudentLoanDetails and reset values',async ()=>{

        render(
            <StudentLoanDetails></StudentLoanDetails>
        );

        const inputExperience = screen.getByLabelText(/Enter course name/i);
        userEvent.type(inputExperience, '1234568');

        await waitFor(() => {
            expect(screen.getByDisplayValue('1234568')).toBeInTheDocument(); 
         });

        const resetButton = screen.getByRole('button',{
            name: /reset/i
        });

        userEvent.click(resetButton);
        await waitFor(() => {
            expect(screen.queryByDisplayValue('1234568')).toBeNull(); 
         });
        
    });

});