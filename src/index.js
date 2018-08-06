import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ViewMetricList  from './containers/ViewMetricList';
import Container2 from './containers/Container2'
import { store } from './store'

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/view-metric/:id" component={ViewMetricList} />
                    <Route path="/view-metric/" component={Container2} />
                    <Route path="/validate/" component={Container2} />
                    <Route path="/" component={ViewMetricList} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.body.appendChild(document.createElement('hermes'))
);
