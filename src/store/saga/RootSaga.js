import { takeLatest } from "redux-saga/effects";
import { AuthActions } from "../Duct/auth-slice";
import { handlerGetUser } from "./handler/UserDetailsHandler";

export function* watcherSaga(){
    yield takeLatest(AuthActions.getUserDetails.type , handlerGetUser);
}