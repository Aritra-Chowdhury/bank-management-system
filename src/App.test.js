import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';

fdescribe('<App/>',()=>{


  const mockUserDetails = [{
    personalDetails: {
        name: 'test',
        username: 'test',
        password: 'abcd123@',
        email: 'test@mail.com',
        contactNumber: '12345678900',
        dateOfBirth: '2022-03-16'
    },
    address: {
        street: 'test',
        city: 'test',
        state: 'test',
        country: 'test',
        zipcode: 'tese'
    },
    accountInformation: {
        accountNumber: '12233234',
        branchName: 'test23',
        balance: '12312312',
        identityProofType: 'Pan',
        indentityProofNumber: '2131BG1D'
    }
}];

const mockLoanDetails = [{
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
          companyName: '',
          designation: '',
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
}];


  test('renders default Login details', () => {

    render( 
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
      );
    const headerElement = screen.getByText(/BANK MANAGEMENT SYSTEM/i);
    expect(headerElement).toBeInTheDocument();

    const loginHeaderElement = screen.getByText('LOGIN');
    expect(loginHeaderElement).toBeInTheDocument();
  });

  test('renders app and load nav bar', () => {

    render( 
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
      );
    const appHeaderElements = screen.getAllByRole('listitem');
    expect(appHeaderElements).toHaveLength(2);

    expect(screen.getByText('Register',{exact:true})).toBeInTheDocument();
  });

  test('renders app and load register page', async () => {

    render( 
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
      );
    const appHeaderElements = screen.getAllByRole('listitem');

    userEvent.click(appHeaderElements[0]);

    await waitFor(() => {
      expect(appHeaderElements).toHaveLength(2);
      expect(screen.getByText('Register',{exact:true})).toBeInTheDocument();
    });
    
  });

  test('renders app and session active', async () => {

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async ()=>{
        return mockUserDetails;
      },
      ok: true
    }).mockResolvedValueOnce({
      json: async ()=>{
        return mockLoanDetails;
      },
      ok: true
    });

    const localStorageMock =  {
      state: {
        'loggeduser': 'test@mail.com',
        'isLoggedIn' :  "1"
      },
      setItem (key, item) {
        this.state[key] = item
      },
      getItem (key) { 
        return this.state[key]
      },
      removeItem (key){
        this.state[key] = ''
      }
    }
    
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render( 
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
      );

    await waitFor(() => {
      const appHeaderElements = screen.getAllByRole('listitem');

      expect(appHeaderElements).toHaveLength(7);
      expect(screen.getByText('Deposit',{exact:true})).toBeInTheDocument();

    });
    
  });


  test('renders app and click on Apply loan button', async () => {

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async ()=>{
        return mockUserDetails;
      },
      ok: true
    }).mockResolvedValueOnce({
      json: async ()=>{
        return mockLoanDetails;
      },
      ok: true
    });

    const localStorageMock ={
      state: {
        'loggeduser': 'test@mail.com',
        'isLoggedIn' :  "1"
      },
      setItem (key, item) {
        this.state[key] = item
      },
      getItem (key) { 
        return this.state[key]
      },
      removeItem (key){
        this.state[key] = ''
      }
    }
    
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render( 
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
      );

    const applyLoanButons = screen.getAllByText('Apply loan',{exact:true})
    fireEvent.click(applyLoanButons[0]);
    await waitFor(() => {
      expect(screen.getByText('Review and confirm',{exact:true})).toBeInTheDocument();
    });
    
  });
})

