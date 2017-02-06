import React from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";

const validationState = (meta) => meta.touched && meta.error ? "error" : null;

/**
 * @param id
 * @param type - "text", "date", etc.
 * @param input - Redux Form input
 * @param label - Label
 * @param meta - Redux Form meta data
 * @param placeholder - Input placeholder
 * @param required - Display field as being required (via CSS so screen readers will not pronounce the asterisk)
 * @param srOnly - Visually hide the label but still allow screen readers to read the label
 */
export const FieldGroup = ({id, type = "text", input, label, meta, placeholder, required, srOnly, disabled}) => {
    const labelClassNameRequired = required ? "required" : "";
    return (
        <FormGroup controlId={id} validationState={validationState(meta)}>
            <ControlLabel className={labelClassNameRequired} srOnly={srOnly}>{label}</ControlLabel>
            <FormControl type={type} placeholder={placeholder || label} disabled={disabled} {...input}/>
            {<HelpBlock>{meta.touched && meta.error ? meta.error : ""}</HelpBlock>}
        </FormGroup>
    );
};
