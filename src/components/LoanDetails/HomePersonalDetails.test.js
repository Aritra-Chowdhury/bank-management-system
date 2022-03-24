import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePersonalLoanDetails from "./HomePersonalLoanDetails";

describe('<HomePersonalLoanDetails',()=>{

    test('renders HomePersonalLoanDetails',()=>{

        render(
            <HomePersonalLoanDetails></HomePersonalLoanDetails>
        );

        const nextButton = screen.getByRole('button',{
            name: /Next/i
        });
        expect(nextButton).toBeDisabled();

    });

    test('renders HomePersonalLoanDetails and reset values',async ()=>{

        render(
            <HomePersonalLoanDetails></HomePersonalLoanDetails>
        );

        const inputExperience = screen.getByLabelText(/Enter Total Experience/i);
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