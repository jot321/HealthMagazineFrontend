export const createWhatsappTextMessage = (title, byline) => {
  return "*" + title + "*\n\n" + byline + "\n\nRead More:\n";
};

export const createWhatsappTipTextMessage = (text) => {
  return "*" + title + "*" + "\n\nRead More:\n";
};


export const createWhatsappLinkMessage = CMS_ID => {
  return process.env.DOMAIN_NAME + "/article?articleId=" + CMS_ID;
};

export const createWhatsappTipLinkMessage = () => {
  return process.env.DOMAIN_NAME;
};


export const createWhatsappCombinedMessage = (title, byline, CMS_ID) => {
  return createWhatsappTextMessage(title, byline) + createWhatsappLinkMessage(CMS_ID);
};


export const createWhatsappTipCombinedMessage = (text) => {
  return createWhatsappTipTextMessage(title, byline) + createWhatsappTipLinkMessage();
};



export const createWhatsappLinkMessageWebAPIShare = CMS_ID => {
  return "/article?articleId=" + CMS_ID;
};

export const createWhatsappTipLinkMessageWebAPIShare = CMS_ID => {
  return "/tips";
};


// TRAINER PAGE

export const createWhatsappMessageForTrainerBooking = (name) => {
  return "Hi, I would like to book a session with " + name + ". Thanks, "
}
