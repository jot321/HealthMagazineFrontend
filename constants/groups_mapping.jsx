import {
  FITNESS_TOP_CATEGORY_SLUG,
  DIET_TOP_CATEGORY_SLUG,
  MENTAL_TOP_CATEGORY_SLUG,
  GENERAL_TOP_CATEGORY_SLUG,
} from "constants/categories";

export const topCategoryToGroupMapping = {
  [FITNESS_TOP_CATEGORY_SLUG]: [
    {
      slug: "cardio",
      name: "Cardio",
    },
    {
      slug: "weight-training",
      name: "Strength",
    },
    {
      slug: "dance",
      name: "Dance",
    },
    {
      slug: "hiit",
      name: "HIIT",
    },
    {
      slug: "yoga",
      name: "Yoga",
    },
    {
      slug: "flexibility",
      name: "Flexibility",
    },
    {
      slug: "senior-fitness",
      name: "Senior Fitness",
    },
    {
      slug: "female-fitness",
      name: "Female Fitness",
    },
    {
      slug: "junior-fitness",
      name: "Junior Fitness",
    },
    {
      slug: "motivation",
      name: "Motivation",
    },
    {
      slug: "diet-for-fitness",
      name: "Diet for Fitness",
    },
    {
      slug: "weight-loss",
      name: "Weight Loss",
    },
    {
      slug: "weight-gain",
      name: "Weight Gain",
    },
    {
      slug: "filler",
      name: "Filler",
    },
  ],
  [DIET_TOP_CATEGORY_SLUG]: [
    {
      slug: "healthy-recipes",
      name: "Healthy Recipes",
    },
    {
      slug: "healthy-breakfast",
      name: "Healthy Breakfast",
    },
    {
      slug: "healthy-snacks",
      name: "Healthy Snacks",
    },
    {
      slug: "healthy-juices",
      name: "Healthy Juices",
    },
    {
      slug: "healthy-desserts",
      name: "Healthy Desserts",
    },
    {
      slug: "senior-diet",
      name: "Senior Diet",
    },
    {
      slug: "junior-diet",
      name: "Junior Diet",
    },
    {
      slug: "south-indian",
      name: "South Indian",
    },
    {
      slug: "north-indian",
      name: "North Indian",
    },
    {
      slug: "supplements",
      name: "Supplements",
    },
    {
      slug: "nutrient-facts",
      name: "Nutrient Facts",
    },
    {
      slug: "keto-diet",
      name: "Keto Diet",
    },
    {
      slug: "low-carb-diet",
      name: "Low Carb Diet",
    },
    {
      slug: "protein-rich",
      name: "Protein Rich",
    },
    {
      slug: "diet-plans",
      name: "Diet Plans",
    },
    {
      slug: "celeb-diet",
      name: "Celeb Diet",
    },
    {
      slug: "diabetes-diet",
      name: "Diabetes Diet",
    },
    {
      slug: "thyroid-diet",
      name: "Thyroid Diet",
    },
    {
      slug: "ayurveda",
      name: "Ayurveda",
    },
    {
      slug: "filler",
      name: "Filler",
    },
  ],
  [MENTAL_TOP_CATEGORY_SLUG]: [
    {
      slug: "music",
      name: "Music",
    },
    {
      slug: "meditation",
      name: "Meditation",
    },
    {
      slug: "addiction",
      name: "Addiction",
    },
    {
      slug: "stress",
      name: "Stress",
    },
    {
      slug: "yoga",
      name: "Yoga",
    },
    {
      slug: "anxiety",
      name: "Anxiety",
    },
    {
      slug: "depression",
      name: "Depression",
    },
    {
      slug: "self-improvement",
      name: "Self Improvement",
    },
    {
      slug: "sleep",
      name: "Sleep",
    },
    {
      slug: "parenting",
      name: "Parenting",
    },
    {
      slug: "gurus",
      name: "Gurus",
    },
    {
      slug: "filler",
      name: "Filler",
    },
  ],
  [GENERAL_TOP_CATEGORY_SLUG]: [
    {
      slug: "sexual",
      name: "Sexual",
    },
    {
      slug: "immunity",
      name: "Immunity",
    },
    {
      slug: "skin-and-hair-care",
      name: "Skin and Hair care",
    },
    {
      slug: "diseases",
      name: "Diseases",
    },
    {
      slug: "asthma",
      name: "Asthma",
    },
    {
      slug: "heart",
      name: "Heart",
    },
    {
      slug: "digestion",
      name: "Digestion",
    },
    {
      slug: "blood-pressure",
      name: "Blood Pressure",
    },
    {
      slug: "diabetes",
      name: "Diabetes",
    },
    {
      slug: "thyroid",
      name: "Thyroid",
    },
    {
      slug: "fatigue",
      name: "Fatigue",
    },
    {
      slug: "back-pain",
      name: "Back Pain",
    },
    {
      slug: "filler",
      name: "Filler",
    },
  ],
};

const groupSlugNameMap = {
  cardio: { name: "Cardio", topLevelCategory: FITNESS_TOP_CATEGORY_SLUG },
  "weight-training": {
    name: "Strength",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
  },
  dance: { name: "Dance", topLevelCategory: FITNESS_TOP_CATEGORY_SLUG },
  hiit: { name: "HIIT", topLevelCategory: FITNESS_TOP_CATEGORY_SLUG },
  yoga: { name: "Yoga", topLevelCategory: FITNESS_TOP_CATEGORY_SLUG },
  flexibility: {
    name: "Flexibility",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
  },
  "senior-fitness": {
    name: "Senior Fitness",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
  },
  "female-fitness": {
    name: "Female Fitness",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
  },
  "junior-fitness": {
    name: "Junior Fitness",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
  },
  motivation: {
    name: "Motivation",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
  },
  "diet-for-fitness": {
    name: "Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "weight-loss": {
    name: "Weight Loss",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "weight-gain": {
    name: "Weight Gain",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "healthy-recipes": {
    name: "Healthy Recipes",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "healthy-breakfast": {
    name: "Healthy Breakfast",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "healthy-snacks": {
    name: "Healthy Snacks",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "healthy-juices": {
    name: "Healthy Juices",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "healthy-desserts": {
    name: "Healthy Desserts",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "senior-diet": {
    name: "Senior Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "junior-diet": {
    name: "Junior Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "south-indian": {
    name: "South Indian",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "north-indian": {
    name: "North Indian",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  supplements: {
    name: "Supplements",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "nutrient-facts": {
    name: "Nutrient Facts",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "keto-diet": { name: "Keto Diet", topLevelCategory: DIET_TOP_CATEGORY_SLUG },
  "low-carb-diet": {
    name: "Low Carb Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "protein-rich": {
    name: "Protein Rich",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "diet-plans": {
    name: "Diet Plans",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "celeb-diet": {
    name: "Celeb Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "diabetes-diet": {
    name: "Diabetes Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  "thyroid-diet": {
    name: "Thyroid Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
  },
  ayurveda: { name: "Ayurveda", topLevelCategory: DIET_TOP_CATEGORY_SLUG },
  music: { name: "Music", topLevelCategory: MENTAL_TOP_CATEGORY_SLUG },
  meditation: {
    name: "Meditation",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
  },
  addiction: { name: "Addiction", topLevelCategory: MENTAL_TOP_CATEGORY_SLUG },
  stress: { name: "Stress", topLevelCategory: MENTAL_TOP_CATEGORY_SLUG },
  yoga: { name: "Yoga", topLevelCategory: MENTAL_TOP_CATEGORY_SLUG },
  anxiety: { name: "Anxiety", topLevelCategory: MENTAL_TOP_CATEGORY_SLUG },
  depression: {
    name: "Depression",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
  },
  "self-improvement": {
    name: "Self Improvement",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
  },
  sleep: { name: "Sleep", topLevelCategory: MENTAL_TOP_CATEGORY_SLUG },
  parenting: { name: "Parenting", topLevelCategory: MENTAL_TOP_CATEGORY_SLUG },
  gurus: { name: "Gurus", topLevelCategory: MENTAL_TOP_CATEGORY_SLUG },
  sexual: { name: "Sexual", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  immunity: { name: "Immunity", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  "skin-and-hair-care": {
    name: "Skin and Hair care",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  diseases: { name: "Diseases", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  asthma: { name: "Asthma", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  heart: { name: "Heart", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  digestion: { name: "Digestion", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  "blood-pressure": {
    name: "Blood Pressure",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  diabetes: { name: "Diabetes", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  thyroid: { name: "Thyroid", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  fatigue: { name: "Fatigue", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  "back-pain": {
    name: "Back Pain",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  "manage-pain": {
    name: "Manage Pain",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  wellbeing: {
    name: "Well Being",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  performance: {
    name: "Performance",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  pleasure: { name: "Pleasure", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  erection: { name: "Erection", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  "vaginal-health": {
    name: "Vaginal Health",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  fertility: { name: "Fertility", topLevelCategory: GENERAL_TOP_CATEGORY_SLUG },
  "menstural-health": {
    name: "Menstrual Health",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  "celebrity-fitness": {
    name: "Celebrity Fitness",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  "female-sexual-health": {
    name: "Female Sexual Health",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  "sexual-wellness": {
    name: "Sexual Wellness",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
  "menstrual-health": {
    name: "Menstrual Health",
    topLevelCategory: GENERAL_TOP_CATEGORY_SLUG,
  },
};

export const getGroupNameFromSlug = (groupSlug) => {
  if (groupSlugNameMap[groupSlug] === undefined) {
    return "";
  } else {
    return groupSlugNameMap[groupSlug].name;
  }
};

export const getGroupTopLevelCategoryFromSlug = (groupSlug) => {
  if (groupSlugNameMap[groupSlug] === undefined) {
    return "";
  } else {
    return groupSlugNameMap[groupSlug].topLevelCategory;
  }
};
