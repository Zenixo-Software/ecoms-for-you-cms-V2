import React from 'react';
import {useHistory} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Error, FormFields, FormLabel, FormTitle,} from 'components/FormFields/FormFields';
import {FormWrapper, LogoImage, LogoWrapper, Title, Wrapper} from './Login.style';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
// @ts-ignore
import mainLogo from '../../../src/assets/image/logos/mainLogo.svg'
import {useDispatch} from "react-redux";
// @ts-ignore
import {loginCallerActionCaller} from '../../redux/authRedux/authActions'

const initialValues = {
    email: '',
    password: '',
};

const getLoginValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string().required('Username is Required!'),
        password: Yup.string().required('Password is Required!'),
    });
};

const MyInput = ({field, form, ...props}) => {
    return <Input {...field} {...props} />;
};

export default function Login() {
    const dispatch = useDispatch()
    let history = useHistory();

    const isValidToken = () => {
        const token = localStorage.getItem('tenantId');
        // JWT decode & check token validity & expiration.
        return !!token;

    };
    const [isAuthenticated, makeAuthenticated] = React.useState();
    // let location = useLocation();
    // const {authenticate, isAuthenticated} = useContext(AuthContext);
    // if (isAuthenticated) return <Redirect to={{pathname: '/'}}/>;

    // let {from} = (location.state as any) || {from: {pathname: '/'}};
    let login = ({email, password}) => {
        initialValues.email = email;
        initialValues.password = password;
        dispatch(loginCallerActionCaller(initialValues, history, makeAuthenticated))
        // authenticate({email, password}, () => {
        //     history.replace(from);
        // });
    };
    return (
        <Wrapper>
            <FormWrapper>
                <Formik
                    initialValues={initialValues}
                    onSubmit={login}
                    render={({errors, status, touched, isSubmitting}) => (
                        <Form>
                            <FormFields>
                                <LogoWrapper>
                                    <LogoImage src={mainLogo} alt="Ecoms For You"/>
                                </LogoWrapper>
                                <FormTitle>Log in to admin</FormTitle>
                            </FormFields>

                            <FormFields>
                                <FormLabel>Username</FormLabel>
                                <Field
                                    type="email"
                                    name="email"
                                    component={MyInput}
                                    placeholder="Ex: demo@demo.com"
                                />
                                {errors.email && touched.email && (
                                    <Error>{errors.email}</Error>
                                )}
                            </FormFields>
                            <FormFields>
                                <FormLabel>Password</FormLabel>
                                <Field
                                    type="password"
                                    name="password"
                                    component={MyInput}
                                    placeholder="Ex: demo"
                                />
                                {errors.password && touched.password && (
                                    <Error>{errors.password}</Error>
                                )}
                            </FormFields>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                overrides={{
                                    BaseButton: {
                                        style: ({$theme}) => ({
                                            width: '100%',
                                            marginLeft: 'auto',
                                            borderTopLeftRadius: '3px',
                                            borderTopRightRadius: '3px',
                                            borderBottomLeftRadius: '3px',
                                            borderBottomRightRadius: '3px',
                                        }),
                                    },
                                }}
                            >
                                Submit
                            </Button>
                            <div style={{marginTop: 15}}>
                                <Title>New on our platform? <span
                                    style={{
                                        color: '#00bd87',
                                        cursor: 'pointer',
                                        width: 500
                                    }} onClick={() => history.push('/register')}>Create an account</span></Title>
                            </div>
                        </Form>
                    )}
                    validationSchema={getLoginValidationSchema}
                />
            </FormWrapper>
        </Wrapper>
    );
}
