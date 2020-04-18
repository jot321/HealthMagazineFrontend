import React from "react";
import styled from "styled-components";

import {
  createWhatsappTipTextMessage,
  createWhatsappTipTextMessageWebShare,
  createWhatsappTipLinkMessageWebAPIShare,
} from "./helpers";

const Container = styled.div`
  font-family: "'IBM Plex Sans'";
  a {
    text-decoration: none;
  }

  .wrapper {
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;

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
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    position: relative;
    padding: 1rem;

    h2 {
      font-weight: 500;
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-weight: 400;
      font-size: 1rem;
    }

    h4 {
      padding-left: 0.5rem;
      margin-top: 1rem;
      font-weight: 400;
      font-size: 1rem;
      border-left: 2px solid #ea9085;
    }
  }

  .card_with_border {
    border-left: 2px solid #ea9085;
    background-color: #fff;
    margin-bottom: 1.6rem;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    position: relative;
    padding: 1rem;

    h2 {
      font-weight: 500;
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-weight: 400;
      font-size: 1rem;
    }

    h4 {
      padding-left: 0.5rem;
      margin-top: 1rem;
      font-weight: 400;
      font-size: 1rem;
      border-left: 2px solid #ea9085;
    }
  }

  .categorytitle {
    border-left: 6px solid #ea9085;
    margin-bottom: 1rem;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    padding: 0.7rem;

    h2 {
      font-weight: 500;
      font-size: 1.3rem;
    }
  }

  .card__image {
    min-height: 100px;
    background-color: #eee;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    margin-bottom: 1rem;

    img {
      width: 100%;
      max-width: 100%;
      display: block;
    }
  }

  .card__title {
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

  .card__tags {
    display: inline-block;
    width: 100%;
    margin-bottom: 1rem;

    .card__meta {
      border-radius: 6px;
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
        padding: 0 5px;
        letter-spacing: 1px;
        font-size: 0.9rem;
        text-transform: capitalize;
      }
    }
  }

  .card__action {
    margin-top: -50px;
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

export const CoachSocialIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
`;

const Button = styled.div`
  height: 40px;
  width: 90px;
  background-color: #ea9085;
  color: #fff;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

export const CoachDescription = ({ text }) => {
  return (
    <div>
      <Container>
        <div className="wrapper">
          <div className="card_with_border">
            <h3>{text}</h3>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const CoachCourse = ({ title, text, timing = null }) => {
  return (
    <div>
      <Container>
        <div className="wrapper">
          <div className="card">
            <h2>{title}</h2>
            <h3>{text}</h3>
            {timing && (
              <div>
                <h4>{timing}</h4>
              </div>
            )}
            <Button>ENROLL</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const CoachCategoryTitle = ({ title }) => {
  return (
    <div>
      <Container>
        <div className="wrapper">
          <div className="categorytitle">
            <h2>{title}</h2>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const CoachEvent = ({ title }) => {
  return (
    <div>
      <Container>
        <div className="wrapper">
          <div className="card">
            <div class="card__image">
              <img
                src={
                  "https://healthmagazinephotos.s3.ap-south-1.amazonaws.com/95b5f9949623434c92c9964b5bfb4e50.jpg"
                }
                alt="image"
              />
            </div>
            <h2>{title}</h2>
            <Button>BOOK</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
