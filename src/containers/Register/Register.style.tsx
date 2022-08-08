import { styled } from "baseui";

export const Wrapper = styled("div", ({ $theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // @ts-ignore
  backgroundColor: $theme.colors.borderF1,
  overflowX:"hidden",

  "@media only screen and (max-width: 520px)": {
    backgroundColor: "#fff"
  }
}));

export const Form = styled("form", ({ $theme }) => ({
  // minHeight: '100vh',
  // @ts-ignore
  backgroundColor: "#ffffff",
  paddingBottom: "100px"
}));

export const RegisterFormWrapper = styled("div", () => ({
  width: "500px",
  borderRadius: "3px",
  backgroundColor: "#ffffff",
  padding: "20px",
  display: "flex",
  flexDirection: "column",

  "@media only screen and (max-width: 500px)": {
    width: "100%",
    padding: "30px"
  }
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
