// This is a utility for a privacy-focused, cookieless analytics provider.
// It assumes the analytics script is loaded from index.html and creates a global object.
// Replace `window.yourAnalytics` with the actual object provided by your analytics service.

declare global {
  interface Window {
    // Define the structure of your analytics provider's global object
    yourAnalytics?: {
      (...args: any[]): void;
    };
  }
}

/**
 * Initializes the analytics service.
 * In a real-world scenario, this might involve configuring the service with a site ID.
 */
export const initAnalytics = (): void => {
  // The script is loaded via index.html, so we can check for its existence.
  if (window.yourAnalytics) {
    console.log('Analytics initialized.');
  } else {
    console.warn('Analytics script not found. Tracking will be disabled.');
  }
};

/**
 * Tracks a page view for a given path.
 * @param path The path of the page to track (e.g., '/#home', '/#about').
 */
export const trackPageView = (path: string): void => {
  if (window.yourAnalytics) {
    // Most analytics tools have a 'pageview' or 'track' command.
    // This sends the current page path to the analytics service.
    window.yourAnalytics('pageview', path);
    console.log(`Tracked page view for: ${path}`);
  }
};

/**
 * Tracks a custom event.
 * This can be used for tracking button clicks, form submissions, etc.
 * @param eventName A descriptive name for the event (e.g., 'generate_article_click').
 * @param eventData An optional object for additional event properties.
 */
export const trackEvent = (eventName: string, eventData?: Record<string, any>): void => {
  if (window.yourAnalytics) {
    window.yourAnalytics('track', eventName, eventData);
    console.log(`Tracked event: ${eventName}`, eventData);
  }
};
