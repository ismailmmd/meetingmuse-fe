import Store from 'electron-store';
import { SERVER_URL } from '../config.js';

const store = new Store();

/**
 * Get or create a client ID (same logic as React app uses with localStorage)
 */
function getClientId() {
  let clientId = store.get('meetingmuse_client_id');
  if (!clientId) {
    clientId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    store.set('meetingmuse_client_id', clientId);
  }
  return clientId;
}

/**
 * Check if user is authenticated by calling backend API
 * @returns {Promise<boolean>} true if authenticated, false otherwise
 */
export async function isUserAuthenticated() {
  try {
    const clientId = getClientId();
    const response = await fetch(`${SERVER_URL}/auth/status/${clientId}`);

    if (!response.ok) {
      console.error('Failed to check auth status:', response.statusText);
      return false;
    }

    const data = await response.json();
    console.log('Auth status:', data);

    return data.authenticated === true && !!data.session_id;
  } catch (error) {
    console.error('Error checking authentication:', error);
    // On error, assume not authenticated to show login screen
    return false;
  }
}
