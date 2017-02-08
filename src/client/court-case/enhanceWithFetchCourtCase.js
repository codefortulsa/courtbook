import {compose, lifecycle} from "recompose";

export const enhanceWithFetchCourtCase = (Component) => {
    const enhance = compose(
        lifecycle({
            componentDidMount: function () {
                const {fetchAndSelectCourtCase, params: {id}} = this.props;
                fetchAndSelectCourtCase(id);
            }
        }));
    return enhance(Component);
};
