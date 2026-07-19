interface GtagEventParams {
  [key: string]: unknown;
}

interface Window {
  gtag: (
    command: "config" | "event" | "js" | "set",
    targetId: string,
    params?: GtagEventParams
  ) => void;
  dataLayer: unknown[];
}
