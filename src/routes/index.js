import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from '../pages/App'
import Home from '../pages/Home';
import About from '../pages/About';
import Blog from '../pages/Blog';
import Projects from '../pages/Projects';


const Routes = () => (
    <App>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Blog" component={Blog} />
            <Route exact path="/Projects" component={Projects} />
        </Switch>
    </App> )

export default Routes