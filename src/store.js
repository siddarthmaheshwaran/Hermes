import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import { reducer as formReducer } from 'redux-form';
// state enhancer, async actions
import thunk from 'redux-thunk';
import { viewMetricReducer } from './services/reducers/viewMetricReducer';

export const initialStateViewMetric = {
    reports: [],
    isPending: false,
    selectedReportID: "1"
};
// configuration for redux dev tools...
const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const storeEnhancer = devToolsCompose || compose;

const rootReducers = combineReducers({
    viewMetricList: viewMetricReducer,
    form: formReducer
});
const logger = createLogger();
export const store = createStore(rootReducers, storeEnhancer( applyMiddleware( thunk, logger ) ));