import React, {useCallback, useState} from 'react';
import {useDrawerDispatch, useDrawerState} from "../../context/DrawerContext";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useFormik} from "formik";
import {ButtonGroup, DrawerTitle, DrawerTitleWrapper, FieldDetails, Form} from "../DrawerItems/DrawerItems.style";
import {Col, Row} from "../../components/FlexBox/FlexBox";
import DrawerBox from "../../components/DrawerBox/DrawerBox";
import Uploader from "../../components/Uploader/Uploader";
import {FormFields, FormLabel} from "../../components/FormFields/FormFields";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Button, {KIND} from "../../components/Button/Button";
import {Spinner} from "baseui/spinner";
import {fireAlertMessage} from "../../util/error/errorMessage"
import {editCategoryCallerAction} from '../../redux/categoryRedux/categoryActions'
import {Scrollbars} from 'react-custom-scrollbars';

const dataObj = {
    id:'',
    title: '',
    icon: '',
    type: '',
    children: [],
}

function CategoryEditForm(props) {
    const data = useDrawerState('data');
    const dispatchWindow = useDrawerDispatch();
    const dispatch = useDispatch()
    const closeDrawer = useCallback(() => dispatchWindow({type: 'CLOSE_DRAWER'}), [
        dispatchWindow,
    ]);
    const {register, setValue} = useForm();
    //------------------------------------------------------------------
    // Create custom shop type for get category response
    const shopType= [];
    shopType.push({title:data.type})
    const [category, setCategory] = useState(shopType);
    //--------------------------------------------------------------------
    const [subCategory, setSubCategory] = useState(data.children);
    const [catIcon, setCatIcon] = useState(data.icon)
    const loading = useSelector((state: any) => state.categoryReducer.loading);

    // For shop type
    const shopTypes = [];
    shopTypes.push(localStorage.getItem('shopType'))
    const options = [];
    for (let i = 0; i < shopTypes.length; i++) {
        options.push({name: shopTypes[i]});
    }


    const handleChange = ({value}) => {
        console.log(value)
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

        dataObj.id = data.id
        dataObj.title = values.title;
        dataObj.icon = catIcon;
        dataObj.type = localStorage.getItem('shopType').toLowerCase();
        const subCat = [];
        for (let i = 0; i < subCategory.length; i++) {
            subCat.push({title: subCategory[i].title, type: localStorage.getItem('shopType').toLowerCase()});
        }
        dataObj.children = subCat;
        dispatch(editCategoryCallerAction(dataObj, closeDrawer))

    }

    const formik = useFormik({
        initialValues: {
            title: data.title,
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
                <DrawerTitle>Update Category</DrawerTitle>
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
                                <Uploader imageURL={data.icon} onChange={handleUploader}/>
                            </DrawerBox>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={4}>
                            <FieldDetails>
                                Add your category description and necessary information's from
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
                                        labelKey="title"
                                        valueKey="title"
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
                                        labelKey="title"
                                        valueKey="title"
                                        placeholder="Ex: Choose parent category"
                                        value={category}
                                        disabled
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
                            <div> Edit Category </div>
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
}

export default CategoryEditForm;