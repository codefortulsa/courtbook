import React from "react";
import {Button, Row, Col, Glyphicon} from "react-bootstrap";
import ReminderForm from "./ReminderForm";
import "../style/styles.less";

const RemindersForm = ({fields}) => (
    <div>
        <Row>
            <Col mdOffset={2} md={8}>
                {fields.map((field, index) => <ReminderForm key={index} member={field} index={index}/>)}
            </Col>
        </Row>
        <Row>
            <Col mdOffset={2} md={8}>
                <div className="text-center">
                    <Button onClick={() => fields.push()}><Glyphicon glyph="plus"/> Add Reminder</Button>
                </div>
            </Col>
        </Row>
    </div>
);

export default RemindersForm;
