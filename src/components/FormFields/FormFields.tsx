import React from "react";
import { Block } from "baseui/block";
import { styled } from "baseui";

const Title = styled("h3", ({ $theme }) => ({
  // @ts-ignore
  ...$theme.typography.font18,
  marginTop: "0",
  marginBottom: "0",
  // @ts-ignore
  color: $theme.colors.textDark,
  textAlign: "center"
}));

const Label = styled("label", ({ $theme }) => ({
  // @ts-ignore
  ...$theme.typography.fontBold14,
  marginBottom: "10px",
  // @ts-ignore
  color: $theme.colors.textDark
}));

const Msg = styled("span", ({ $theme }) => ({
  // @ts-ignore
  ...$theme.typography.fontBold12,
  // @ts-ignore
  color: $theme.colors.red400,
  marginTop: "5px",
  marginLeft: "auto"
}));

export const FormFields = ({ children }) => {
  return (
    <Block
      overrides={{
        Block: {
          style: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            margin: "20px 0",

            ":first-child": {
              marginTop: 0
            },

            ":last-child": {
              marginBottom: 0
            },

            ":only-child": {
              margin: 0
            }
          }
        }
      }}
    >
      {children}
    </Block>
  );
};

export const FormLabel = ({ children }) => {
  return <Label>{children}</Label>;
};

export const FormTitle = ({ children }) => {
  return <Title>{children}</Title>;
};

export const Error = ({ children }) => {
  return <Msg>{children}</Msg>;
};
