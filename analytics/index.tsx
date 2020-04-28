import ReactGA from "react-ga";

ReactGA.initialize("UA-160862205-1");

export const trackPageView = (pageLink) => {
  if (process.env.NODE_ENV == "production") {
    ReactGA.pageview(pageLink);
  }
};
