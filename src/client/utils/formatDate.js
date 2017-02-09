import moment from "moment";

export const toDatetime = (value) => moment(value).format("MM/DD/YYYY hh:mm A");
