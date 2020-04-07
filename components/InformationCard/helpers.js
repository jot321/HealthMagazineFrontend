export const createWhatsappTextMessage = (title, byline) => {
  return "*" + title + "*\n\n" + byline + "\n\nRead More:\n";
};

export const createWhatsappLinkMessage = CMS_ID => {
  return process.env.DOMAIN_NAME + "/article?articleId=" + CMS_ID;
};

export const createWhatsappCombinedMessage = (title, byline, CMS_ID) => {
  return (
    createWhatsappTextMessage(title, byline) + createWhatsappLinkMessage(CMS_ID)
  );
};

export const createWhatsappLinkMessageWebAPIShare = CMS_ID => {
  return "/article?articleId=" + CMS_ID;
};

// TIPS PAGE
export const createWhatsappTipLinkMessage = () => {
  return process.env.DOMAIN_NAME + "/tips";
};

export const createWhatsappTipTextMessage = (title, text) => {
  return "*" + title + "*\n\n" + text;
};

export const createWhatsappTipCombinedMessage = (title, text) => {
  return (
    createWhatsappTipTextMessage(title, text) + createWhatsappTipLinkMessage()
  );
};

export const createWhatsappTipLinkMessageWebAPIShare = CMS_ID => {
  return "/tips";
};

// TRAINER PAGE
export const createWhatsappMessageForTrainerBooking = name => {
  return "Hi, I would like to book a session with " + name + ". Thanks, ";
};
