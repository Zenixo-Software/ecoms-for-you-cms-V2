import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDrawerDispatch} from 'context/DrawerContext';
import {Scrollbars} from 'react-custom-scrollbars';
import Uploader from 'components/Uploader/Uploader';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import Button, {KIND} from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import {Col, Row} from 'components/FlexBox/FlexBox';
import {fireAlertMessage} from "../../util/error/errorMessage"
import {ButtonGroup, DrawerTitle, DrawerTitleWrapper, FieldDetails, Form,} from '../DrawerItems/DrawerItems.style';
import {FormFields, FormLabel} from 'components/FormFields/FormFields';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {categoryCallerAction} from '../../redux/categoryRedux/categoryActions'
import {Spinner} from "baseui/spinner";

// const options = [
//     {value: 'grocery', name: 'Grocery', id: '1'},
//     {value: 'women-cloths', name: 'Women Cloths', id: '2'},
//     {value: 'bags', name: 'Bags', id: '3'},
//     {value: 'makeup', name: 'Makeup', id: '4'},
// ];
type Props = any;

const dataObj = {
    title: '',
    icon: '',
    type: '',
    children: [],
}


const AddCategory: React.FC<Props> = () => {
    const dispatchWindow = useDrawerDispatch();
    const dispatch = useDispatch()
    const closeDrawer = useCallback(() => dispatchWindow({type: 'CLOSE_DRAWER'}), [
        dispatchWindow,
    ]);
    const {register, setValue} = useForm();
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [catIcon, setCatIcon] = useState()
    const loading = useSelector((state: any) => state.categoryReducer.loading);
    const shopTypes = [];
    shopTypes.push(localStorage.getItem('shopType'))
    const options = [];
    for (let i = 0; i < shopTypes.length; i++) {
        options.push({name: shopTypes[i]});
    }

    const handleChange = ({value}) => {
        setValue('parent', value);
        setCategory(value);
    };
    const handleSubCategoryChange = ({value}) => {
        setSubCategory(value);
    };
    const handleUploader = (files) => {
        setValue('image', files[0].path);
        setCatIcon(files[0])
    };

    //Validation Part
    const validate = (values) => {
        if (!values.title) {
            fireAlertMessage("Category Title is required")
            return
        }
        if (!catIcon) {
            fireAlertMessage("Category Image is required")
            return
        }
        if (subCategory.length === 0) {
            fireAlertMessage("Category's is required")
            return
        }
        if (category.length === 0) {
            fireAlertMessage("Type field is required")
            return
        }

        dataObj.title = values.title;
        dataObj.icon = catIcon;
        dataObj.type = localStorage.getItem('shopType').toLowerCase();
        const subCat = [];
        for (let i = 0; i < subCategory.length; i++) {
            subCat.push({title: subCategory[i].name, type: localStorage.getItem('shopType').toLowerCase(),id:i});
        }
        dataObj.children = subCat;
        dispatch(categoryCallerAction(dataObj, closeDrawer))

    }

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        onSubmit: (values) => {
            const loading = false
            if (!loading) validate(values)
        }
    })

    // @ts-ignore
    return (
        <>
            <DrawerTitleWrapper>
                <DrawerTitle>Add Category</DrawerTitle>
            </DrawerTitleWrapper>

            <Form onSubmit={formik.handleSubmit} style={{height: '100%'}}>
                <Scrollbars
                    autoHide
                    renderView={(props) => (
                        <div {...props} style={{...props.style, overflowX: 'hidden'}}/>
                    )}
                    renderTrackHorizontal={(props) => (
                        <div
                            {...props}
                            style={{display: 'none'}}
                            className="track-horizontal"
                        />
                    )}
                >
                    <Row>
                        <Col lg={4}>
                            <FieldDetails>Upload your Category image here</FieldDetails>
                        </Col>
                        <Col lg={8}>
                            <DrawerBox
                                overrides={{
                                    Block: {
                                        style: {
                                            width: '100%',
                                            height: 'auto',
                                            padding: '30px',
                                            borderRadius: '3px',
                                            backgroundColor: '#ffffff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        },
                                    },
                                }}
                            >
                                <Uploader onChange={handleUploader}/>
                            </DrawerBox>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={4}>
                            <FieldDetails>
                                Add your category description and necessary informations from
                                here
                            </FieldDetails>
                        </Col>

                        <Col lg={8}>
                            <DrawerBox>
                                <FormFields>
                                    <FormLabel>Category Title</FormLabel>
                                    <Input
                                        inputRef={register({required: true, maxLength: 20})}
                                        name="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                    />
                                </FormFields>

                                <FormFields>
                                    <FormLabel>Category's</FormLabel>
                                    <Select
                                        creatable
                                        multi
                                        labelKey="name"
                                        valueKey="value"
                                        placeholder="Ex: Type your category name (fruits,vegetables)"
                                        value={subCategory}
                                        onChange={handleSubCategoryChange}
                                        overrides={{
                                            Placeholder: {
                                                style: ({$theme}) => {
                                                    return {
                                                        ...$theme.typography.fontBold14,
                                                        color: $theme.colors.textNormal,
                                                    };
                                                },
                                            }
                                        }}
                                    />
                                </FormFields>

                                <FormFields>
                                    <FormLabel>Parent</FormLabel>
                                    <Select
                                        options={options}
                                        labelKey="name"
                                        valueKey="value"
                                        placeholder="Ex: Choose parent category"
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
                            </DrawerBox>
                        </Col>
                    </Row>
                </Scrollbars>

                <ButtonGroup>
                    <Button
                        kind={KIND.minimal}
                        onClick={closeDrawer}
                        overrides={{
                            BaseButton: {
                                style: ({$theme}) => ({
                                    width: '50%',
                                    borderTopLeftRadius: '3px',
                                    borderTopRightRadius: '3px',
                                    borderBottomRightRadius: '3px',
                                    borderBottomLeftRadius: '3px',
                                    marginRight: '15px',
                                    color: $theme.colors.red400,
                                }),
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        overrides={{
                            BaseButton: {
                                style: () => ({
                                    width: '50%',
                                    borderTopLeftRadius: '3px',
                                    borderTopRightRadius: '3px',
                                    borderBottomRightRadius: '3px',
                                    borderBottomLeftRadius: '3px',
                                }),
                            },
                        }}
                    >
                        {!loading ? (
                            <div> Create Category </div>
                        ) : (
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div style={{marginTop: 4}}>
                                    Loading...!
                                </div>
                                <div style={{marginLeft: 8}}>
                                    {/*@ts-ignore*/}
                                    <Spinner color='#ffffff' size={25} title='Loading...!'/>
                                </div>
                            </div>
                        )}
                    </Button>
                </ButtonGroup>
            </Form>
        </>
    );
};

export default AddCategory;
