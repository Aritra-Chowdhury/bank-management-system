import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store";
import LoanInformation from "./LoanInformation";

describe('<LoanInformation',()=>{

    test('renders LoanInformation',()=>{

        render(
            <Provider store={store}>
                <LoanInformation></LoanInformation>
            </Provider>
            
        );

        const nextButton = screen.getByRole('button',{
            name: /Next/i
        });
        expect(nextButton).toBeDisabled();

    });

    test('renders LoanInformation and reset values',async ()=>{

        render(
            <Provider store={store}>
                <LoanInformation></LoanInformation>
            </Provider>
        );

        const inputExperience = screen.getByLabelText(/Enter loan amount/i);
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