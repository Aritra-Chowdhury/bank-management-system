import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import RegistrationForm from "./RegistrationForm"

describe('<Register/>', ()=>{

    test('Render Register Form',()=>{
        render(
            <BrowserRouter>
                <RegistrationForm></RegistrationForm>
            </BrowserRouter>
        );

        const registerElements = screen.getAllByText(/Register/i);
        expect(registerElements).toHaveLength(1);
    });

    test('Render Register Form and next should be disabled',()=>{
        render(
            <BrowserRouter>
                <RegistrationForm></RegistrationForm>
            </BrowserRouter>
        );

        const nextButton = screen.getByRole('button',{
            name: /next/i
        });
        expect(nextButton).toBeDisabled();
    });

    test('Render Register Form and loads all the headers',()=>{
        render(
            <BrowserRouter>
                <RegistrationForm></RegistrationForm>
            </BrowserRouter>
        );

        const personalElements = screen.getAllByText(/Peronal Information/i);
        const addressElements = screen.getAllByText(/Address Details/i);
        const accountElements = screen.getAllByText(/Account Details/i);

        expect(personalElements).toHaveLength(1);
        expect(addressElements).toHaveLength(1);
        expect(accountElements).toHaveLength(1);
    });
})