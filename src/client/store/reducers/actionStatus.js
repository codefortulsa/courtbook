import _ from 'lodash';
export const PENDING = "PENDING";
export const REJECTED = "REJECTED";
export const FULFILLED = "FULFILLED";

export const pendingType = (type) => `${type}_${PENDING}`;
export const rejectedType = (type) => `${type}_${REJECTED}`;
export const fulfilledType = (type) => `${type}_${FULFILLED}`;

export const isPending = (typeOrStatus) => _.endsWith(typeOrStatus, PENDING);
export const isRejected = (typeOrStatus) => _.endsWith(typeOrStatus, REJECTED);
export const isFulfilled = (typeOrStatus) => _.endsWith(typeOrStatus, FULFILLED);

export const typeToStatus = (type) => {
    if (isPending(type)) {
        return PENDING;
    } else if (isRejected(type)) {
        return REJECTED;
    } else if (isFulfilled(type)) {
        return FULFILLED;
    } else {
        return undefined;
    }
};
