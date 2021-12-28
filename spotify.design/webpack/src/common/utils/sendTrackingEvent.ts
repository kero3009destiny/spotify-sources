export function sendTrackingEvent(
  // string - required - The object that was interacted with (e.g.video)
  category: string,
  // string - required - Type of interaction (e.g. 'play')
  action: string,
  // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
  label?: string,
  // number - optional - Numeric value associated with the event. (e.g. A product ID)
  value?: string
) {
  if (typeof window === undefined || !(window as any).ga) {
    return;
  }

  const trackingEventOptions = {
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value,
  };

  (window as any).ga('send', 'event', trackingEventOptions);
}
