import React from "react";
import {Field} from "redux-form";
import {Panel, Col, Row, Glyphicon, Button} from "react-bootstrap";
import {InputFieldGroup, DatePickerFieldGroup} from "../FieldGroup";
import {toDatetime} from "../../utils/formatDate";

const EventForm = ({member, index, remove}) => {
    const header =
        <div>
            Event {index + 1}
            <div className="pull-right"><Button onClick={remove} bsStyle="link"><Glyphicon glyph="trash"/></Button>
            </div>
        </div>;


    const dateLabel = `Event date ${index + 1}`;
    const descLabel = `Event description ${index + 1}`;
    return (
        <Panel header={header}>
            <Row>
                <Col md={12}>
                    <Field name={`${member}.date`} id={`${member}.date`} label={dateLabel} format={toDatetime}
                           placeholder="Date" srOnly={true} required={true} component={DatePickerFieldGroup}/>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Field name={`${member}.description`} id={`${member}.description`} label={descLabel}
                           placeholder="Description" srOnly={true} required={true} component={InputFieldGroup}/>
                </Col>
            </Row>
        </Panel>
    );
};

EventForm.propTypes = {
    member: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    remove: React.PropTypes.func.isRequired
};

export default EventForm;
