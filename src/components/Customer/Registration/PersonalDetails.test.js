import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PersonalDetails from "./PersonalDetails";

describe('<PersonalDetails',()=>{

    test('renders PersonalDetails',()=>{

        render(
            <PersonalDetails></PersonalDetails>
        );

        const nextButton = screen.getByRole('button',{
            name: /Next/i
        });
        expect(nextButton).toBeDisabled();

    });

    test('renders PersonalDetails and reset values',async ()=>{

        render(
            <PersonalDetails></PersonalDetails>
        );

        const inputAddress = screen.getByLabelText(/Enter Your contact number/i);
        userEvent.type(inputAddress, '1234568');

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