export const sentenceToSlug = (sentence) => {
  return sentence
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};
