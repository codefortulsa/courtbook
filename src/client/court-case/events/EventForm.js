import React from "react";
import {Field} from "redux-form";
import {Panel, Col, Row, Glyphicon, Button} from "react-bootstrap";
import {FieldGroup} from "../FieldGroup";

const EventForm = ({member, index, remove}) => {
    const header =
        <div>
            Event {index + 1}
            <div className="pull-right"><Button onClick={remove} bsStyle="link"><Glyphicon glyph="trash"/></Button></div>
        </div>;


    const dateLabel = `Event date ${index + 1}`;
    const descLabel = `Event description ${index + 1}`;
    return (
        <Panel header={header}>
            <Row>
                <Col md={12}>
                    <Field name={`${member}.date`} id={`${member}.date`} label={dateLabel}
                           placeholder="Date" srOnly={true} required={true} component={FieldGroup}/>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Field name={`${member}.description`} id={`${member}.description`} label={descLabel}
                           placeholder="Description" srOnly={true} required={true} component={FieldGroup}/>
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
