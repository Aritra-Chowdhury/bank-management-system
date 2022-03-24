import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store";
import LoginForm from "./LoginForm";

describe('<Login/>',() => {

    test('Test login page loaded',()=>{
        render(
            <Provider store={store}>
                <LoginForm></LoginForm>
            </Provider>
            
        );

        const loginElements = screen.getAllByText(/Login/i);
        expect(loginElements).toHaveLength(2);
    });

    test('Test login button is disabled',()=>{
        render(
            <Provider store={store}>
                <LoginForm></LoginForm>
            </Provider>
            
        );

        const loginButton = screen.getByRole('button',{
            name: /login/i
        });
        expect(loginButton).toBeDisabled();
    });

    test('Test login button is enabled after form filled',async ()=>{
        const utils = render(
            <Provider store={store}>
                <LoginForm></LoginForm>
            </Provider>
            
        );

        const inputUserName = utils.getByLabelText(/Enter user name/i);
        const inputEmail = utils.getByLabelText(/Enter Your Email/i);
        const inputPassword = utils.getByLabelText(/Enter password/i);

        fireEvent.focusIn(inputUserName);
        fireEvent.change(inputUserName, {target: {value: 'testuser'}});
        fireEvent.focusOut(inputUserName);
        fireEvent.focusIn(inputEmail);
        fireEvent.change(inputEmail, {target: {value: 'testuser@mail.com'}})
        fireEvent.focusOut(inputEmail);
        fireEvent.focusIn(inputPassword);
        fireEvent.change(inputPassword, {target: {value: 'Testuser12@'}})
        fireEvent.focusOut(inputPassword);

        await waitFor(() => {
            expect(screen.getByDisplayValue('testuser')).toBeInTheDocument(); 
            expect(screen.getByDisplayValue('testuser@mail.com')).toBeInTheDocument(); 
            expect(screen.getByDisplayValue('Testuser12@')).toBeInTheDocument(); 
            const loginButton = screen.getByRole('button',{
                name: /login/i
            });
            expect(loginButton).not.toBeDisabled();
         });

        
    });
});