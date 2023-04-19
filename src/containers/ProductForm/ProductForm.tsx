import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../util/function/axiosInstance";
import { Scrollbars } from "react-custom-scrollbars";
import Uploader from "components/Uploader/Uploader";
import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import Input from "components/Input/Input";
import { Textarea } from "components/Textarea/Textarea";
import Select from "components/Select/Select";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import {
  fireAlertMessage,
  fireAlertRegister,
} from "../../util/error/errorMessage";
import { Spinner } from "baseui/spinner";
import { addProductAction } from "../../redux/productRedux/productActions";

import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

const options = [
  { value: "Fruits & Vegetables", name: "Fruits & Vegetables", id: "1" },
  { value: "Meat & Fish", name: "Meat & Fish", id: "2" },
  { value: "Purse", name: "Purse", id: "3" },
  { value: "Hand bags", name: "Hand bags", id: "4" },
  { value: "Shoulder bags", name: "Shoulder bags", id: "5" },
  { value: "Wallet", name: "Wallet", id: "6" },
  { value: "Laptop bags", name: "Laptop bags", id: "7" },
  { value: "Women Dress", name: "Women Dress", id: "8" },
  { value: "Outer Wear", name: "Outer Wear", id: "9" },
  { value: "Pants", name: "Pants", id: "10" },
];

const typeOptions = [
  { value: "grocery", name: "Grocery", id: "1" },
  { value: "women-cloths", name: "Women Cloths", id: "2" },
  { value: "bags", name: "Bags", id: "3" },
  { value: "makeup", name: "Makeup", id: "4" },
];
type Props = any;

const AddProduct: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const closeDrawer = useCallback(
    () => dispatch({ type: "CLOSE_DRAWER" }),
    [dispatch]
  );
  const { register, setValue } = useForm();
  const [type, setType] = useState([]);
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState();

  React.useEffect(() => {
    axiosInstance
      .get(`category/${localStorage.getItem("cmsUserId")}`)
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, [register]);

  React.useEffect(() => {
    register({ name: "type" });
    register({ name: "categories" });
    register({ name: "image", required: true });
    register({ name: "description" });
  }, [register]);

  // Image State
  const [image, setImage] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();

  const [loading, setLoading] = useState(false);

  const handleMultiChange = ({ value }) => {
    setValue("categories", value);
    setTag(value);
  };

  const handleTypeChange = ({ value }) => {
    setValue("type", value);
    setType(value);
  };
  const handleUploaderMainImage = (files) => {
    setValue("image", files[0].path);
    setImage(files[0]);
  };
  const handleUploaderGallery01 = (files) => {
    setValue("image", files[0].path);
    setImage1(files[0]);
  };
  const handleUploaderGallery02 = (files) => {
    setValue("image", files[0].path);
    setImage2(files[0]);
  };
  //Validation Part
  const validate = (values) => {
    if (!values.name) {
      fireAlertMessage("Product Name field is required");
      return;
    }
    if (!values.description) {
      fireAlertMessage("Description field is required");
      return;
    }
    if (!values.price) {
      fireAlertMessage("Price field is required");
      return;
    }
    if (!values.unit) {
      fireAlertMessage("Unit field is required");
      return;
    }
    if (!values.unit) {
      fireAlertMessage("Unit field is required");
      return;
    }
    if (!values.quantity) {
      fireAlertMessage("Unit field is required");
      return;
    }

    if (tag.length === 0) {
      fireAlertMessage("Category is required");
      return;
    }
    if (type.length === 0) {
      fireAlertMessage("Types is required");
      return;
    }
    // dispatch
    // dispatch(addProductAction(mixObj(values)));

    setLoading(true);

    const data = mixObj(values);

    const formData = new FormData();
    formData.append("title", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("salePrice", data.salePrice);
    formData.append("unit", data.unit);
    formData.append("image", data.image);
    formData.append("image1", data.image1);
    formData.append("image2", data.image2);
    formData.append("discountInPercent", data.discountInPercent);
    const cmsUserId = localStorage.getItem("cmsUserId");
    if (cmsUserId !== null) {
      formData.append("tenentId", cmsUserId);
    }
    data.tag.forEach((e, index) => {
      formData.append(`categories[${index}]`, e.categoryId);
    });
    formData.append(
      "type",
      data.type.filter((item) => item.value)
    );

    axiosInstance
      .post("product", formData)
      .then((response) => {
        fireAlertRegister("Product Created...!😍");
        setLoading(false);
      })
      .catch((error) => {
        fireAlertMessage("There is an error with your prosess!");
        setLoading(false);
      });
  };

  const mixObj = (value) => {
    return {
      ...value,
      image,
      image1,
      image2,
      tag,
      type,
    };
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      unit: "",
      salePrice: "",
      discountInPercent: "",
      quantity: "",
    },
    onSubmit: (values) => {
      const loading = false;
      if (!loading) validate(values);
    },
  });
  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Product</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={formik.handleSubmit} style={{ height: "100%" }}>
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{ ...props.style, overflowX: "hidden" }} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: "none" }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Upload your Main Product image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: "100%",
                      height: "auto",
                      padding: "30px",
                      borderRadius: "3px",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                }}
              >
                <Uploader value onChange={handleUploaderMainImage} />
              </DrawerBox>
            </Col>
          </Row>
          {/*Upload Gallery Images*/}
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Upload your Product Gallery images here
              </FieldDetails>
            </Col>

            <Col lg={4}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: "100%",
                      height: "auto",
                      padding: "30px",
                      borderRadius: "3px",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                }}
              >
                <Uploader onChange={handleUploaderGallery01} />
              </DrawerBox>
            </Col>
            <Col lg={4}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: "100%",
                      height: "auto",
                      padding: "30px",
                      borderRadius: "3px",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                }}
              >
                <Uploader onChange={handleUploaderGallery02} />
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your Product description and necessary information from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input
                    type="text"
                    name="unit"
                    onChange={formik.handleChange}
                    value={formik.values.unit}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Sale Price</FormLabel>
                  <Input
                    type="number"
                    name="salePrice"
                    onChange={formik.handleChange}
                    value={formik.values.salePrice}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount In Percent</FormLabel>
                  <Input
                    type="number"
                    name="discountInPercent"
                    onChange={formik.handleChange}
                    value={formik.values.discountInPercent}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Product Quantity</FormLabel>
                  <Input
                    type="number"
                    name="quantity"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Select
                    options={typeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Type"
                    value={type}
                    searchable={false}
                    onChange={handleTypeChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      OptionContent: {
                        style: ({ $theme, $selected }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $selected
                              ? $theme.colors.textDark
                              : $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => {
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
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    options={category}
                    labelKey="title"
                    valueKey="categoryId"
                    placeholder="Product Tag"
                    value={tag}
                    onChange={handleMultiChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
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
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                    multi
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
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  marginRight: "15px",
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
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                }),
              },
            }}
          >
            {!loading ? (
              <div> Create Product </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ marginTop: 4 }}>Loading...!</div>
                <div style={{ marginLeft: 8 }}>
                  {/*@ts-ignore*/}
                  <Spinner color="#ffffff" size={25} title="Loading...!" />
                </div>
              </div>
            )}
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;
