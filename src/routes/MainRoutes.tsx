import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import AuthorizedRoute from './AuthorizedRoute'
import { LOCATION_PATHS as lp } from '../common/enumerations/LocationPathsEnum';
import Login from '../components/user/Login';

/**
 * The top level routes set-up for rendering all components at top level routes. This route must be in the layout or any component that is such that the routes are directly relative to the React BrowserRouter.
 * @returns
 */
const MainRoutes = () => {

    throw new Error("Auhorized route for items page not yet implemented.")

    return (
        <Switch>
            <Route exact path={lp.home}>
                <Redirect to={lp.itmes} />
            </Route>
            <AuthorizedRoute path={lp.itmes} children={<>{/* TODO: Itmes component should go here. */}</>} />
            <Route exact path={lp.login}>
                <Login />
            </Route>
            <Route exact path="*">
                <Redirect to={lp.home} />
            </Route>
        </Switch>
    )
}

export default MainRoutes
