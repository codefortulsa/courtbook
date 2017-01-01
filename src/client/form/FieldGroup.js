import React from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";

const validationState = (meta) => meta.touched && meta.error ? "error" : null;

export const FieldGroup = ({id, type = "text", input, label, meta, placeholder, required}) => (
    <FormGroup controlId={id} validationState={validationState(meta)}>
        <ControlLabel className={required ? "required" : null}>{label}</ControlLabel>
        <FormControl type={type} placeholder={placeholder || label} {...input}/>
        {<HelpBlock>{meta.error}</HelpBlock>}
    </FormGroup>
);
