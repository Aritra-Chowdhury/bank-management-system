import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Duct/auth-slice";
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from "./saga/RootSaga";
import ModalSlice from "./Duct/modal-slice";

const  sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        modal: ModalSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(watcherSaga);

export default store;