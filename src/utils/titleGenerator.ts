const firstWords = [
  'Schedule',
  'Agenda',
  'Calendar',
  'Meeting',
  'Time',
  'Deadline',
  'Conference',
  'Planning',
  'Event',
  'Session',
];

const secondWords = [
  'Ace',
  'Conductor',
  'Master',
  'Sage',
  'Maven',
  'Pro',
  'Elite',
  'Commander',
  'Sensei',
  'Guru',
  'Wizard',
  'Champion',
  'Expert',
  'Ninja',
];

/**
 * Generates a random combination of meeting-related titles
 * @returns {string} A random title combination like "Agenda Ace" or "Calendar Master"
 */
export const generateRandomTitle = (): string => {
  const randomFirst = firstWords[Math.floor(Math.random() * firstWords.length)];
  const randomSecond =
    secondWords[Math.floor(Math.random() * secondWords.length)];

  return `${randomFirst} ${randomSecond}`;
};

/**
 * Generates a consistent title for a session (same title for same session)
 * @param {string} sessionId - The user's session ID
 * @returns {string} A consistent title for the session
 */
export const generateSessionTitle = (sessionId?: string): string => {
  if (!sessionId) {
    return generateRandomTitle();
  }

  // Create a simple hash from sessionId to ensure same title for same session
  let hash = 0;
  for (let i = 0; i < sessionId.length; i++) {
    const char = sessionId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use absolute value and modulo to get array indices
  const firstIndex = Math.abs(hash) % firstWords.length;
  const secondIndex = Math.abs(hash >> 8) % secondWords.length;

  return `${firstWords[firstIndex]} ${secondWords[secondIndex]}`;
};
