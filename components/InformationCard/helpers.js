// ----------------------------------------------------------------
// Simple Card with Collapse
export const createWhatsappTextMessageWebShare = (title, byline) => {
  return "*" + title + "*\n\n" + byline + "\n\nRead More:\n";
};

export const createWhatsappTextMessage = (title, byline) => {
  return "*" + title + "*%0A%0A" + byline + "%0A%0ARead More:%0A";
};

export const createWhatsappLinkMessageWebAPIShare = (CMS_ID) => {
  return "/article?articleId=" + CMS_ID;
};

// ----------------------------------------------------------------
// TIPS PAGE
export const createWhatsappTipLinkMessage = () => {
  return process.env.DOMAIN_NAME + "/tips";
};

export const createWhatsappTipTextMessage = (title, text) => {
  return "*" + title + "*%0A%0A" + text + "%0A%0AFor more tips, visit:%0A";
};

export const createWhatsappTipTextMessageWebShare = (title, text) => {
  return "*" + title + "*\n\n" + text + "\n\nFor more tips, visit:\n";
};

export const createWhatsappTipCombinedMessage = (title, text) => {
  return (
    createWhatsappTipTextMessage(title, text) + createWhatsappTipLinkMessage()
  );
};

export const createWhatsappTipLinkMessageWebAPIShare = (CMS_ID) => {
  return "/tips";
};

// ----------------------------------------------------------------
// TRAINER PAGE
export const createWhatsappMessageForTrainerBooking = (name) => {
  return "Hi, I would like to book a session with " + name + ". Thanks, ";
};

// ----------------------------------------------------------------
// Videos Page
export const createVideosWhatsappTextMessageWebShare = (title) => {
  return "Checkout this *" + title + "* playlist @ UrbanNukha\n\n";
};

export const createVideosWhatsappTextMessage = (title) => {
  return "*Checkout this *" + title + "* playlist @UrbanNuskha%0A%0A";
};

export const createVideosWhatsappLinkMessageWebAPIShare = (VPID) => {
  return "/videos?vpid=" + VPID;
};
