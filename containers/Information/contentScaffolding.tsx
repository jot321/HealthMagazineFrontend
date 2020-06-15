import { useRouter } from "next/router";
import styled from "styled-components";
import {
  ProductsCol,
  ProductCardWrapper,
  ProductsColDivided,
} from "./Information.style";
import { SimpleCardWithCollapse } from "components/InformationCard/SimpleCardWithCollapse";
import { TipCard } from "components/InformationCard/TipCard";
import { QuestionCard } from "components/InformationCard/QuestionCard";
import { VideoPlayerCard } from "components/InformationCard/VideoCard";
import { CompactSocialPanel } from "components/InformationCard/ParentCard";

import Fade from "react-reveal/Fade";

export const InformationType = {
  LISTICLE: 1,
  SHORT_ARTICLE: 2,
  IMAGE_ARTICLE: 3,
  TIP: 4,
  VIDEOLINK: 6,
  EXTERNAL_LINK: 7,
  QUESTION: 8,
};

export const TagWrapper = styled.div`
  margin-top: 10px;
`;

export const Tag = styled.div`
  a {
    text-decoration: none;
    color: #fff;
  }

  text-decoration: none;
  border-radius: 7px;
  display: inline-block;
  margin-right: 10px;
  color: #ea9085;
  background-color: #fff;
  border: 1px solid #ea9085;

  margin-bottom: 7px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  margin-left: 3px;

  &.active {
    background-color: #ea9085;
    color: #fff;
  }
`;

const ExpertUnitWrapper = styled.div`
  .topbar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
  }
  .user_name {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    p.name {
      color: #000;
      font-weight: 500;
      font-size: 15px;
      font-weight: 500;
      text-transform: capitalize;
      text-align: center;
    }
  }
  p.role {
    color: #000;
    font-size: 10px;
    font-weight: 300;
    text-transform: uppercase;
  }

  .social_panel {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  p.offer {
    margin-left: 3px;
    margin-top: 15px;
    font-weight: 600;
    font-size: 13px;
    padding: 2px;
  }
  p.know_more {
    margin-top: 10px;
    font-size: 13px;
    padding: 6px;
    text-align: center;
    font-weight: 500;
    border-radius: 6px;
    background-color: #e43f5a;
    color: #fff;
  }

  p.byline {
    font-size: 13px;
  }
`;

export const outputCardScafollding = (data_, properties_, index) => {
  switch (properties_.type) {
    case InformationType.LISTICLE:
      return (
        <ProductsCol key={index}>
          <ProductCardWrapper>
            <Fade duration={800} delay={0} style={{ height: "100%" }}>
              <SimpleCardWithCollapse
                CMS_ID={data_.CMS_ID}
                title={data_.title}
                byline={data_.byline}
                description={data_.description}
                listicles={data_.listicleItems}
                groups={properties_.groups}
                categories={properties_.sub_category_names}
                visibleTags={properties_.visible_tags_names}
                imageUrl={data_.attachedImage}
                likes={properties_.likes}
                shares={properties_.shares}
                bookmarks={properties_.bookmarks}
                comments={{
                  comments: properties_.expertComments,
                  expertCommentsCount: properties_.expertCommentsCount,
                  discussionsCount: properties_.discussionsCount,
                  topComments: properties_.topComments,
                }}
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>
      );

    case InformationType.SHORT_ARTICLE:
      return (
        <ProductsCol key={index}>
          <ProductCardWrapper>
            <Fade duration={800} delay={10} style={{ height: "100%" }}>
              <SimpleCardWithCollapse
                CMS_ID={data_.CMS_ID}
                title={data_.title}
                byline={data_.byline}
                description={data_.description}
                groups={properties_.groups}
                categories={properties_.sub_category_names}
                visibleTags={properties_.visible_tags_names}
                imageUrl={data_.attachedImage}
                likes={properties_.likes}
                shares={properties_.shares}
                bookmarks={properties_.bookmarks}
                comments={{
                  comments: properties_.expertComments,
                  expertCommentsCount: properties_.expertCommentsCount,
                  discussionsCount: properties_.discussionsCount,
                  topComments: properties_.topComments,
                }}
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>
      );

    case InformationType.TIP:
      return (
        <ProductsCol key={index}>
          <ProductCardWrapper>
            <Fade duration={800} delay={10} style={{ height: "100%" }}>
              <TipCard
                CMS_ID={data_.CMS_ID}
                title={data_.title}
                text={data_.text}
                groups={properties_.groups}
                categories={data_.sub_category_names}
                visibleTags={data_.visible_tags_names}
                likes={properties_.likes}
                shares={properties_.shares}
                bookmarks={properties_.bookmarks}
                comments={{
                  comments: properties_.expertComments,
                  expertCommentsCount: properties_.expertCommentsCount,
                  discussionsCount: properties_.discussionsCount,
                  topComments: properties_.topComments,
                }}
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>
      );

    case InformationType.QUESTION:
      return (
        <ProductsCol key={index}>
          <ProductCardWrapper>
            {/* <Fade duration={800} delay={10} style={{ height: "100%" }}> */}
            <QuestionCard
              CMS_ID={data_.CMS_ID}
              title={data_.title}
              text={data_.text}
              groups={properties_.groups}
              categories={properties_.sub_category_names}
              visibleTags={properties_.visible_tags_names}
              likes={properties_.likes}
              shares={properties_.shares}
              bookmarks={properties_.bookmarks}
              comments={{
                comments: properties_.expertComments,
                expertCommentsCount: properties_.expertCommentsCount,
                discussionsCount: properties_.discussionsCount,
                topComments: properties_.topComments,
              }}
            />
            {/* </Fade> */}
          </ProductCardWrapper>
        </ProductsCol>
      );

    case InformationType.EXTERNAL_LINK:
      return (
        <ProductsCol key={index}>
          <ProductCardWrapper>
            <Fade duration={800} delay={10} style={{ height: "100%" }}>
              <SimpleCardWithCollapse
                CMS_ID={data_.CMS_ID}
                title={data_.title}
                byline={data_.description}
                externalLinkData={{
                  link: data_.link,
                  source: data_.source,
                }}
                groups={properties_.groups}
                categories={properties_.sub_category_names}
                visibleTags={properties_.visible_tags_names}
                imageUrl={data_.image}
                likes={properties_.likes}
                shares={properties_.shares}
                bookmarks={properties_.bookmarks}
                comments={{
                  comments: properties_.expertComments,
                  expertCommentsCount: properties_.expertCommentsCount,
                  discussionsCount: properties_.discussionsCount,
                  topComments: properties_.topComments,
                }}
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>
      );

    case InformationType.VIDEOLINK:
      return (
        <ProductsCol key={index}>
          <ProductCardWrapper>
            <Fade duration={800} delay={index * 10} style={{ height: "100%" }}>
              <VideoPlayerCard
                title={data_.title}
                url={data_.videoLink}
                CMS_ID={data_.CMS_ID}
                groups={properties_.groups}
                likes={properties_.likes}
                shares={properties_.shares}
                views={properties_.views}
                bookmarks={properties_.bookmarks}
                comments={{
                  comments: properties_.expertComments,
                  expertCommentsCount: properties_.expertCommentsCount,
                  discussionsCount: properties_.discussionsCount,
                  topComments: properties_.topComments,
                }}
                playlistTitle={data_.playlistTitle}
                playlistId={data_.playlistId}
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>
      );

    case InformationType.IMAGE_ARTICLE:
      return (
        <ProductsCol key={index}>
          <ProductCardWrapper>
            <Fade duration={800} delay={10} style={{ height: "100%" }}>
              <SimpleCardWithCollapse
                CMS_ID={data_.CMS_ID}
                title={data_.title}
                groups={properties_.groups}
                categories={properties_.sub_category_names}
                visibleTags={properties_.visible_tags_names}
                imageUrl={data_.image}
                isImageArticle={true}
                likes={properties_.likes}
                shares={properties_.shares}
                bookmarks={properties_.bookmarks}
                comments={{
                  comments: properties_.expertComments,
                  expertCommentsCount: properties_.expertCommentsCount,
                  discussionsCount: properties_.discussionsCount,
                  topComments: properties_.topComments,
                }}
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>
      );

    default:
      console.log(properties_.type);
  }
};

export const compactVideoFeed = (data_, properties_, index) => {
  const router = useRouter();
  const videoId = data_.videoLink.match(
    /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
  )[1];

  const thumbmailLink = "https://img.youtube.com/vi/" + videoId + "/0.jpg";

  return (
    <ProductsColDivided key={index}>
      <div style={{ padding: "3px" }}>
        <div
          style={{
            height: "100%",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ExpertUnitWrapper
            image={thumbmailLink}
            onClick={() => {
              router.push(
                "/article?a_id=" +
                  data_.CMS_ID +
                  "&completeVersion=true&backButton=true"
              );
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                clip: "rect(0px,60px,200px,0px)",
              }}
              src={"https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg"}
            ></img>
            <div className="topbar">
              <div className="user_name">
                <p className="name">{data_.title}</p>
              </div>
              <CompactSocialPanel
                views={properties_.views}
                loves={properties_.likes}
                shares={properties_.shares}
              />
            </div>
            {/* <p className="byline">{data.byline}</p> */}
            {/* {data.offer != undefined && (
              <div>
                <p className="offer">{data.offer}</p>
                <p className="know_more">{"Know More"}</p>
              </div>
            )}

            {data.offer == undefined && (
              <p className="know_more">{"Know More"}</p>
            )} */}
          </ExpertUnitWrapper>
        </div>
      </div>
    </ProductsColDivided>
  );
};
