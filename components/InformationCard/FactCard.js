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

  .wrapper {
    //max-width: 400px;
    // padding-left: 1em;
    // padding-right: 1em;
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

    border-left: 10px solid #34bc88;
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

  .card__article h2 {
    line-height: 1.2;
    margin-top: 1rem;
    margin-bottom: 0.6rem;
  }

  .card__article p {
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

  .card__eyebrow {
    position: relative;
    margin-top: -12px;
    display: flex;
    padding-bottom: 10px;
  }

  .fact-icon {
    float: left;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url("https://img.icons8.com/dusk/30/000000/star.png") no-repeat
      center;
  }

  .fact-title {
    padding: 6px;
    font-weight: 300;
    font-size: 1.5em;
    color: #34bc88;
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

export const FactCard = () => {
  return (
    <Container>
      <div class="wrapper">
        <div class="card">
          <div class="card__content">
            <div class="card__eyebrow">
              <div class="fact-icon" href="#"></div>
              <div class="fact-title">Top Tip</div>
            </div>

            {/* <div class="card__meta">
              <a href="#">#skin </a>
              <a href="#">#acne </a>
              <a href="#">#teatreeoil </a>
              <time>17th March</time>
            </div> */}

            <article class="card__article">
              <h2>
                <a href="#">Tea Tree Oil in Acne</a>
              </h2>

              <p>
                According to the Mayo Clinic, it may “reduce the number of
                inflamed and non-inflamed lesions. To use tea tree oil for
                pimples, apply a couple drops to the inflamed area.
              </p>
              <br></br>
              <a>Read More</a>
            </article>
          </div>

          <div class="card__action">
            <div class="card__author">
              {/* <img src="http://lorempixel.com/40/40/sports/" alt="user" /> */}
              <div class="card__author-content">
                By <a href="#">John Doe</a>
              </div>

              <div class="share-icon" href="#"></div>
              <div class="heart-icon"></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
