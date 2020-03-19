import {
  HOME_PAGE,
  CHRONIC_PAGE,
  WEIGHT_PAGE,
  SKIN_HAIR_PAGE
} from "./navigation";
export default {
  HomePage: [
    {
      link: HOME_PAGE,
      icon: "",
      label: "Home"
    },
    {
      link: "/featured",
      icon: "",
      label: "Featured",
      identifier: "top-picks"
    },
    {
      link: "/popular",
      icon: "",
      label: "Popular",
      identifier: "popular"
    },
    // {
    //   link: CHRONIC_PAGE,
    //   icon: "",
    //   label: "Chronic Conditions"
    // },
    // {
    //   link: SKIN_HAIR_PAGE,
    //   icon: "",
    //   label: "Skin & Hair Care"
    // },
    // {
    //   link: WEIGHT_PAGE,
    //   icon: "",
    //   label: "Weight Management"
    // }
  ],
  ChronicPage: [
    {
      link: HOME_PAGE,
      icon: "",
      label: "Home"
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
      identifier: "2"
    },
    {
      link: CHRONIC_PAGE + "?identifier=3",
      icon: "",
      label: "Blood Pressure",
      identifier: "3"
    }
  ],
  SkinHairCarePage: [
    {
      link: HOME_PAGE,
      icon: "",
      label: "Home"
    },
    {
      link: SKIN_HAIR_PAGE,
      icon: "",
      label: "Skin & Hair Care"
    },
    {
      link: SKIN_HAIR_PAGE + "?identifier=4",
      icon: "",
      label: "Acne",
      identifier: "4"
    },
    {
      link: SKIN_HAIR_PAGE + "?identifier=5",
      icon: "",
      label: "Hair Fall",
      identifier: "5"
    }
  ],
  WeightManagementPage: [
    {
      link: HOME_PAGE,
      icon: "",
      label: "Home"
    },
    {
      link: WEIGHT_PAGE,
      icon: "",
      label: "Weight Mgt."
    }
  ]
};
