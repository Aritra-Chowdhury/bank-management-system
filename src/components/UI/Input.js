import React from 'react';
import { Form } from 'react-bootstrap';
import classes from './Input.module.css';

const Input = (props)=>{

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
        <React.Fragment>
            <Form.Group className={`mb-3 ${inputClassName}`} controlId={props.inputParams.id}>
                <Form.Label key={props.inputParams.name}>{props.inputParams.label}{props.inputParams.required && <span className={classes.LabelRequire}>*</span>}</Form.Label>
                <Form.Control
                    type={props.inputParams.type}
                    placeholder={props.inputParams.placeholder}
                    name={props.inputParams.name} 
                    value={props.inputParams.value}
                    onChange={dataChangeHandler}
                    onBlur={dataBlurHandler} required={true}
                    disabled={props.inputParams.disabled ? props.inputParams.disabled :  false}
                     />
                 {props.inputParams.error && <p className="error-text">{props.inputParams.invalidMessage}</p>}
            </Form.Group>
        </React.Fragment>
        
    );
}

export default Input;