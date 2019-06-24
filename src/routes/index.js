import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from '../components/App'
import Home from '../components/Home';
import Info from '../components/Info';


const Routes = () => (
    <App>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Info" component={Info} />
        </Switch>
    </App> )

export default Routes