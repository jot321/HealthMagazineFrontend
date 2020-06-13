import styled from "styled-components";

export const TwoTileWrapper = styled.div`
  display: flex;
  flex: 0 0 50%;
`;

export const TwoTileCard = styled.div`
  display: flex;
  flex-direction: column-reverse;

  width: 100%;

  margin-left: 10px;
  margin-right: 10px;

  min-height: 100px;
  background-color: #eee;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  img {
    width: 100%;
    max-width: 100%;
    display: block;
  }

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  border-radius: 6px;

  background-size: cover;
  margin-bottom: 1.6rem;
  overflow: hidden;

  h1 {
    line-height: 1.2;
    font-weight: 400;
    font-size: 2rem;

    padding: 15px;

    color: #000;
    text-transform: capitalize;
  }
`;

export const GroupTileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const GroupTileCard = styled.div`
  width: 44%;
  padding-left: 5px;
  padding-right: 5px;

  margin-left: 10px;
  margin-right: 10px;
  height: 100%;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background-color: ${(props) => props.color};

  border-radius: 6px;

  background-size: cover;
  margin-bottom: 0.6rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;

  h1 {
    line-height: 1.2;
    font-weight: 500;
    font-size: 15px;

    padding: 15px;

    color: #fff;
    text-transform: capitalize;
  }
`;

export const ThreeTileWrapper = styled.div`
  display: flex;
  flex: 0 0 33.333333%;
`;

export const ThreeTileCard = styled.div`
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;

  margin-left: 5px;
  margin-right: 5px;

  height: 150px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  border: 2px solid black;

  .card {
    border-radius: 6px;
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 70%,
        #222 100%
      ),
      url(${(props) => props.image});

    background-size: cover;
    margin-bottom: 1.6rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    h2,
    p,
    a,
    h2,
    h4 {
      line-height: 1.2;
      font-weight: 500;
      font-size: 1rem;

      color: #fff;
      text-transform: capitalize;
      margin-bottom: -0.5rem;
    }
  }
`;

export const ThreeTileCardSmall = styled.div`
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;

  margin-left: 5px;
  margin-right: 5px;

  height: 75px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  border: 2px solid black;

  .card {
    border-radius: 6px;
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 70%,
        #222 100%
      ),
      url(${(props) => props.image});

    background-size: cover;
    margin-bottom: 1.6rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    h2,
    p,
    a,
    h2,
    h4 {
      line-height: 1.2;
      font-weight: 500;
      font-size: 1rem;

      color: #fff;
      text-transform: capitalize;
      margin-bottom: -0.5rem;
    }
  }
`;

export const OneTileWrapper = styled.div`
  display: flex;
  flex: 0 0 100%;
`;

export const OneTileCard = styled.div`
  width: 100%;

  margin-left: 5px;
  margin-right: 5px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  min-height: 100px;
  background-color: #eee;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  img {
    width: 100%;
    max-width: 100%;
    display: block;
  }

  background-image: url(${(props) => props.image});

  background-size: cover;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const OneTileCardBackground = styled.div`
  width: 100%;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  height: 300px;
  background-position: center;
  background-color: #fff;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;

  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 60%,
      #222 100%
    ),
    url(${(props) => props.image});

  background-size: cover;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;

  display: flex;
  flex-direction: column-reverse;

  .user_name {
    display: inline-block;
    flex-direction: column;
    top: 220px;
    padding: 15px;

    p.name {
      color: #fff;
      font-size: 30px;
      font-weight: 400;
    }

    p.role {
      color: #fff;
      font-size: 12px;
      font-weight: 300;
      text-transform: uppercase;
    }
  }

  .social_panel {
    display: flex;
    align-items: center;
    padding: 10px;
  }
`;

export const TwoTileCardBackground = styled.div`
  width: 100%;
  height: 120px;
  // border-radius: 10px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background-position: center;

  // background-image: linear-gradient(
  //     to bottom,
  //     rgba(0, 0, 0, 0) 0%,
  //     rgba(0, 0, 0, 0) 60%,
  //     #222 100%
  //   ),
  //   url(${(props) => props.image});

  background-image: url(${(props) => props.image});

  background-size: cover;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;

  display: flex;
  flex-direction: column-reverse;

  .user_name {
    display: inline-block;
    padding: 15px;

    p.name {
      color: #fff;
      font-size: 20px;
      font-weight: 500;
    }

    p.role {
      color: #fff;
      font-size: 10px;
      font-weight: 300;
      text-transform: uppercase;
    }
  }

  .social_panel {
    display: flex;
    align-items: center;
    padding: 10px;
  }
`;
