import { styled } from "baseui";

export const PageTitle = styled("div", ({ $theme }) => ({
  minHeight: "286px",
  backgroundColor: $theme.colors.backgroundSecondary,
  borderBottom: `1px solid ${$theme.colors.backgroundTertiary}`,
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "column",
  padding: `${$theme.sizing.scale1000} 0`,
  "@media only screen and (max-width: 991px)": {
    padding: `${$theme.sizing.scale900} 0`,
    minHeight: "200px",
  },
}));

export const InfoBar = styled("div", ({ $theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  marginTop: $theme.sizing.scale800,
  marginBottom: `-${$theme.sizing.scale100}`,
  "@media only screen and (max-width: 667px)": {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: $theme.sizing.scale400,
  },
}));

export const UserAvatar = styled("img", {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  "@media only screen and (max-width: 991px)": {
    width: "96px",
    height: "96px",
  },
  "@media only screen and (max-width: 480px)": {
    width: "75px",
    height: "75px",
  },
});

export const CoachAvatar = styled("img", {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
  "@media only screen and (max-width: 991px)": {
    width: "150px",
    height: "150px",
  },
  "@media only screen and (max-width: 480px)": {
    width: "150px",
    height: "150px",
  },
});

export const CoachAvatarSmall = styled("img", {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  objectFit: "cover",
  "@media only screen and (max-width: 991px)": {
    width: "30px",
    height: "30px",
  },
  "@media only screen and (max-width: 480px)": {
    width: "30px",
    height: "30px",
  },
});

export const UserName = styled("h3", ({ $theme }) => ({
  ...$theme.typography.font450,
  color: $theme.colors.primaryA,
  marginBottom: $theme.sizing.scale200,
  "@media only screen and (max-width: 991px)": {
    marginBottom: $theme.sizing.scale100,
  },
}));

export const UserRole = styled("p", ({ $theme }) => ({
  ...$theme.typography.font200,
  color: $theme.colors.contentSecondary,
  textTransform: "capitalize",
}));

export const Menu = styled("ul", ({ $theme }) => ({
  display: "flex",
  "@media only screen and (max-width: 991px)": {
    marginTop: $theme.sizing.scale700,
  },
}));

export const MenuList = styled("li", (props: any) => ({
  listStyle: "none",
  marginLeft: props.$theme.sizing.scale800,
  marginRight: props.$theme.sizing.scale800,
  cursor: "pointer",
  color: props.$theme.colors.contentSecondary,
  ...props.$theme.typography.font200,
  transition: "all 0.3s ease",
  ":first-child": {
    marginLeft: 0,
  },
  ":last-child": {
    marginRight: 0,
  },
  ":hover": {
    color: props.$theme.colors.primaryA,
  },
}));

export const Strong = styled("strong", ({ $theme }) => ({
  color: $theme.colors.primary,
}));
