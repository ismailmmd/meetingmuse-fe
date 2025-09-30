// Application constants
export const APP_NAME = 'MeetingMuse';
export const APP_TAGLINE = 'AI-Powered Meeting Scheduling';
export const APP_DESCRIPTION =
  'Your intelligent meeting scheduling assistant. Powered by AI to make scheduling effortless and efficient.';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  CONTACT: '/contact',
} as const;

// External Links
export const EXTERNAL_LINKS = {
  WEBSITE: 'https://www.meetingmuse.online',
  GOOGLE_PERMISSIONS: 'https://myaccount.google.com/permissions',
  GOOGLE_API_POLICY:
    'https://developers.google.com/terms/api-services-user-data-policy',
} as const;

// Contact Information
export const CONTACT_INFO = {
  WEBSITE: EXTERNAL_LINKS.WEBSITE,
  RESPONSE_TIME: '48 hours',
} as const;

// Copyright
export const COPYRIGHT_YEAR = '2024';
export const COPYRIGHT_TEXT = `© ${COPYRIGHT_YEAR} ${APP_NAME}. All rights reserved.`;
