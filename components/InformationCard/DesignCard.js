import React from "react";

import styled from "styled-components";

const Container = styled.div`
 
  .blog-card {

    //width: 350px;
    float: left;
    width: 100%;
    height: 500px;
    position: relative;
    //top: 50%;
    //left: 50%;
    //margin: -250px 0 0 -175px;
    overflow: hidden;
    //border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
    //box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
    text-align: center;

    &.spring-fever {
      background: url(${props => props.backgroundImage}) no-repeat;
    }

    .color-overlay {
      /* Rectangle 11: */
      background: rgba(84, 104, 110, 0.4);
      width: 350px;
      height: 500px;
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      transition: background 0.3s cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    .gradient-overlay {
      /* bg-gradient: */
      background-image: -webkit-linear-gradient(
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 21%
      );
      background-image: -moz-linear-gradient(
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 21%
      );
      background-image: -o-linear-gradient(
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 21%
      );
      background-image: linear-gradient(
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 21%
      );
      width: 350px;
      height: 500px;
      position: absolute;
      top: 350px;
      left: 0;
      z-index: 15;
    }

    &:hover {
      .card-info {
        opacity: 1;
        bottom: 120px;
      }
      .color-overlay {
        background: rgba(84, 104, 110, 0.8);
      }
    }
  }

  .title-content {
    text-align: center;
    margin: 70px 0 0 0;
    position: absolute;
    z-index: 20;
    width: 100%;
    top: 0;
    left: 0;
  }
  h3 {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 2px;
    color: #9cc9e3;
    font-family: "Roboto", sans-serif;
    margin-bottom: 0;
  }
  hr {
    width: 50px;
    height: 3px;
    margin: 20px auto;
    border: 0;
    background: #d0bb57;
  }
  .intro {
    width: 170px;
    margin: 0 auto;
    color: #dce3e7;
    font-family: "Droid Serif", serif;
    font-size: 13px;
    font-style: italic;
    line-height: 18px;
  }
  .card-info {
    width: 100%;
    position: absolute;
    bottom: 100px;
    left: 0;
    margin: 0 auto;
    padding: 0 50px;
    color: #dce3e7;
    font-family: "Droid Serif", serif;
    font-style: 16px;
    line-height: 24px;
    z-index: 20;
    opacity: 0;
    transition: bottom 0.3s, opacity 0.3s cubic-bezier(0.33, 0.66, 0.66, 1);
  }

  .utility-info {
    position: absolute;
    bottom: 0px;
    left: 0;
    z-index: 20;
  }
  .utility-list {
    list-style-type: none;
    margin: 0 0 30px 20px;
    padding: 0;
    width: 100%;

    li {
      margin: 0 15px 0 0;
      padding: 0 0 0 22px;
      display: inline-block;
      color: #dce3e7;
      font-family: "Roboto", sans-serif;

      &.comments {
        background: url(${props => props.commentIcon}) no-repeat 0 0.1em;
      }
      &.date {
        background: url(${props => props.dateIcon}) no-repeat 0 0.1em;
      }
    }
  }
`;

export const DesignCard = () => {
  return (
    <div>
      <Container
        backgroundImage="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/bg-blog-card.jpg"
        commentIcon="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/icon-chat.svg"
        dateIcon="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/icon-calendar.svg"
      >
        <div class="blog-card spring-fever">
          <div class="title-content">
            <h3>SPRING FEVER</h3>
            <hr />
            <div class="intro">
              Yllamco laboris nisi ut aliquip ex ea commodo.
            </div>
          </div>
          <div class="card-info">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim.
          </div>
          <div class="utility-info">
            <ul class="utility-list">
              <li class="comments">12</li>
              <li class="date">03.12.2015</li>
            </ul>
          </div>
          <div class="gradient-overlay"></div>
          <div class="color-overlay"></div>
        </div>
      </Container>
    </div>
  );
};
