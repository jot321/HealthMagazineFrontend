export const convertToRichText = incomingString => {
  let outgoingString = "";
  const splitParts = incomingString.split("**");

  splitParts.forEach((element, index) => {
    if (index % 2 == 0) {
      outgoingString = outgoingString + "<span>" + element + "</span>";
    } else {
      outgoingString =
        outgoingString + "<span style=font-weight:500>" + element + "</span>";
    }
  });

  return outgoingString;
};
