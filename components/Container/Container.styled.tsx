import { styled } from "baseui";

export const ContainerArea = styled("div", {
  width: "100%",
  maxWidth: "1070px",
  paddingLeft: "5px",
  paddingRight: "5px",
  margin: "0 auto",
  position: "relative",
  zIndex: 1,

  "@media screen and (max-width: 1200px)": {
    maxWidth: "970px",
  },
});

export const CoachPageMobileOnlyContainer = styled("div", {
  width: "100%",
  maxWidth: "500px",
});
