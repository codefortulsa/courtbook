import React from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const validationState = (meta) => meta.touched && meta.error ? "error" : null;

/**
 * @param id
 * @param label - Label
 * @param meta - Redux Form meta data
 * @param required - Display field as being required (via CSS so screen readers will not pronounce the asterisk)
 * @param srOnly - Visually hide the label but still allow screen readers to read the label
 * @param children - form control - input, date selector, etc.
 */
const FieldGroup = ({id, label, meta, required, srOnly, children}) => {
    const labelClassNameRequired = required ? "required" : "";
    return (
        <FormGroup controlId={id} validationState={validationState(meta)}>
            <ControlLabel className={labelClassNameRequired} srOnly={srOnly}>{label}</ControlLabel>
            {children}
            {<HelpBlock>{meta.touched && meta.error ? meta.error : ""}</HelpBlock>}
        </FormGroup>
    );
};

/**
 * @param type - "text", "date", etc.
 * @param input - Redux Form input
 * @param label - Label
 * @param placeholder - Input placeholder
 * @param disabled - True to disable input
 * @param fieldGroupOptions - Options for the field group, label, and help block
 */
export const InputFieldGroup = ({type = "text", input, label, placeholder, disabled, ...fieldGroupOptions}) =>
    <FieldGroup label={label} {...fieldGroupOptions}>
        <FormControl type={type} placeholder={placeholder || label} disabled={disabled} {...input}/>
    </FieldGroup>;

export const DatePickerFieldGroup = ({input, ...fieldGroupOptions}) =>
    <FieldGroup {...fieldGroupOptions}>
        <Datetime {...input}/>
    </FieldGroup>;
