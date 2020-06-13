import {
  FITNESS_TOP_CATEGORY_SLUG,
  DIET_TOP_CATEGORY_SLUG,
  MENTAL_TOP_CATEGORY_SLUG,
  GENERAL_TOP_CATEGORY_SLUG,
} from "constants/categories";

const CardioImage = require("../image/groups/fit/Cardio.png");
const StrengthImage = require("../image/groups/fit/Strength.png");
const DanceImage = require("../image/groups/fit/Dance.png");
const HIITImage = require("../image/groups/fit/HIIT.png");
const YogaImage = require("../image/groups/fit/Yoga.png");
const FlexibilityImage = require("../image/groups/fit/Flexibility.png");
const SeniorFitnessImage = require("../image/groups/fit/Senior-Fitness.png");
const FemaleFitnessImage = require("../image/groups/fit/Female-Fitness.png");
const JuniorFitnessFitnessImage = require("../image/groups/fit/Junior-Fitness.png");
const MotivationFitnessImage = require("../image/groups/fit/Motivation.png");
const DietForFitnessFitnessImage = require("../image/groups/fit/Diet-for-Fitness.png");
const WeightLossFitnessImage = require("../image/groups/fit/Weight-Loss.png");
const WeightGainFitnessImage = require("../image/groups/fit/Weight-Gain.png");

const AyurvedaImage = require("../image/groups/diet/Ayurveda.png");
const CelebDietImage = require("../image/groups/diet/Celeb-Diet.png");
const DiabetesDietImage = require("../image/groups/diet/Diabetes-Diet.png");
const DietPlansImage = require("../image/groups/diet/Diet-Plans.png");
const HealthyBreakfastImage = require("../image/groups/diet/Healthy-Breakfast.png");
const HealthyDessertsImage = require("../image/groups/diet/Healthy-Desserts.png");
const HealthyJuicesImage = require("../image/groups/diet/Healthy-Juices.png");
const HealthyRecipesImage = require("../image/groups/diet/Healthy-Recipes.png");
const HealthySnacksImage = require("../image/groups/diet/Healthy-Snacks.png");
const JuniorDietImage = require("../image/groups/diet/Junior-Diet.png");
const KetoDietImage = require("../image/groups/diet/Keto-Diet.png");
const LowCarbDietImage = require("../image/groups/diet/Low-Carb-Diet.png");
const NorthIndianImage = require("../image/groups/diet/North-Indian.png");
const NutrientFactsImage = require("../image/groups/diet/Nutrient-Facts.png");
const ProteinRichImage = require("../image/groups/diet/Protein-Rich.png");
const SeniorDietImage = require("../image/groups/diet/Senior-Diet.png");
const SouthIndianImage = require("../image/groups/diet/South-Indian.png");
const SupplementsImage = require("../image/groups/diet/Supplements.png");
const ThyroidDietImage = require("../image/groups/diet/Thyroid-Diet.png");

const AddictionImage = require("../image/groups/mind/Addiction.png");
const AnxietyImage = require("../image/groups/mind/Anxiety.png");
const DepressionImage = require("../image/groups/mind/Depression.png");
const GurusImage = require("../image/groups/mind/Gurus.png");
const MeditationImage = require("../image/groups/mind/Meditation.png");
const MusicImage = require("../image/groups/mind/Music.png");
const ParentingImage = require("../image/groups/mind/Parenting.png");
const SelfImprovementImage = require("../image/groups/mind/Self-Improvement.png");
const SleepImage = require("../image/groups/mind/Sleep.png");
const StressImage = require("../image/groups/mind/Stress.png");

export const topCategoryToGroupMapping = {
  [FITNESS_TOP_CATEGORY_SLUG]: [
    {
      slug: "cardio",
      name: "Cardio",
      image: CardioImage,
    },
    {
      slug: "weight-training",
      name: "Strength",
      image: StrengthImage,
    },
    {
      slug: "dance",
      name: "Dance",
      image: DanceImage,
    },
    {
      slug: "hiit",
      name: "HIIT",
      image: HIITImage,
    },
    {
      slug: "yoga",
      name: "Yoga",
      image: YogaImage,
    },
    {
      slug: "flexibility",
      name: "Flexibility",
      image: FlexibilityImage,
    },
    {
      slug: "weight-loss",
      name: "Weight Loss",
      image: WeightLossFitnessImage,
    },
    {
      slug: "senior-fitness",
      name: "Senior Fitness",
      image: SeniorFitnessImage,
    },
    {
      slug: "female-fitness",
      name: "Female Fitness",
      image: FemaleFitnessImage,
    },
    {
      slug: "junior-fitness",
      name: "Junior Fitness",
      image: JuniorFitnessFitnessImage,
    },
    {
      slug: "motivation",
      name: "Motivation",
      image: MotivationFitnessImage,
    },
    {
      slug: "diet-for-fitness",
      name: "Diet for Fitness",
      image: DietForFitnessFitnessImage,
    },
    {
      slug: "weight-gain",
      name: "Weight Gain",
      image: WeightGainFitnessImage,
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
      image: HealthyRecipesImage,
    },
    {
      slug: "nutrient-facts",
      name: "Nutrient Facts",
      image: NutrientFactsImage,
    },
    {
      slug: "protein-rich",
      name: "Protein Rich",
      image: ProteinRichImage,
    },
    {
      slug: "healthy-breakfast",
      name: "Healthy Breakfast",
      image: HealthyBreakfastImage,
    },
    {
      slug: "diet-plans",
      name: "Diet Plans",
      image: DietPlansImage,
    },
    {
      slug: "celeb-diet",
      name: "Celeb Diet",
      image: CelebDietImage,
    },
    {
      slug: "supplements",
      name: "Supplements",
      image: SupplementsImage,
    },
    {
      slug: "keto-diet",
      name: "Keto Diet",
      image: KetoDietImage,
    },
    {
      slug: "healthy-snacks",
      name: "Healthy Snacks",
      image: HealthySnacksImage,
    },
    {
      slug: "healthy-juices",
      name: "Healthy Juices",
      image: HealthyJuicesImage,
    },
    {
      slug: "healthy-desserts",
      name: "Healthy Desserts",
      image: HealthyDessertsImage,
    },
    {
      slug: "senior-diet",
      name: "Senior Diet",
      image: SeniorDietImage,
    },
    {
      slug: "junior-diet",
      name: "Junior Diet",
      image: JuniorDietImage,
    },
    {
      slug: "south-indian",
      name: "South Indian",
      image: SouthIndianImage,
    },
    {
      slug: "north-indian",
      name: "North Indian",
      image: NorthIndianImage,
    },
    {
      slug: "low-carb-diet",
      name: "Low Carb Diet",
      image: LowCarbDietImage,
    },
    {
      slug: "diabetes-diet",
      name: "Diabetes Diet",
      image: DiabetesDietImage,
    },
    {
      slug: "thyroid-diet",
      name: "Thyroid Diet",
      image: ThyroidDietImage,
    },
    {
      slug: "ayurveda",
      name: "Ayurveda",
      image: AyurvedaImage,
    },
    {
      slug: "filler",
      name: "Filler",
    },
  ],
  [MENTAL_TOP_CATEGORY_SLUG]: [
    {
      slug: "sleep",
      name: "Sleep",
      image: SleepImage,
    },
    {
      slug: "meditation",
      name: "Meditation",
      image: MeditationImage,
    },
    {
      slug: "addiction",
      name: "Addiction",
      image: AddictionImage,
    },
    {
      slug: "stress",
      name: "Stress",
      image: StressImage,
    },
    {
      slug: "yoga",
      name: "Yoga",
      image: YogaImage,
    },
    {
      slug: "gurus",
      name: "Gurus",
      image: GurusImage,
    },
    {
      slug: "music",
      name: "Music",
      image: MusicImage,
    },
    {
      slug: "anxiety",
      name: "Anxiety",
      image: AnxietyImage,
    },
    {
      slug: "depression",
      name: "Depression",
      image: DepressionImage,
    },
    {
      slug: "self-improvement",
      name: "Self Improvement",
      image: SelfImprovementImage,
    },
    {
      slug: "parenting",
      name: "Parenting",
      image: ParentingImage,
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
  cardio: {
    name: "Cardio",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: CardioImage,
  },
  "weight-training": {
    name: "Strength",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: StrengthImage,
  },
  dance: {
    name: "Dance",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: DanceImage,
  },
  hiit: {
    name: "HIIT",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: HIITImage,
  },
  yoga: {
    name: "Yoga",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: YogaImage,
  },
  flexibility: {
    name: "Flexibility",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: FlexibilityImage,
  },
  "senior-fitness": {
    name: "Senior Fitness",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: SeniorFitnessImage,
  },
  "female-fitness": {
    name: "Female Fitness",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: FemaleFitnessImage,
  },
  "junior-fitness": {
    name: "Junior Fitness",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: JuniorFitnessFitnessImage,
  },
  motivation: {
    name: "Motivation",
    topLevelCategory: FITNESS_TOP_CATEGORY_SLUG,
    image: MotivationFitnessImage,
  },
  "diet-for-fitness": {
    name: "Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: DietForFitnessFitnessImage,
  },
  "weight-loss": {
    name: "Weight Loss",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: WeightLossFitnessImage,
  },
  "weight-gain": {
    name: "Weight Gain",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: WeightGainFitnessImage,
  },
  "healthy-recipes": {
    name: "Healthy Recipes",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: HealthyRecipesImage,
  },
  "healthy-breakfast": {
    name: "Healthy Breakfast",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: HealthyBreakfastImage,
  },
  "healthy-snacks": {
    name: "Healthy Snacks",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: HealthySnacksImage,
  },
  "healthy-juices": {
    name: "Healthy Juices",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: HealthyJuicesImage,
  },
  "healthy-desserts": {
    name: "Healthy Desserts",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: HealthyDessertsImage,
  },
  "senior-diet": {
    name: "Senior Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: SeniorDietImage,
  },
  "junior-diet": {
    name: "Junior Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: JuniorDietImage,
  },
  "south-indian": {
    name: "South Indian",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: SouthIndianImage,
  },
  "north-indian": {
    name: "North Indian",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: NorthIndianImage,
  },
  supplements: {
    name: "Supplements",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: SupplementsImage,
  },
  "nutrient-facts": {
    name: "Nutrient Facts",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: NutrientFactsImage,
  },
  "keto-diet": {
    name: "Keto Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: KetoDietImage,
  },
  "low-carb-diet": {
    name: "Low Carb Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: LowCarbDietImage,
  },
  "protein-rich": {
    name: "Protein Rich",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: ProteinRichImage,
  },
  "diet-plans": {
    name: "Diet Plans",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: DietPlansImage,
  },
  "celeb-diet": {
    name: "Celeb Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: CelebDietImage,
  },
  "diabetes-diet": {
    name: "Diabetes Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: DiabetesDietImage,
  },
  "thyroid-diet": {
    name: "Thyroid Diet",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: ThyroidDietImage,
  },
  ayurveda: {
    name: "Ayurveda",
    topLevelCategory: DIET_TOP_CATEGORY_SLUG,
    image: AyurvedaImage,
  },
  music: {
    name: "Music",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: MusicImage,
  },
  meditation: {
    name: "Meditation",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: MeditationImage,
  },
  addiction: {
    name: "Addiction",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: AddictionImage,
  },
  stress: {
    name: "Stress",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: StressImage,
  },
  yoga: {
    name: "Yoga",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: YogaImage,
  },
  anxiety: {
    name: "Anxiety",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: AnxietyImage,
  },
  depression: {
    name: "Depression",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: DepressionImage,
  },
  "self-improvement": {
    name: "Self Improvement",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: SelfImprovementImage,
  },
  sleep: {
    name: "Sleep",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: SleepImage,
  },
  parenting: {
    name: "Parenting",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: ParentingImage,
  },
  gurus: {
    name: "Gurus",
    topLevelCategory: MENTAL_TOP_CATEGORY_SLUG,
    image: GurusImage,
  },
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

export const getGroupImageFromSlug = (groupSlug) => {
  if (groupSlugNameMap[groupSlug] === undefined) {
    return "";
  } else {
    return groupSlugNameMap[groupSlug].image;
  }
};
