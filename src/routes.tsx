import React, {lazy, Suspense, useContext, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {auth} from './config/firebase.config';
import {
    CATEGORY,
    COUPONS,
    CUSTOMERS,
    DASHBOARD,
    LOGIN,
    ORDERS,
    PRODUCTS,
    REGISTER,
    SETTINGS,
    SITE_SETTINGS,
    STAFF_MEMBERS
} from 'settings/constants';
import AuthProvider, {AuthContext} from 'context/auth';
import {InLineLoader} from 'components/InlineLoader/InlineLoader';
import {useDispatch} from "react-redux";
import {saveIdToken} from '../src/redux/authRedux/authActions'

const Products = lazy(() => import('containers/Products/Products'));
const AdminLayout = lazy(() => import('containers/Layout/Layout'));
const Dashboard = lazy(() => import('containers/Dashboard/Dashboard'));
const Category = lazy(() => import('containers/Category/Category'));
const Orders = lazy(() => import('containers/Orders/Orders'));
const Settings = lazy(() => import('containers/Settings/Settings'));
const SiteSettingForm = lazy(() =>
    import('containers/SiteSettingForm/SiteSettingForm')
);
const StaffMembers = lazy(() => import('containers/StaffMembers/StaffMembers'));
const Customers = lazy(() => import('containers/Customers/Customers'));
const Coupons = lazy(() => import('containers/Coupons/Coupons'));
const Login = lazy(() => import('containers/Login/Login'));
const NotFound = lazy(() => import('containers/NotFound/NotFound'));
const Register = lazy(() => import('containers/Register/Register'));

/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 */

function PrivateRoute({children, ...rest}) {
    const dispatch = useDispatch();
    const {isAuthenticated} = useContext(AuthContext);
    const token = localStorage.getItem('tenantId');
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken(true).then((idToken) => {
                    dispatch(saveIdToken(idToken));
                })
            }
            localStorage.setItem('refreshToken', user.refreshToken);
        })
    }, [dispatch])

    return (
        <Route
            {...rest}
            render={({location}) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location},
                        }}
                    />
                )
            }
        />
    );
}

const Routes = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken(true).then((idToken) => {
                    dispatch(saveIdToken(idToken));
                })
            }
            localStorage.setItem('refreshToken', user.refreshToken);
        })
    }, [dispatch])
    return (
        <AuthProvider>
            <Suspense fallback={<InLineLoader/>}>
                <Switch>
                    <PrivateRoute exact={true} path={DASHBOARD}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader/>}>
                                <Dashboard/>
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={PRODUCTS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader/>}>
                                <Products/>
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={CATEGORY}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader/>}>
                                <Category/>
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={ORDERS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader/>}>
                                <Orders/>
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={CUSTOMERS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader/>}>
                                <Customers/>
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={COUPONS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader/>}>
                                <Coupons/>
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={SETTINGS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader/>}>
                                <Settings/>
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={STAFF_MEMBERS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader/>}>
                                <StaffMembers/>
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={SITE_SETTINGS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader/>}>
                                <SiteSettingForm/>
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <Route path={LOGIN}>
                        <Login/>
                    </Route>
                    <Route path={REGISTER}>
                        <Register/>
                    </Route>
                    <Route component={NotFound}/>
                </Switch>
            </Suspense>
        </AuthProvider>
    );
};

export default Routes;
