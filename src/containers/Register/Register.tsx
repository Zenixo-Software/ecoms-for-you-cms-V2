import React, {useState} from 'react';
import {useFormik} from "formik";
import {fireAlertMessage} from "../../util/error/errorMessage"
import {FormFields, FormLabel, FormTitle,} from 'components/FormFields/FormFields';
import {Form, LogoImage, LogoWrapper, RegisterFormWrapper, Wrapper} from './Register.style';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
// @ts-ignore
import mainLogo from '../../../src/assets/image/logos/mainLogo.svg'
import Select from "../../components/Select/Select";
import {useDispatch} from "react-redux";
import {registerActionCaller} from '../../redux/authRedux/authActions'
import {useHistory} from "react-router-dom";

const dataObj = {
    storeName: '',
    domain: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    tpNumber: '',
    type: '',
};
const options = [
    {value: 'grocery', name: 'Grocery', id: '1'},
    {value: 'women-cloths', name: 'Women Cloths', id: '2'},
    {value: 'bags', name: 'Bags', id: '3'},
    {value: 'makeup', name: 'Makeup', id: '4'},
];


// const MyInput = ({field, form, ...props}) => {
//     return <Input {...field} {...props} />;
// };

export default function Register() {
    const dispatch = useDispatch()
    let history = useHistory();
    const [category, setCategory] = useState([]);

    const handleChange = ({value}) => {
        setCategory(value);
    };

    //Validation Part
    const validate = (values) => {
        if (!values.storeName) {
            fireAlertMessage("Store Name is Required!")
            return
        }
        if (!values.domain) {
            fireAlertMessage("Domain is Required!")
            return
        }
        if (!values.password) {
            fireAlertMessage("Password is Required!")
            return
        }
        if (!values.firstName) {
            fireAlertMessage("First Name is Required!")
            return
        }
        if (!values.lastName) {
            fireAlertMessage("Last Name is Required!")
            return
        }
        if (!values.email) {
            fireAlertMessage("Email is Required!")
            return
        }
        if (!values.tpNumber) {
            fireAlertMessage("Telephone Number is Required!")
            return
        }
        if (category.length === 0) {
            fireAlertMessage("Shop Type is Required!")
            return
        }

        dataObj.storeName = values.storeName;
        dataObj.domain = values.domain;
        dataObj.password = values.password;
        dataObj.firstName = values.firstName;
        dataObj.lastName = values.lastName;
        dataObj.email = values.email;
        dataObj.tpNumber = values.tpNumber;
        dataObj.type = category[0].name;
        // @ts-ignore
        dispatch(registerActionCaller(dataObj, history))

    }

    const formik = useFormik({
        initialValues: {
            storeName: "",
            domain: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            tpNumber: "",
            shopType: "",
        },
        onSubmit: (values) => {
            const loading = false
            if (!loading) validate(values)
        }
    })


    return (
        <Wrapper>
            <RegisterFormWrapper>
                <Form onSubmit={formik.handleSubmit}>
                    <FormFields>
                        <LogoWrapper>
                            <LogoImage src={mainLogo} alt="Ecoms For You"/>
                        </LogoWrapper>
                        <FormTitle>Adventure starts here </FormTitle>
                    </FormFields>

                    <FormFields>
                        <FormLabel>Store Name</FormLabel>
                        <Input
                            type="text"
                            name="storeName"
                            placeholder="My Store"
                            onChange={formik.handleChange}
                            value={formik.values.storeName}
                        />
                    </FormFields>
                    <FormFields>
                        <FormLabel>Domain</FormLabel>
                        <Input
                            type="text"
                            name="domain"
                            placeholder="mydomain.ecoms.store"
                            onChange={formik.handleChange}
                            value={formik.values.domain}
                        />
                    </FormFields>
                    <FormFields>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            type="text"
                            name="firstName"
                            placeholder="Jhone"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                    </FormFields>
                    <FormFields>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            type="text"
                            name="lastName"
                            placeholder="Dhone"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                    </FormFields>
                    <FormFields>
                        <FormLabel>Telephone Number</FormLabel>
                        <Input
                            type="text"
                            name="tpNumber"
                            placeholder="071-4578265"
                            onChange={formik.handleChange}
                            value={formik.values.tpNumber}
                        />
                    </FormFields>
                    <FormFields>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            placeholder="your@gmail.com"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </FormFields>
                    <FormFields>
                        <FormLabel>Shop Type</FormLabel>
                        <Select
                            options={options}
                            labelKey="name"
                            valueKey="value"
                            placeholder="This is your shop type, Choose right one!"
                            value={category}
                            searchable={false}
                            onChange={handleChange}
                            overrides={{
                                Placeholder: {
                                    style: ({$theme}) => {
                                        return {
                                            ...$theme.typography.fontBold14,
                                            color: $theme.colors.textNormal,
                                        };
                                    },
                                },
                                DropdownListItem: {
                                    style: ({$theme}) => {
                                        return {
                                            ...$theme.typography.fontBold14,
                                            color: $theme.colors.textNormal,
                                        };
                                    },
                                },
                                OptionContent: {
                                    style: ({$theme, $selected}) => {
                                        return {
                                            ...$theme.typography.fontBold14,
                                            color: $selected
                                                ? $theme.colors.textDark
                                                : $theme.colors.textNormal,
                                        };
                                    },
                                },
                                SingleValue: {
                                    style: ({$theme}) => {
                                        return {
                                            ...$theme.typography.fontBold14,
                                            color: $theme.colors.textNormal,
                                        };
                                    },
                                },
                                Popover: {
                                    props: {
                                        overrides: {
                                            Body: {
                                                style: {zIndex: 5},
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </FormFields>
                    <FormFields>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            placeholder="******"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />

                    </FormFields>
                    <Button
                        type="submit"
                        overrides={{
                            BaseButton: {
                                style: () => ({
                                    width: '100%',
                                    marginLeft: 'auto',
                                    borderTopLeftRadius: '3px',
                                    borderTopRightRadius: '3px',
                                    borderBottomLeftRadius: '3px',
                                    borderBottomRightRadius: '3px',
                                    marginTop: "40px"
                                }),
                            },
                        }}
                    >
                        Register
                    </Button>
                </Form>
            </RegisterFormWrapper>
        </Wrapper>
    );
}
