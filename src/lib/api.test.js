import { getCities, getCountries, getCustomerDetails, getLoanList, saveLoanDetails } from "./api";

describe('API js test',()=>{

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


    test('getCountries',async ()=>{

        window.fetch = jest.fn();

        window.fetch.mockResolvedValueOnce({
          json: async ()=>{
            return {
                'auth_token' : 12123123123123
            };
          },
          ok: true
        }).mockResolvedValueOnce({
          json: async ()=>{
            return [
                {'country_name' : 'India'},
                {'country_name' : 'USA'}
            ];
          },
          ok: true
        });


        const response = await getCountries();

        expect(response).toHaveLength(2);

    });

    test('getCities',async ()=>{

        window.fetch = jest.fn();

        window.fetch.mockResolvedValueOnce({
          json: async ()=>{
            return {
                'auth_token' : 12123123123123
            };
          },
          ok: true
        }).mockResolvedValueOnce({
          json: async ()=>{
            return [
                {'state_name' : 'Kolkata'},
                {'state_name' : 'Punjab'}
            ];
          },
          ok: true
        });


        const response = await getCities('India');

        expect(response).toHaveLength(2);

    });
    
    test('getLoanList',async ()=>{

        window.fetch = jest.fn();

        window.fetch.mockResolvedValueOnce({
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

        const response = await getLoanList();

        expect(response).toHaveLength(1);

    });

    test('saveLoanDetails',async ()=>{

        window.fetch = jest.fn();

        window.fetch.mockResolvedValueOnce({
          json: async ()=>{
            return [
                mockLoanDetails
            ];
          },
          ok: true
        });

        await saveLoanDetails({'request_data': 123456789});
    });

    test('getCustomerDetails',async ()=>{

        window.fetch = jest.fn();

        window.fetch.mockResolvedValueOnce({
          json: async ()=>{
            return mockUserDetails;
          },
          ok: true
        });


        const response = await getCustomerDetails('test@mail.com');

        expect(response).toHaveLength(1);

    });

});