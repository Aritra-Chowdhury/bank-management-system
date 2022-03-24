import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import LoanDetailsForm from "./LoanDetailsForm";

describe('<LoanDetailsForm/>',()=>{

    test('Render LoanDetails form',()=>{
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoanDetailsForm></LoanDetailsForm>
                </Provider>  
            </BrowserRouter>
        );

        const registerElements = screen.getAllByText(/Loan Information/i);
        expect(registerElements).toHaveLength(2);
    })

    test('Render LoanDetails Form and next should be disabled',()=>{
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoanDetailsForm></LoanDetailsForm>
                </Provider>  
            </BrowserRouter>
        );

        const nextButton = screen.getByRole('button',{
            name: /next/i
        });
        expect(nextButton).toBeDisabled();
    });


    test('Render LoanDetails Form and loads all the headers',()=>{
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoanDetailsForm></LoanDetailsForm>
                </Provider>  
            </BrowserRouter>
        );

        const personalElements = screen.getAllByText(/Loan Information/i);
        const addressElements = screen.getAllByText(/Additional Information/i);
        const accountElements = screen.getAllByText(/Review And Confirm/i);

        expect(personalElements).toHaveLength(2);
        expect(addressElements).toHaveLength(1);
        expect(accountElements).toHaveLength(1);
    });
})