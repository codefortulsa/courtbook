import React from "react";
import UpcomingEvents from './UpcomingEvents';
import {Row, Col} from 'react-bootstrap';

const Home = () => (
    <div>
        <Row>
            <Col md={6}>
                <UpcomingEvents/>
            </Col>
        </Row>
    </div>
);

export default Home;
