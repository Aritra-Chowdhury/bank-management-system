import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    showDeposite: false,
    showLoanDetails: false
};

const ModalSlice = createSlice({
    name: 'Modal',
    initialState: initialState,
    reducers:{
        toggleDeposit(state) {
            state.showDeposite = !state.showDeposite
        },
        showLoanDetails(state) {
            state.showLoanDetails = true;
        },
        hideLoanDetails(state) {
            state.showLoanDetails = false;
        }
    }
});

export default ModalSlice;
export const ModalActions = ModalSlice.actions;