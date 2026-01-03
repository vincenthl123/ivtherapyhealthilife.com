// Meta Pixel tracking utility
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const trackMetaEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

export const trackButtonClick = (buttonId: string) => {
  trackMetaEvent('Lead', { content_name: buttonId });
};
