import { useEffect, useState} from "react";
import UseHttp from "../../../hooks/useHttp";
import UseInput from "../../../hooks/useInput";
import { getCities, getCountries } from "../../../lib/api";
import Input from "../../UI/Input";
import Select from "../../UI/Select";

const prepareInputParams = (name, id, type, label, value, placeholder, error, invalidMessage, inputChangeHandler, inputBlurHandler) => {

    return {
        name: name,
        id: id,
        type: type,
        label: label,
        value: value,
        placeholder: placeholder,
        error: error,
        invalidMessage: invalidMessage,
        inputChangeHandler: inputChangeHandler,
        inputBlurHandler: inputBlurHandler,
        required: true
    }
}

const prepareSelectParams = (name, id, type, label, value, options, error, invalidMessage, inputChangeHandler, inputBlurHandler) => {

    return {
        name: name,
        id: id,
        type: type,
        label: label,
        value: value,
        options: options,
        error: error,
        invalidMessage: invalidMessage,
        inputChangeHandler: inputChangeHandler,
        inputBlurHandler: inputBlurHandler,
        required: true
    }
}

const isNotEmpty = (value) => value.trim() !== '';
const isMinChars = (value, minSize) => value.trim().length === minSize;


const Address = (props) => {

    const {doPerform: fetchCountries , data: countries } = UseHttp(getCountries, true);
    
    useEffect(()=>{
        fetchCountries();
    },[]);

      const {
        value: enteredCountry,
        hasError: enteredCountryIsInvalid,
        isValid: enteredCountryIsValid,
        inputValueReset: countryReset,
        inputValueChangeHandler: countryChangeHandler,
        inputValueChangeBlur: countryChangeBlurHandler,
        setInputValue: setCountry
    } = UseInput((value) => isNotEmpty(value));

    const countrySelectParams = prepareSelectParams('country', 'country', 'text', 'Enter address country', enteredCountry, 
    countries, enteredCountryIsInvalid, 'Address country is required', countryChangeHandler, countryChangeBlurHandler);

    
    const {doPerform: fetchStates , data: states } = UseHttp(getCities, true);
    
    useEffect(()=>{
        if(enteredCountry !== ''){
            fetchStates(enteredCountry);
        }
    },[enteredCountry,fetchStates]);

    const [formIsValid, setFormIsValid] = useState(false);

    const {
        value: enteredStreet,
        hasError: enteredStreetIsInvalid,
        isValid: enteredStreetIsValid,
        inputValueReset: streetReset,
        inputValueChangeHandler: streetChangeHandler,
        inputValueChangeBlur: streetChangeBlurHandler,
        setInputValue: setStreet
    } = UseInput((value) => isNotEmpty(value));

    const streetInputParams = prepareInputParams('street', 'street', 'text', 'Enter address street', enteredStreet, 'Enter street', enteredStreetIsInvalid, 'Addess Street is required', streetChangeHandler, streetChangeBlurHandler);

    const {
        value: enteredCity,
        hasError: enteredCityIsInvalid,
        isValid: enteredCityIsValid,
        inputValueReset: cityReset,
        inputValueChangeHandler: cityChangeHandler,
        inputValueChangeBlur: cityChangeBlurHandler,
        setInputValue: setCity
    } = UseInput((value) => isNotEmpty(value));

    const cityInputParams = prepareInputParams('city', 'city', 'text', 'Enter address city', enteredCity, 'Enter city', enteredCityIsInvalid, 'Address city is required', cityChangeHandler, cityChangeBlurHandler);

    const {
        value: enteredState,
        hasError: enteredStateIsInvalid,
        isValid: enteredStateIsValid,
        inputValueReset: stateReset,
        inputValueChangeHandler: stateChangeHandler,
        inputValueChangeBlur: stateChangeBlurHandler,
        setInputValue: setState
    } = UseInput((value) => isNotEmpty(value));

    const stateSelectParams = prepareSelectParams('state', 'state', 'text', 'Enter address state', enteredState, 
    states, enteredStateIsInvalid, 'Address state is required', stateChangeHandler, stateChangeBlurHandler);

    const {
        value: enteredZip,
        hasError: enteredZipIsInvalid,
        isValid: enteredZipIsValid,
        inputValueReset: zipReset,
        inputValueChangeHandler: zipChangeHandler,
        inputValueChangeBlur: zipChangeBlurHandler,
        setInputValue: setZip
    } = UseInput((value) => isNotEmpty(value) && isMinChars(value, 6));

    const zipInputParams = prepareInputParams('zip', 'zip', 'text', 'Enter address zip', enteredZip, 'Enter zip', enteredZipIsInvalid, 'Address zip is required', zipChangeHandler, zipChangeBlurHandler);

    

    const validateAddress = () => {
        const isValid = enteredStreetIsValid && enteredCityIsValid && enteredStateIsValid && enteredCountryIsValid && enteredZipIsValid;
        setFormIsValid(isValid);
    }

    const resetForm = () => {
        streetReset();
        cityReset();
        stateReset();
        zipReset();
        countryReset();

        setFormIsValid(false);
    }

    const addressSubmitHandler = (event) => {
        event.preventDefault();


        if (!formIsValid) {
            return;
        }
        props.onSubmitDetails({
            street: enteredStreet,
            city: enteredCity,
            state: enteredState,
            country: enteredCountry,
            zipcode: enteredZip
        });

        // remove later
        resetForm();
    }

 
  
    return (
        <form className={props.className} onSubmit={addressSubmitHandler}>
            <Input inputParams={streetInputParams}
                validate={validateAddress}></Input>
            <Input inputParams={cityInputParams}
                validate={validateAddress}></Input>
            <Select inputParams={countrySelectParams}
                validate={validateAddress}></Select>
            <Select inputParams={stateSelectParams}
                validate={validateAddress}></Select>
        
            <Input inputParams={zipInputParams}
                validate={validateAddress}></Input>
            
            <div className="form-actions">
                <button className="button-reset" onClick={resetForm}>Reset</button>
                <button disabled={
                    !formIsValid
                }>Next</button>
            </div>
        </form>
    );
}

export default Address;
