import styled from "styled-components";
import { ProductsCol, ProductCardWrapper } from "./Information.style";
import { SimpleCardWithCollapse } from "components/InformationCard/SimpleCardWithCollapse";
import { TipCard } from "components/InformationCard/TipCard";
import { QuestionCard } from "components/InformationCard/QuestionCard";
import { VideoPlayerCard } from "components/InformationCard/VideoCard";

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
