export const createWhatsappTextMessage = (title, byline) => {
  return "*" + title + "*\n\n" + byline + "\n\nRead More:\n";
};

export const createWhatsappLinkMessage = CMS_ID => {
  return process.env.DOMAIN_NAME + "/?articleId=" + CMS_ID;
};

export const createWhatsappCombinedMessage = (title, byline, CMS_ID) => {
  return createWhatsappTextMessage(title, byline) + createWhatsappLinkMessage(CMS_ID);
};


export const createWhatsappLinkMessageWebAPIShare = CMS_ID => {
  return "?articleId=" + CMS_ID;
};