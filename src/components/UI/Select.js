import React from 'react';
import classes from './Select.module.css';

const Select = (props)=>{

    const inputClassName = props.inputParams.error ? 'form-control invalid' : 'form-control';

    const dataChangeHandler = (event)=>{
        props.inputParams.inputChangeHandler(event);
        props.validate();
    }

    const dataBlurHandler = (event)=>{
        props.inputParams.inputBlurHandler(event);
        props.validate();
    }

    
    return (
        <div className={inputClassName}>
            <label htmlFor={props.inputParams.name}>{props.inputParams.label}{props.inputParams.required && <span className={classes.LabelRequire}>*</span>}</label>
            <select 
                type={props.inputParams.type} 
                id={props.inputParams.id} 
                name={props.inputParams.name} 
                value={props.inputParams.value}
                onChange={dataChangeHandler}
                onBlur={dataBlurHandler} 
                disabled={props.inputParams.disabled ? props.inputParams.disabled :  false}>
                    <option key={`default${props.inputParams.id}`} value=''>Select a value</option>)
                    {props.inputParams.options && props.inputParams.options.map(data=> 
                        <option key={data.value} value={data.value}>{data.name}</option>)}
            </select>
            {props.inputParams.error && <p className="error-text">{props.inputParams.invalidMessage}</p>}
        </div>
       
    )

}

export default Select;