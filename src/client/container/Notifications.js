import React from "react";
import {NotificationStack} from "react-notification";
import {connect} from "react-redux";
import {dismissNotification, error} from "../store/actions/NotificationActions";


const Notifications = ({notifications, addNotification, dismissNotification}) =>
    <div>
        <button onClick={() => error}>W/E
        </button>
        <NotificationStack notifications={notifications} onDismiss={dismissNotification}/>
    </div>

Notifications.displayName = "Notifications";

Notifications.propTypes = {
    notifications: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    dismissNotification: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    notifications: state.notifications
});

const mapDispatchToProps = (dispatch) => ({
    dismissNotification
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
