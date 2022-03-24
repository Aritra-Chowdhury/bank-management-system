import { useReducer } from "react";

const intialInputState = {
    value : '',
    isTouched : false
}

const inputReducerHandler = (state , action)=>{

    if(action.type === 'INPUT'){
        return { value: action.value, isTouched: state.isTouched };
    }else if(action.type === 'BLUR'){
        return { value: state.value, isTouched: true };
    }else if(action.type === 'RESET'){
        return intialInputState;
    }else if(action.type === 'SET'){
        return { value: action.value, isTouched: state.isTouched };
    }

    return intialInputState;
}
const UseInput = (validateData)=>{

    const [inputState, dispatch] = useReducer(inputReducerHandler, intialInputState);

    const isValid = validateData(inputState.value);
    const hasError = !isValid && inputState.isTouched;

    const inputValueChangeHandler = (event)=>{
        dispatch({'type':'INPUT', value: event.target.value});
    }

    const inputValueChangeBlur = (event)=>{
        dispatch({'type':'BLUR'})
    }

    const inputValueReset = (event)=>{
        dispatch({'type' : 'RESET'})
    }

    const setInputValue = (value)=>{
        dispatch({'type' : 'SET', value});
    }

    return {
        value: inputState.value,
        hasError,
        isValid,
        inputValueChangeHandler,
        inputValueChangeBlur,
        inputValueReset,
        setInputValue
    };

}

export default UseInput;