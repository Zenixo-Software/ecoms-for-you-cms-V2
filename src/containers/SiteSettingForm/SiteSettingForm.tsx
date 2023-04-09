import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosInstance from "../../util/function/axiosInstance";
import Uploader from "components/Uploader/Uploader";
import Input from "components/Input/Input";
import { Textarea } from "components/Textarea/Textarea";
import Select from "components/Select/Select";
import Button from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Grid, Row, Col } from "components/FlexBox/FlexBox";
import { Form, FieldDetails } from "../DrawerItems/DrawerItems.style";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import {
  fireAlertMessage,
  fireAlertRegister,
} from "../../util/error/errorMessage";

const options = [
  { value: "active", label: "Active" },
  { value: "maintenance", label: "Maintenance" },
  { value: "turn-off", label: "Down" },
];
type Props = {};
const SiteSettingsForm: React.FC<Props> = () => {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("siteName", data.site_name);
    formData.append("siteDescription", description);
    formData.append(
      "siteStatus",
      data.reactSelect.map((item) => item.label)
    );
    formData.append("siteLogo", data.siteLogo);
    formData.append("mainBanner", data.mainBanner);
    formData.append("siteTitle", data.site_title);
    const cmsUserId = localStorage.getItem("cmsUserId");
    if (typeof cmsUserId === "string") {
      formData.append("cmsUserId", cmsUserId);
    }
    console.log(formData);
    axiosInstance
      .post("/site-settings", formData)
      .then((response) => {
        fireAlertRegister("Your New Site Settings Is Update!");
        console.log("Success:", response);
      })
      .catch((error) => {
        fireAlertMessage("Something went wrong!");
        console.error("Error:", error);
      });
  };
  const [category, setCategory] = useState([]);
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const handleMultiChange = ({ value }) => {
    setValue("reactSelect", value);
    setCategory(value);
  };
  const siteLogoHandleUploader = (files) => {
    setValue("siteLogo", files[0]);
  };
  const bannerLogoHandleUploader = (files) => {
    setValue("mainBanner", files[0]);
  };
  React.useEffect(() => {
    register({ name: "reactSelect" });
    register({ name: "reactDropzone" });
    register({ name: "siteLogo" });
    register({ name: "mainBanner" });
  }, [register]);
  return (
    <Grid fluid={true}>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: 0 }}>
        <Row>
          <Col md={4}>
            <FieldDetails>Upload your site logo here</FieldDetails>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <Uploader onChange={siteLogoHandleUploader} />
            </DrawerBox>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FieldDetails>Upload your site banner here</FieldDetails>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <Uploader onChange={bannerLogoHandleUploader} />
            </DrawerBox>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <FieldDetails>
              Add your site description and necessary information from here
            </FieldDetails>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <FormFields>
                <FormLabel>Site Name</FormLabel>
                <Input
                  name="site_name"
                  inputRef={register({ required: true, maxLength: 20 })}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Site Title</FormLabel>
                <Input
                  name="site_title"
                  inputRef={register({ required: true, maxLength: 20 })}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Site Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Status</FormLabel>
                <Select
                  options={options}
                  labelKey="label"
                  valueKey="value"
                  placeholder="Choose current status"
                  value={category}
                  searchable={false}
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
                <Button
                  type="submit"
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        width: "50%",
                        marginLeft: "auto",
                        borderTopLeftRadius: "3px",
                        borderTopRightRadius: "3px",
                        borderBottomLeftRadius: "3px",
                        borderBottomRightRadius: "3px",
                      }),
                    },
                  }}
                >
                  Submit
                </Button>
              </FormFields>
            </DrawerBox>
          </Col>
        </Row>
      </Form>
    </Grid>
  );
};

export default SiteSettingsForm;
