import React, { useContext } from "react";
import { openModal } from "@redq/reuse-modal";
import Router from "next/router";
import { Scrollbars } from "react-custom-scrollbars";
import Drawer from "components/Drawer/Drawer";
import Button from "components/Button/Button";
import NavLink from "components/NavLink/NavLink";
import { CloseIcon } from "components/AllSvgIcon";
import { DrawerContext } from "contexts/drawer/drawer.context";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "../../SignInOutForm/Form";
import { FormattedMessage } from "react-intl";
import {
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UesrOptionMenu,
  VerifiedImage,
} from "./Header.style";

import {
  CREATORS_LANDING_PAGE,
  ABOUT_US_LANDING_PAGE,
} from "constants/navigation";

const verifiedIcon = require("image/icons/verified.png");

const DrawerMenuItems = [
  {
    id: 1,
    intlLabelId: "navLinkHome",
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    intlLabelId: "forWriters",
    label: "For Experts",
    href: CREATORS_LANDING_PAGE,
  },
  {
    id: 2,
    intlLabelId: "aboutUs",
    label: "About Us",
    href: ABOUT_US_LANDING_PAGE,
  },
];

const MobileDrawer: React.FunctionComponent = () => {
  const { state, dispatch } = useContext<any>(DrawerContext);
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);

  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: "TOGGLE",
    });
  }, [dispatch]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_imageUrl");
      localStorage.removeItem("user_is_expert");
      localStorage.removeItem("user_system_id");

      authDispatch({ type: "SIGN_OUT" });

      dispatch({
        type: "TOGGLE",
      });

      Router.push("/");
    }
  };
  const resetSearch = () => {
    dispatch({
      type: "RESET",
    });
  };

  const signInOutForm = () => {
    dispatch({
      type: "TOGGLE",
    });

    authDispatch({
      type: "SIGNIN_UN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  const onClickUserProfile = () => {
    Router.push("/profile", "/profile", { getInitialProps: true });

    dispatch({
      type: "TOGGLE",
    });
  };

  return (
    <Drawer
      width="80%"
      drawerHandler={
        <HamburgerIcon>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      }
      open={state.isOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <CloseIcon />
        </DrawerClose>
      }
    >
      <Scrollbars autoHide>
        <DrawerContentWrapper>
          <DrawerProfile>
            {isAuthenticated ? (
              <LoginView onClick={onClickUserProfile}>
                <UserAvatar>
                  <img
                    src={localStorage.getItem("user_imageUrl")}
                    alt="user_avatar"
                  />
                </UserAvatar>

                {localStorage.getItem("user_is_expert") === "true" && (
                  <VerifiedImage src={verifiedIcon}></VerifiedImage>
                )}
                <UserDetails>
                  <h3>{localStorage.getItem("user_name")}</h3>
                  <span>{localStorage.getItem("user_email")}</span>
                </UserDetails>
              </LoginView>
            ) : (
              <LogoutView>
                <Button
                  intlButtonId="mobileSignInButtonText"
                  title="Join In"
                  size="small"
                  className="sign_in"
                  onClick={signInOutForm}
                />
              </LogoutView>
            )}
          </DrawerProfile>

          <DrawerMenu>
            {DrawerMenuItems.map((item) => (
              <DrawerMenuItem key={item.id}>
                <NavLink
                  onClick={toggleHandler}
                  href={item.href}
                  label={item.label}
                  intlId={item.intlLabelId}
                  className="drawer_menu_item"
                />
              </DrawerMenuItem>
            ))}
          </DrawerMenu>

          {isAuthenticated && (
            <UesrOptionMenu>
              {/* <DrawerMenuItem>
                <NavLink
                  href="/profile"
                  label="Your Account Settings"
                  className="drawer_menu_item"
                  intlId="navlinkAccountSettings"
                />
              </DrawerMenuItem> */}
              <DrawerMenuItem>
                <div onClick={handleLogout} className="drawer_menu_item">
                  <span className="logoutBtn">
                    <FormattedMessage
                      id="navlinkLogout"
                      defaultMessage="Logout"
                    />
                  </span>
                </div>
              </DrawerMenuItem>
            </UesrOptionMenu>
          )}
        </DrawerContentWrapper>
      </Scrollbars>
    </Drawer>
  );
};

export default MobileDrawer;
