import React from "react";
import {connect} from "react-redux";
import {compose, lifecycle} from "recompose";
import {fetchUpcomingEvents} from "../store/actions/UpcomingEventsActions";
import UpcomingEventsList from "./UpcomingEventsList";

export const enhanceWithFetchUpcomingEvents = compose(
    lifecycle({
        componentDidMount: function () {
            const {fetchUpcomingEvents} = this.props;
            fetchUpcomingEvents();
        }
    }));

const mapStateToProps = (state) => ({
    events: state.upcomingEvents.events
});

export default connect(mapStateToProps, {fetchUpcomingEvents})(enhanceWithFetchUpcomingEvents(UpcomingEventsList));
