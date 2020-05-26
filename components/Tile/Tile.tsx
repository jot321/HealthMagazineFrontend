import styled from "styled-components";

export const TwoTileWrapper = styled.div`
  display: flex;
  flex: 0 0 50%;
`;

export const TwoTileCard = styled.div`
  display: flex;
  flex-direction: column-reverse;

  width: 100%;
  padding-left: 5px;
  padding-right: 5px;

  margin-left: 10px;
  margin-right: 10px;
  height: 150px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background-color: ${(props) => props.color};

  border-radius: 6px;

  background-size: cover;
  margin-bottom: 1.6rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
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
  justify-content: space-around;
  place-content: flex-start;
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
  margin-bottom: 1.6rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;

  h1 {
    line-height: 1.2;
    font-weight: 500;
    font-size: 20px;

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
  padding-left: 5px;
  padding-right: 5px;

  margin-left: 10px;
  margin-right: 10px;
  height: 95px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .card {
    height: 100%;
    border-radius: 6px;
    background-image: url(${(props) => props.image});

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
