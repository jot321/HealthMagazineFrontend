import {
  HOME_PAGE,
  CHRONIC_PAGE,
  WEIGHT_PAGE,
  SKIN_HAIR_PAGE,
} from "./navigation";

import {
  YoutubeVideoIcon,
  TipsIcon,
  PopularIcon,
  HomeIcon,
  LiveIcon,
  MindNavIcon,
  DietNavIcon,
  FitNavIcon,
} from "components/AllSvgIcon";

export default {
  HomePage: [
    {
      link: HOME_PAGE,
      icon: <HomeIcon />,
      label: "Home",
    },
    // {
    //   link: "/videos",
    //   icon: <YoutubeVideoIcon />,
    //   label: "Videos",
    //   identifier: "videos",
    // },
    {
      link: "/popular",
      icon: <PopularIcon />,
      label: "Popular",
      identifier: "popular",
    },
    {
      link: "/live",
      // icon: <LiveIcon />,
      icon: <YoutubeVideoIcon />,
      label: "Live",
      identifier: "live",
    },
  ],
  GroupPage: [
    {
      link: HOME_PAGE,
      label: "Back",
    },
    {
      link: HOME_PAGE,
      icon: <HomeIcon />,
      label: "Home",
    },
    {
      link: "/videos",
      icon: <YoutubeVideoIcon />,
      label: "Videos",
      identifier: "videos",
    },
    {
      link: "/live",
      icon: <LiveIcon />,
      label: "Live",
      identifier: "live",
    },
    {
      link: "/popular",
      icon: <PopularIcon />,
      label: "Popular",
      identifier: "popular",
    },
    {
      link: "/tips",
      icon: <TipsIcon />,
      label: "Tips",
      identifier: "tips",
    },
  ],
  ChronicPage: [
    {
      link: HOME_PAGE,
      icon: "",
      label: "Home",
    },
    {
      link: CHRONIC_PAGE,
      icon: "",
      label: "Chronic Conditions",
    },
    {
      link: CHRONIC_PAGE + "?identifier=2",
      icon: "",
      label: "Diabetes",
      identifier: "2",
    },
    {
      link: CHRONIC_PAGE + "?identifier=3",
      icon: "",
      label: "Blood Pressure",
      identifier: "3",
    },
  ],
  SkinHairCarePage: [
    {
      link: HOME_PAGE,
      icon: "",
      label: "Home",
    },
    {
      link: SKIN_HAIR_PAGE,
      icon: "",
      label: "Skin & Hair Care",
    },
    {
      link: SKIN_HAIR_PAGE + "?identifier=4",
      icon: "",
      label: "Acne",
      identifier: "4",
    },
    {
      link: SKIN_HAIR_PAGE + "?identifier=5",
      icon: "",
      label: "Hair Fall",
      identifier: "5",
    },
  ],
  WeightManagementPage: [
    {
      link: HOME_PAGE,
      icon: "",
      label: "Home",
    },
    {
      link: WEIGHT_PAGE,
      icon: "",
      label: "Weight Mgt.",
    },
  ],
};
