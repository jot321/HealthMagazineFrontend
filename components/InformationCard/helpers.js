export const createWhatsappTextMessage = (title, byline) => {
  return ("*" + title + "*\n\n" + byline + "\n\nRead More:\n");
};

export const createWhatsappLinkMessage = CMS_ID => {
  return process.env.DOMAIN_NAME + "/?articleId=" + CMS_ID;
};
