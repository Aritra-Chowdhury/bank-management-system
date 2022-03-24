const FIREBASE_DOMAIN = 'https://fir-react-practice-3bb6a-default-rtdb.asia-southeast1.firebasedatabase.app';
const UNIVERSAL_DATA_DOMAIN ='https://www.universal-tutorial.com/api';

async function getToken(){

    const response = await fetch(`${UNIVERSAL_DATA_DOMAIN}/getaccesstoken`,{
        method: 'GET',
        headers: {
            "user-email": `1995aritra@gmail.com`,
            "Accept": "application/json",
            "api-token" : '96hFsUnTMvQOfw-UaSGgGaOAyilSC0tfeFfyVeWv9VN5IfROBygKDyvGtWK6uXFSYdo'
        }
    });

    const responseData = await response.json();

    
    if (!response.ok) {
        throw new Error(responseData.message || 'Could not fetch token.');
    }

    return responseData.auth_token;
}


export async function getCountries() {
    const token = await getToken();
    const response = await fetch(`${UNIVERSAL_DATA_DOMAIN}/countries/`,{
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    });


    const countries = await response.json();
    if (!response.ok) {
        throw new Error(countries.message || 'Could not fetch countries.');
    }

    const loadedCountry = [];
  
    for (var index in countries) {
        loadedCountry.push({'name' : countries[index].country_name, 'value' : countries[index].country_name});
    }

    return loadedCountry;
}

export async function getCities(country) {
    const token = await getToken();
    const response = await fetch(`${UNIVERSAL_DATA_DOMAIN}/states/${country}`,{
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    });

    const states = await response.json();

    if (!response.ok) {
        throw new Error(states.message || 'Could not fetch cities.');
    }
   
  
    const loadedState = [];
    
    for (const index in states) {
      loadedState.push({'name' : states[index].state_name, 'value' : states[index].state_name});
    }

    return loadedState;
}

export async function getLoanList() {
    const response = await fetch(`${FIREBASE_DOMAIN}/loandetails.json`,{
        method: 'GET',
        headers: {}
    });
    const loanData = await response.json();
  
    if (!response.ok) {
      throw new Error(loanData.message || 'Could not fetch loan list.');
    }
  
    const loadedLoan = [];
  
    for (const loankey in loanData) {
        const localStorageLoggeduser = localStorage.getItem('loggeduser');
        if(loanData[loankey].personalDetails && loanData[loankey].personalDetails.email === localStorageLoggeduser){
            const accountNumber = loankey;
            loanData[loankey].accountNumber  = accountNumber.slice(7);
            loadedLoan.push({ 
                ...loanData[loankey]
            });
        }
    }
    return loadedLoan;
}

export async function saveLoanDetails(requestData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/loandetails.json`,{
        method: 'POST',
        headers: {},
        body: JSON.stringify({
            ...requestData
        })
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Could not save loan details.');
    }

    return ;
}

export async function login(validationData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/loancustomer.json`,{
        method: 'GET',
        headers: {}
    });
    const customerData = await response.json();
  
    if (!response.ok) {
      throw new Error(customerData.message || 'Could not fetch customer details.');
    }
  
    const loadedCustomers = [];
        for (const customerkey in customerData) {
            if(customerData[customerkey].personalDetails.username === validationData.username 
                && customerData[customerkey].personalDetails.email === validationData.email
                && customerData[customerkey].personalDetails.password === validationData.password)
                loadedCustomers.push({ 
                    ...customerData[customerkey]
            });
        }

    return loadedCustomers;
}

export async function register(requestData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/loancustomer.json`,{
        method: 'POST',
        headers: {},
        body: JSON.stringify(requestData)
    });
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Could not save customer details.');
    }
  
    return;
}


export async function getCustomerDetails(email) {
    const response = await fetch(`${FIREBASE_DOMAIN}/loancustomer.json`,{
        method: 'GET',
        headers: {}
    });
    const customerData = await response.json();
  
    if (!response.ok) {
      throw new Error(customerData.message || 'Could not fetch customer details.');
    }
  
    const loadedCustomers = [];
    for (const customerkey in customerData) {
        if(customerData[customerkey].personalDetails && customerData[customerkey].personalDetails.email === email)
            loadedCustomers.push({ 
                ...customerData[customerkey]
        });
    }

    return loadedCustomers;
}




  
    

