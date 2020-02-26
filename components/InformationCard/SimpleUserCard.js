import React from "react";
import styled from "styled-components";

const Container = styled.div`
  a {
    text-decoration: none;
    color: #3498db;
  }
  a:hover {
    color: #2980b9;
  }

  h2 {
    line-height: 1.2;
    margin-bottom: 1.6rem;
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
    padding: 1.6rem;
  }

  .card__meta time {
    font-size: 1.5rem;
    color: #bbb;
    margin-left: 0.8rem;
  }

  .card__article a {
    text-decoration: none;
    color: #3498db;
    transition: all 0.5s ease;
  }
  .card__article a:hover {
    color: #2980b9;
  }

  .card__action {
    overflow: hidden;
    padding-right: 1.6rem;
    padding-left: 1.6rem;
    padding-bottom: 1.6rem;
  }

  .card__author {
    display: inline-block;
  }

  .card__author img,
  .card__author-content {
    display: inline-block;
    vertical-align: middle;
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

  .share-icon {
    float: right;
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url("https://img.icons8.com/dusk/30/000000/whatsapp.png")
      no-repeat center;
  }

  .share-icon:hover,
  .share-icon:focus {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
  }

  .heart-icon {
    float: right;
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    background: url("https://img.icons8.com/wired/30/000000/like.png") no-repeat
      center;
  }

  .heart-icon:hover,
  .heart-icon:focus {
    background: url("https://img.icons8.com/dusk/30/000000/like.png") no-repeat
      center;

    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
  }
`;

export const SimpleUserCard = () => {
  return (
    <Container>
      <div class="wrapper">
        <div class="card">
          <div class="card__image">
            <img
              src="http://localhost:1337/uploads/44797d50c1d5410d91c44ab05981db7c.jpeg"
              alt="image"
            />
          </div>

          <div class="card__content">
            <div class="card__meta">
              <a href="#">#skin </a>
              <a href="#">#acne </a>
              <a href="#">#teatreeoil </a>
              {/* <time>17th March</time> */}
            </div>

            <article class="card__article">
              <h2>
                <a href="#">Tea Tree Oil in Acne</a>
              </h2>

              <p>
                According to the Mayo Clinic, it may “reduce the number of
                inflamed and non-inflamed lesions. To use tea tree oil for
                pimples, apply a couple drops to the inflamed area.
              </p>
            </article>
          </div>

          <div class="card__action">
            <div class="card__author">
              {/* <img src="http://lorempixel.com/40/40/sports/" alt="user" /> */}
              <div class="card__author-content">
                By <a href="#">John Doe</a>
              </div>
            </div>

            <div class="share-icon" href="#"></div>
            <div class="heart-icon"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};
