import React, {FC} from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import { privateRoutes, publicRoutes } from "./routes";

interface IAppRouter {
    logged: boolean | undefined
}

const AppRouter:FC<IAppRouter> = ({logged}) => {

    return(
        logged ? 
        <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to='/'/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to='/login'/>
            </Switch>
    )
}

export default AppRouter