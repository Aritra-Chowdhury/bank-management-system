import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountDetails from "./AccountDetails";

describe('<AccountDetails',()=>{

    test('renders AccountDetails',()=>{

        render(
            <AccountDetails></AccountDetails>
        );

        const submitButton = screen.getByRole('button',{
            name: /Submit/i
        });
        expect(submitButton).toBeDisabled();

    });

    test('renders AccountDetails and reset values',async ()=>{

        render(
            <AccountDetails></AccountDetails>
        );

        const inputAccount = screen.getByLabelText(/Enter bank account/i);
        userEvent.type(inputAccount, '1234568');

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