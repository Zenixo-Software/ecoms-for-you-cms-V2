import { styled } from "baseui";

export const Wrapper = styled("div", ({ $theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // @ts-ignore
  backgroundColor: $theme.colors.borderF1,

  "@media only screen and (max-width: 520px)": {
    backgroundColor: "#fff"
  }
}));

export const FormWrapper = styled("div", () => ({
  width: "470px",
  borderRadius: "3px",
  backgroundColor: "#ffffff",
  padding: "50px",
  display: "flex",
  flexDirection: "column",

  "@media only screen and (max-width: 500px)": {
    width: "100%",
    padding: "30px"
  }
}));

export const Title = styled("h3", ({ $theme }) => ({
  // @ts-ignore
  ...$theme.typography.font250,
  marginTop: "0",
  marginBottom: "0",
  // @ts-ignore
  color: $theme.colors.tabColor,
  textAlign: "center"
}));


export const LogoWrapper = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px"
}));

export const LogoImage = styled("img", () => ({
  display: "block",
  backfaceVisibility: "hidden",
  maxWidth: "150px"
}));
