// ----------------------------------------------------------------
// Simple Card with Collapse
export const createWhatsappTextMessageWebShare = (title, byline) => {
  let shareText = "*" + title + "*\n\n" + byline + "\n\nRead More:\n";

  if (title == null && byline == null) {
    shareText = "";
  } else if (byline == null) {
    shareText = "*" + title + "*" + "\n\nRead More:\n";
  }

  return shareText;
};

export const createWhatsappTextMessage = (title, byline) => {
  let shareText = "*" + title + "*%0A%0A" + byline + "%0A%0ARead More:%0A";

  if (title == null && byline == null) {
    shareText = "";
  } else if (byline == null) {
    shareText = "*" + title + "*" + "%0A%0ARead More:%0A";
  }

  return shareText;
};

export const createWhatsappLinkMessageWebAPIShare = (CMS_ID) => {
  return (
    "/article?a_id=" +
    CMS_ID +
    "&completeVersion=true&selectedCommentsSection=discussions"
  );
};

// ----------------------------------------------------------------
// TIPS PAGE
export const createWhatsappTipTextMessage = (title, text) => {
  return "*" + title + "*%0A%0A" + text + "%0A%0AFor more tips, visit:%0A";
};

export const createWhatsappTipTextMessageWebShare = (title, text) => {
  return "*" + title + "*\n\n" + text + "\n\nFor more tips, visit:\n";
};

export const createWhatsappTipLinkMessageWebAPIShare = (CMS_ID) => {
  return (
    "/article?a_id=" +
    CMS_ID +
    "&completeVersion=true&selectedCommentsSection=discussions"
  );
};

// ----------------------------------------------------------------
// TRAINER PAGE
export const createWhatsappMessageForTrainerBooking = (name) => {
  return "Hi, I would like to book a session with " + name + ". Thanks, ";
};

// ----------------------------------------------------------------
// Videos Page
export const createVideosWhatsappTextMessageWebShare = (title) => {
  return "Checkout this video @ UrbanNukha\n\n" + (title != null ? title : "");
};

export const createVideosWhatsappTextMessage = (title) => {
  return (
    "Checkout this video @ UrbanNuskha%0A%0A" + (title != null ? title : "")
  );
};

export const createVideosWhatsappLinkMessageWebAPIShare = (CMS_ID) => {
  return (
    "/article?a_id=" +
    CMS_ID +
    "&completeVersion=true&selectedCommentsSection=discussions"
  );
};
