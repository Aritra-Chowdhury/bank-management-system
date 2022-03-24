import { call, put } from "redux-saga/effects";
import { getCustomerDetails } from "../../../lib/api";
import { AuthActions } from "../../Duct/auth-slice";

export function* handlerGetUser(action){

    try {
        const response = yield call(getCustomerDetails, action.payload);
        yield put(AuthActions.setUserDetails(response[0]));

    } catch (error) {
        console.log("Error fetching logged in user details",error);
    }
   
}