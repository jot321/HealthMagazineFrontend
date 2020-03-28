import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import gql from "graphql-tag";
import { openModal, closeModal } from "@redq/reuse-modal";
import { TrainerCard } from "components/InformationCard/TrainerCard";
import HashLoader from "react-spinners/HashLoader";

import {
  ProductsRow,
  ProductsCol,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper
} from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";

import { Waypoint } from "react-waypoint";

const QuickView = dynamic(() => import("../QuickView/QuickView"));

const GET_PROFESSIONALS = gql`
  query {
    getProfessionals {
      messages
      hasMore
    }
  }
`;

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  loadMore?: boolean;
};

export const LiveSessionsInformation: React.FC<ProductsProps> = ({
  deviceType,
  loadMore = true
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);
  const targetRef = React.useRef(null);

  // Scroll the top of the content area any time we search or click a tag
  // React.useEffect(() => {
  //   if (router.query.sortByLikes === "true" || router.query.dailyPicks === "true") {
  //     if (targetRef.current) {
  //       window.scrollTo({
  //         top: targetRef.current.offsetTop - 110,
  //         behavior: "smooth"
  //       });
  //     }
  //   }
  // }, [router.query]);

  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------
  // -----------------------------------------------------------

  const trainersFeed = useQuery(GET_PROFESSIONALS);

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (trainersFeed.loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <HashLoader size={50} color={"#ea9085"} />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (trainersFeed.error) return <div>{trainersFeed.error.message}</div>;

  if (
    !trainersFeed.data ||
    !trainersFeed.data.getProfessionals ||
    trainersFeed.data.getProfessionals.length === 0
  ) {
    return <NoResultFound />;
  }

  const parsedTrainersFeed = JSON.parse(
    trainersFeed.data.getProfessionals.messages
  );

  // -----------------------------------------------------------
  // QUICK VIEW MODAL SECTION
  // -----------------------------------------------------------
  // const handleModalClose = () => {
  //   const href = `${router.pathname}`;
  //   const as = "/";
  //   router.push(href, as, { shallow: true });
  //   closeModal();
  // };

  // const handleQuickViewModal = React.useCallback(
  //   (modalProps: any, deviceType: any, onModalClose: any) => {
  //     if (router.pathname === "/product/[slug]") {
  //       const as = `/product/${modalProps.slug}`;
  //       router.push(router.pathname, as);
  //       return;
  //     }
  //     openModal({
  //       show: true,
  //       overlayClassName: "quick-view-overlay",
  //       closeOnClickOutside: false,
  //       component: QuickView,
  //       componentProps: { modalProps, deviceType, onModalClose },
  //       closeComponent: "div",
  //       config: {
  //         enableResizing: false,
  //         disableDragging: true,
  //         className: "quick-view-modal",
  //         width: 900,
  //         y: 30,
  //         height: "auto",
  //         transition: {
  //           mass: 1,
  //           tension: 0,
  //           friction: 0
  //         }
  //       }
  //     });
  //     const href = `${router.pathname}?${modalProps.slug}`;
  //     const as = `/product/${modalProps.slug}`;
  //     router.push(href, as, { shallow: true });
  //   },
  //   []
  // );

  // -----------------------------------------------------------
  // LOAD MORE SECTION
  // -----------------------------------------------------------
  //   const handleLoadMore = () => {
  //     toggleLoading(true);
  //     homeFeed.fetchMore({
  //       variables: {
  //         offset: Number(homeFeed.data.getHomeFeed.messages.length),
  //         fetchLimit: 6
  //       },
  //       updateQuery: (prev: any, { fetchMoreResult }) => {
  //         toggleLoading(false);
  //         if (!fetchMoreResult) {
  //           return prev;
  //         }
  //         return {
  //           getHomeFeed: {
  //             __typename: prev.getHomeFeed.__typename,
  //             messages: [
  //               ...prev.getHomeFeed.messages,
  //               ...fetchMoreResult.getHomeFeed.messages
  //             ],
  //             hasMore: fetchMoreResult.getHomeFeed.hasMore
  //           }
  //         };
  //       }
  //     });
  //   };

  return (
    <>
      <div ref={targetRef}>
        <ProductsRow>
          {parsedTrainersFeed.map((element: any, index: number) => {
            return (
              <ProductsCol key={index}>
                <ProductCardWrapper>
                  <Fade
                    duration={800}
                    delay={index * 10}
                    style={{ height: "100%" }}
                  >
                    <TrainerCard
                      deviceType={deviceType}
                      name={element.name}
                      byline={element.description}
                      experience={element.experience}
                      timings={element.timings}
                      categories={element.categories}                      
                      courses={element.courses}
                      imageUrl={element.image}
                      facebookLink={element.facebookLink}
                      instagramLink={element.instagramLink}
                    />
                  </Fade>
                </ProductCardWrapper>
              </ProductsCol>
            );
          })}
        </ProductsRow>
      </div>

      {/* {loadMore && homeFeed.data.getHomeFeed.hasMore && <Waypoint onEnter={handleLoadMore} />}
      {loadingMore && (
        <LoaderWrapper>
          <LoaderItem>
            <HashLoader size={50} color={"#ea9085"} />
          </LoaderItem>
        </LoaderWrapper>
      )} */}
    </>
  );
};
export default LiveSessionsInformation;
