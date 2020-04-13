import React, { useContext } from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import TipsFeed from "containers/Information/TipsFeed";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";
import { openModal } from "@redq/reuse-modal";
import AuthenticationForm from "containers/SignInOutForm/Form";
import { useRouter } from "next/router";

import styled from "styled-components";

const SubmitTipButton = styled.div`
  padding: 10px;
  position: fixed;
  bottom: 10px;
  z-index: 1000;
  right: 10px;
`;

function HomePage({ deviceType }) {
  const router = useRouter();
  const targetRef = React.useRef(null);

  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);

  const onClickSubmitTip = () => {
    if (isAuthenticated) {
      router.push({
        pathname: "/addtip",
      });
    } else {
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
    }
  };

  return (
    <>
      <Head>
        <title>Health Tips - Urban Nuskha</title>
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div ref={targetRef}>
                  <TipsFeed deviceType={deviceType} />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <TipsFeed deviceType={deviceType} />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
      {/* <SubmitTipButton onClick={onClickSubmitTip}>
        <img src="https://img.icons8.com/cotton/64/000000/add--v2.png" />
      </SubmitTipButton> */}
    </>
  );
}

export default withApollo(HomePage);
