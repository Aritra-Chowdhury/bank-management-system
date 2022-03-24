import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Address from "./Address";

describe('<Address',()=>{

    test('renders Address',()=>{

        render(
            <Address></Address>
        );

        const nextButton = screen.getByRole('button',{
            name: /Next/i
        });
        expect(nextButton).toBeDisabled();

    });

    test('renders Address and reset values',async ()=>{

        render(
            <Address></Address>
        );

        const inputAddress = screen.getByLabelText(/Enter address street/i);
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