// Shared icon registry for the Services module.
// The public Services.jsx page and the AdminServices.jsx form both import
// from here, so a service's `icon` key (stored in MongoDB as a string)
// always resolves to the exact same SVG everywhere.
//
// Adding a new icon later? Add it here AND to ICON_KEYS in
// backend/models/Service.js so the backend accepts the new key.

export function CodeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}

export function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

export function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

export function CloudIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.7A4.5 4.5 0 0 0 6.5 19h11Z" />
    </svg>
  );
}

export function PenIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 19 7-7 3 3-7 7-3-3Z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

export function PlugIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22v-5M9 8V2M15 8V2M18 8H6a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V10a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

export function CheckShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// key -> component, used to resolve a service's stored icon string to real SVG
export const SERVICE_ICONS = {
  code: CodeIcon,
  globe: GlobeIcon,
  phone: PhoneIcon,
  spark: SparkIcon,
  cloud: CloudIcon,
  pen: PenIcon,
  plug: PlugIcon,
  shield: CheckShieldIcon,
};

// used to populate the icon <select> in the admin form
export const ICON_OPTIONS = [
  { key: "code", label: "Code" },
  { key: "globe", label: "Globe" },
  { key: "phone", label: "Phone" },
  { key: "spark", label: "Spark / AI" },
  { key: "cloud", label: "Cloud" },
  { key: "pen", label: "Pen / Design" },
  { key: "plug", label: "Plug / API" },
  { key: "shield", label: "Shield / QA" },
];

export function getServiceIcon(key) {
  return SERVICE_ICONS[key] || CodeIcon;
}