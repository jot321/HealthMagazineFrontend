import styled from "styled-components";

export const PageTitle = styled.div`
    minHeight: "286px",
    backgroundColor: $theme.colors.backgroundSecondary,
    borderBottom: "1px solid black",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    padding: "40px 0",

    "@media only screen and (max-width: 991px)": {
      padding: "32px 0",
      minHeight: "200px",
    },
`;

export const InfoBar = styled.div`
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  marginTop: 24px,
  marginBottom: 4px,
  
  "@media only screen and (max-width: 667px)": {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10px,
  },
`;

export const UserAvatar = styled.img`
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
`;
