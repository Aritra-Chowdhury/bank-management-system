import { createSlice } from "@reduxjs/toolkit";

const initialUserDetails = {
    personalDetails: {
        name: '',
        username: '',
        password: '',
        email: '',
        contactNumber: '',
        dateOfBirth: ''
    },
    address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zipcode: ''
    },
    accountInformation: {
        accountNumber: '',
        branchName: '',
        balance: '',
        identityProofType: '',
        indentityProofNumber: ''
    }
};

const AuthSlice = createSlice({
    name: 'Auth',
    initialState : {
        userDetails: initialUserDetails,
        isLoggedIn: false
    },
    reducers:{
        getUserDetails(state,action) {

        },
        setUserDetails(state,action){
            state.userDetails = action.payload;
        },
        setIsLoggedIn(state,action){
            state.isLoggedIn = action.payload;
        },
        login(state,action) {
            console.log(action.payload);
            localStorage.setItem('isLoggedIn', '1');
            localStorage.setItem('loggeduser', action.payload.personalDetails.email);
            state.isLoggedIn = true;
            state.userDetails = action.payload
        },
        logout(state) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggeduser');
            state.isLoggedIn = false;
            state.userDetails = initialUserDetails
        },
        updateBalance(state, action){
            state.userDetails.accountInformation.balance = action.payload;
        }
    }
});

export default AuthSlice;
export const AuthActions = AuthSlice.actions;