import _ from 'lodash';
import { initialStateViewMetric } from '../../store'

export const viewMetricReducer = (state=initialStateViewMetric, action={}) => {
    switch (action.type) {
        case "PENDING":
            return { ...state, isPending : true};
        case "FETCH_REPORTS_SUCCESS":
            return { ...state, reports: {..._.mapKeys(action.reportsList.data, 'myID')}, isPending : false};
        case "FAILED":
            return { ...state, error: action.payload};
        default:
            return state;
    }
};