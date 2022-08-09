import React from 'react';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

type AuthProps = {
    isAuthenticated: boolean;
    authenticate: Function;
    signout: Function;
};

export const AuthContext = React.createContext({} as AuthProps);

const isValidToken = () => {
    const token = localStorage.getItem('tenantId');
    // JWT decode & check token validity & expiration.
    return !!token;

};

const AuthProvider = (props: any) => {
    let history = useHistory();
    const [isAuthenticated, makeAuthenticated] = React.useState(isValidToken());
    const isAuth = useSelector((state: any) => state.authReducer.isAuth);

    function authenticate({email, password}, cb) {
        console.log('authenticate')
        isAuth ? makeAuthenticated(true) : makeAuthenticated(false)
        setTimeout(cb, 100); // fake async
    }

    function signout(cb) {
        makeAuthenticated(false);
        localStorage.removeItem('tenantId');
        localStorage.removeItem('shopType');
        localStorage.removeItem('refreshToken');
        setTimeout(cb, 100);
        history.push('/login')
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                signout,
            }}
        >
            <>{props.children}</>
        </AuthContext.Provider>
    );
};

export default AuthProvider;
