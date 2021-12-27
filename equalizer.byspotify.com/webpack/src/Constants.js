const PAGE_SLUG_HOME = "home"
const PAGE_SLUG_ABOUT = "about"
const PAGE_SLUG_EVENTS = "events"

const CONTENT_TYPES = {
  LARGE_TEXT: "WordPressAcf_large_text",
  MEDIUM_TEXT: "WordPressAcf_medium_text",
  IMAGE: "WordPressAcf_image",
  TEXT_IMAGE: "WordPressAcf_text_and_image",
  VIDEO_TEXT: "WordPressAcf_video_and_text",
}

const URLS = {
  SPOTIFY: "https://www.spotify.com",
  MAIL: "mailto:equalizer@spotify.com",
  EMBED: "https://open.spotify.com/embed/playlist/",
}

const ANIMATION = {
  DELAY: 100,
}

const UI_TEXT = {
  APPLICATION_CLOSED: "Application is closed",
  APPLY: "Apply",
  PAST_EVENT: "Past event",
  SEE_ALL_EVENTS: "See all events",
  SEE_CURRENT_EVENTS: "See our current events",
  READ_MORE: "Read more",
  PAGE_ABOUT: "About",
  PAGE_EVENTS: "Events",
  SUBMIT_ERROR:
    "Oops! Something is wrong in your application. Please correct the errors above.",
  SUBMIT_BUTTON: "Submit application",
  SUBMIT_SUCCESS_TITLE: "Application sent!",
  SUBMIT_SUCCESS_TEXT: "You will receive a confirmation email shortly.",
  SUBMIT_SUCCESS_BUTTON: "Got it",
}

module.exports = {
  PAGE_SLUG_HOME,
  PAGE_SLUG_ABOUT,
  PAGE_SLUG_EVENTS,
  CONTENT_TYPES,
  URLS,
  ANIMATION,
  UI_TEXT,
}
