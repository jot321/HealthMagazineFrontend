import React from "react";
import styled from "styled-components";

import { createWhatsappMessageForTrainerBooking } from "./helpers";

const cardFont = "'IBM Plex Sans'";

const Container = styled.div`
  a {
    text-decoration: none;
  }
  h2 {
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 500;

    color: #000;
    text-transform: capitalize;
  }

  .wrapper {
    width: 100%;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .card {
    background-color: #fff;
    margin-bottom: 1.6rem;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08),
      0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    font-family: ${cardFont};

    h2,
    p,
    a,
    h4 {
      font-family: ${cardFont};
    }
  }

  .card__image {
    min-height: 100px;
    background-color: #eee;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    img {
      width: 100%;
      max-width: 100%;
      display: block;
    }
  }

  .card__content {
    position: relative;
    padding: 1rem;
  }

  .long-summary {
    color: #aaa;
    display: none;
  }

  .card:hover {
    .long-summary {
      display: inline-block;
      transition: 0.4s all ease;
    }
  }

  .card__category {
    display: inline-block;
    margin-bottom: 1rem;

    .card__meta {
      display: inline-block;
      float: left;
      margin-right: 10px;
      border-bottom: 2px solid #ffcb00;

      a {
        color: #15131d;
        text-transform: uppercase;
        padding: 0 5px;
        font-size: 0.85rem;
        letter-spacing: 1px;
      }
    }
  }

  .card__tags {
    display: inline-block;
    width: 100%;
    margin-bottom: 0.6rem;

    .card__meta {
      display: inline-block;
      float: left;
      margin-right: 10px;
      background-color: #f4dada;

      padding: 1px;
      margin-bottom: 5px;
      font-weight: 500;
      font-size: x-small;
      font-weight: 500;
      line-height: 1.5;

      a {
        color: #15131d;
        text-transform: uppercase;
        padding: 0 5px;
        letter-spacing: 1px;
        font-size: 0.75rem;
        text-transform: capitalize;
      }
    }
  }

  .card__action {
    margin-top: -30px;
    overflow: hidden;
    padding-right: 1rem;
    padding-left: 1rem;
    padding-bottom: 1.3rem;
    padding-top: 1rem;
  }

  .card__author {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    float: left;
    font-size: 0.8em;
  }

  .card__metrics {
    float: right;
  }

  .card__author img,
  .card__author-content {
    display: flex;

    .card__author-content_image {
      width: 30px;
      height: 30px;
      // background: url("https://img.icons8.com/cotton/100/000000/pen.png")
      background: url("https://img.icons8.com/color/100/000000/pen.png")
        no-repeat center;
      background-size: 100% 100%;
    }

    a {
      padding: 8px;
      color: black;
    }
  }

  .card__author img {
    border-radius: 50%;
    margin-right: 0.6em;
  }

  .card__share {
    float: right;
    position: relative;
    padding-left: 1em;
  }

  .card__factchecked {
    color: black;
    display: flex;

    .card__factchecked_image {
      width: 30px;
      height: 30px;
      background: url("https://img.icons8.com/color/100/000000/warranty.png")
        no-repeat center;
      background-size: 100% 100%;
    }

    h4 {
      padding: 8px;
      font-weight: 400;
    }
  }
`;

const CardArticleArea = styled.article`
  a {
    text-decoration: none;
    transition: all 0.5s ease;
  }

  p.description {
    color: #222;
    font-size: 16px;
    font-weight: 400px;
  }
`;

const Description = styled.p`
  color: #222;
  font-size: 16px;
  font-weight: 400px;
  margin-bottom: 10px;
`;

const PersonalDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SocialLinks = styled.div`
  float: right;
`;

const FBButton = styled.a`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/ios/100/000000/facebook-new.png")
    no-repeat center;
  background-size: 70% 70%;
`;

const IGButton = styled.a`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/ios/100/000000/instagram-new.png")
    no-repeat center;
  background-size: 70% 70%;
`;

const ExperienceArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const TimingsArea = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 5px;
`;

const CoursesArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const CategoryTitle = styled.div`
  display: inline-block;
  color: #ea9085;
  font-weight: 400;
  text-transform: uppercase;
`;

const BookButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  border: 2px solid #ea9085;
  background-color: #ea9085;
  text-transform: uppercase;
  color: #f4f4f4;
  margin-top: 10px;
`;

export const TrainerCard = ({
  deviceType = { mobile: true },
  name,
  byline,
  experience = null,
  timings = [],
  categories = [],
  courses = [],
  facebookLink = null,
  instagramLink = null,
  imageUrl = null
}) => {
  const targetRef = React.useRef(null);

  const onBookClassButtonClick = () => {
    if (deviceType.mobile == true) {
      window.location.href =
        "whatsapp://send?phone=" +
        process.env.PHONE_NUMBER +
        "&text=" +
        createWhatsappMessageForTrainerBooking(name);
    } else {
      window.location.href =
        "https://api.whatsapp.com/send?phone=" +
        process.env.PHONE_NUMBER +
        "&text=" +
        createWhatsappMessageForTrainerBooking(name);
    }
  };

  return (
    <div ref={targetRef}>
      <Container>
        <div className="wrapper">
          <div className="card">
            <div class="card__image">
              <img src={imageUrl} alt="image" />
            </div>

            <div class="card__content">
              <CardArticleArea>
                <PersonalDetails>
                  <h2>{name}</h2>

                  <SocialLinks>
                    <FBButton href={facebookLink}></FBButton>
                    <IGButton href={instagramLink}></IGButton>
                  </SocialLinks>
                </PersonalDetails>

                {/* ---------------------------------------------------------------- */}
                {/* CATEGORIES && TAGS */}
                <div class="card__tags">
                  {categories.length > 0 &&
                    categories.map(category => {
                      return (
                        <div class="card__meta">
                          <a href={"/category?tag=" + category}>{category}</a>
                        </div>
                      );
                    })}
                </div>

                {/* ---------------------------------------------------------------- */}
                {/* DESCRIPTION */}

                {/* <p class="description">{byline}</p> */}
                <Description>{byline}</Description>

                <CategoryTitle style={{ "margin-top": "10px" }}>
                  Experience
                </CategoryTitle>
                <ExperienceArea>{experience}</ExperienceArea>

                <CategoryTitle style={{ "margin-top": "10px" }}>
                  Timings
                </CategoryTitle>
                <TimingsArea>
                  {timings.length > 0 &&
                    timings.map(timing => {
                      return (
                        <div style={{ "margin-right": "20px" }}>
                          {timing.dayOfWeek} @ {timing.timeOfDay}
                        </div>
                      );
                    })}
                </TimingsArea>

                <CategoryTitle style={{ "margin-top": "10px" }}>
                  Courses
                </CategoryTitle>
                <CoursesArea>
                  {courses.length > 0 &&
                    courses.map(course => {
                      return (
                        <div>
                          <div style={{ float: "left" }}>- {course.title}</div>
                          <div style={{ float: "right" }}>₹ {course.price}</div>
                        </div>
                      );
                    })}
                </CoursesArea>
              </CardArticleArea>
            </div>

            <BookButton onClick={onBookClassButtonClick}>Book Class</BookButton>
          </div>
        </div>
      </Container>
    </div>
  );
};
