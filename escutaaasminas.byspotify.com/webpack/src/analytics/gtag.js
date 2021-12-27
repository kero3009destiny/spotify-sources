export const GA_TRACKING_ID = "UA-145103629-1"

export const pageview = url => {
  typeof window !== "undefined" &&
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
}

export const event = ({ action, category, label, value }) => {
  typeof window !== "undefined" &&
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
}
