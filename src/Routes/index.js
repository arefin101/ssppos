import React from 'react';
import { Switch, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/VerticalLayouts";
//routes

import { authProtectedRoutes, saleTerminalRoute, publicRoutes } from "./allRoutes";
import { AuthProtected, AccessRoute } from './AuthProtected';

const Index = () => {
    const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
    const availableAuthRoutesPath = authProtectedRoutes.map((r) => r.path);
    const availableSaleTerminalRoutePath = saleTerminalRoute.map((r) => r.path);
    return (
        <React.Fragment>
            <Switch>
                <Route path={availablePublicRoutesPaths}>
                    <NonAuthLayout>
                        <Switch>
                            {publicRoutes.map((route, idx) => (
                                <Route
                                    path={route.path}
                                    component={route.component}
                                    key={idx}
                                    exact={true}
                                />
                            ))}
                        </Switch>
                    </NonAuthLayout>
                </Route>
                
                <Route path={availableSaleTerminalRoutePath}>
                    <AuthProtected>
                        <NonAuthLayout>
                            <Switch>
                                {saleTerminalRoute.map((route, idx) => (
                                    <AccessRoute
                                        path={route.path}
                                        component={route.component}
                                        permission = {route.permission}
                                        key={idx}
                                        exact={true}
                                    />
                                ))}
                            </Switch>
                        </NonAuthLayout>
                    </AuthProtected>
                </Route>

                <Route path={availableAuthRoutesPath}>
                    <AuthProtected>
                        <VerticalLayout>
                            <Switch>
                                {authProtectedRoutes.map((route, idx) => (
                                    <AccessRoute
                                        path={route.path}
                                        component={route.component}
                                        permission = {route.permission}
                                        key={idx}
                                        exact={true}
                                    />
                                ))}
                            </Switch>
                        </VerticalLayout>
                    </AuthProtected>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Index;