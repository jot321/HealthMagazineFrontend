import React from "react";

import styled from "styled-components";

const Container = styled.div`
  .card {
    //float: left;

    width: 100%;
    background: #fff;
    height: 500px;
    position: relative;

    //box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease;
    overflow: hidden;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    font-family: "Lato";
  }

  .card__image {
    min-height: 100px;
    background-color: #eee;
  }
  .card__image img {
    width: 100%;
    max-width: 100%;
    display: block;
  }

  .card-meta {
    position: absolute;
    height: 60%;
    top: 0;
    left: 0;
    right: 0;
    transition: 0.2s all ease;

    .tag,
    .date {
      background: #888;
      color: #ffffff;
      text-transform: uppercase;
      display: inline-block;
      padding: 8px 12px;
      position: absolute;
      font-weight: bold;
    }
    .tag {
      left: 0;
      bottom: 0;
      font-size: 14px;
    }
    .date {
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      padding: 8px;
      border-radius: 50%;
      text-align: center;
      font-size: 8px;

      span {
        vertical-align: -5px;
        line-height: 0.8;
      }
      em {
        display: block;
        font-style: normal;
        font-size: 100%;
        padding-top: 2px;
      }
    }
  }
  .card-details {
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 60%;
    bottom: 0;
    padding: 20px;
    transition: 0.2s all ease;

    h2 {
      margin: 0;
      padding: 0 0 10px;
      color: #333333;
      font-size: 21px;
      font-weight: 700;
      text-transform: uppercase;
      font-family: Lato;
    }

    h3 {
      margin: 0;
      padding: 0 0 0px;
      color: #888;
      font-size: 15px;
      font-weight: 400;
      text-transform: ;
      font-family: Lato;
    }
    p {
      color: #666666;
      padding-top: 15px;
      font-size: 13px;
      line-height: 1.8em;
      opacity: 0;
      transition: 0.4s all ease;
    }
  }
  .post-meta {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    color: #999;
    padding: 20px;

    a {
      color: inherit;
      text-decoration: none;
    }
    span {
      margin-right: 1em;
    }
  }

  .card:hover,
  .card.hover {
    //box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    height: 800px;

    .card-image {
      transform: scale(1.5);
      //opacity: 0.6;
    }
    .card-meta {
      height: 20%;
    }
    .card-details {
      top: 20%;
      height: 100%;

      p {
        opacity: 1;
      }
    }
  }
`;

export const InfoCard = ({ title, description, longText, imageUrl }) => {
  return (
    <div>
      <Container>
        <div class="card">
          <div class="card__image">
            <img
              // src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg"
              src={"http://localhost:1337" + imageUrl}
              alt=""
              class="card-image"
            />
          </div>
          <div class="card-meta">
            <span class="tag">Photos</span>
            <span class="date">
              <span>
                27 <em>Mar</em>
              </span>
            </span>
          </div>
          <div class="card-details">
            <h2>{title}</h2>
            <h3>{description}</h3>
            <p>{longText}</p>
            {/* <h2>City Lights in New York</h2>
            <h3>The city that never sleeps and is full of excitement</h3>
            <p>
              New York, the largest city in the U.S., is an architectural marvel
              with plenty of historic monuments, magnificent buildings and
              countless dazzling skyscrapers. New York, the largest city in the
              U.S., is an architectural marvel with plenty of historic
              monuments, magnificent buildings and countless dazzling
              skyscrapers. New York, the largest city in the U.S., is an
              architectural marvel with plenty of historic monuments,
              magnificent buildings and countless dazzling skyscrapers. New
              York, the largest city in the U.S., is an architectural marvel
              with plenty of historic monuments, magnificent buildings and
              countless dazzling skyscrapers. New York, the largest city in the
              U.S., is an architectural marvel with plenty of historic
              monuments, magnificent buildings and countless dazzling
              skyscrapers.
            </p> */}
            <div class="post-meta">
              <span class="timestamp">
                <i class="fa fa-clock-o"></i>6 mins ago
              </span>
              <span class="comments">
                <i class="fa fa-comments"></i>
                <a href="#">39 comments</a>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
