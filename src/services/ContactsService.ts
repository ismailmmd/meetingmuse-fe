const API_URL = __VITE_API_URL__;

export interface Contact {
  email: string;
  name?: string;
  avatar?: string;
}

export interface ContactsSearchResponse {
  contacts: string[]; // List of email addresses
}

export class ContactsService {
  /**
   * Search for contacts by name or email
   * @param query - Search string to find contacts
   * @param sessionId - User session ID for OAuth authentication
   * @returns Promise<Contact[]> - List of matching contacts
   */
  static async searchContacts(query: string, sessionId: string): Promise<Contact[]> {
    if (!query.trim()) {
      return [];
    }

    try {
      const url = new URL(`${API_URL}/people/contacts/search`);
      url.searchParams.append('query', query.trim());
      url.searchParams.append('session_id', sessionId);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to search contacts: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Contacts API response:', data);
      
      // Validate response structure and handle different formats
      if (!data) {
        console.warn('Empty response from contacts API');
        return [];
      }

      // Handle different possible response formats
      let contacts: string[] = [];
      
      if (Array.isArray(data)) {
        // Direct array of emails
        contacts = data;
      } else if (data.contacts && Array.isArray(data.contacts)) {
        // Object with contacts array
        contacts = data.contacts;
      } else if (data.emails && Array.isArray(data.emails)) {
        // Object with emails array (alternative format)
        contacts = data.emails;
      } else {
        console.warn('Unexpected API response format:', data);
        return [];
      }
      
      // Transform email strings into Contact objects
      return contacts
        .filter(email => typeof email === 'string' && this.isValidEmail(email))
        .map(email => ({
          email,
          name: this.extractNameFromEmail(email),
        }));
    } catch (error) {
      console.error('Error searching contacts:', error);
      // Return empty array instead of throwing to prevent UI crashes
      return [];
    }
  }

  /**
   * Extract a display name from an email address
   * @param email - Email address
   * @returns Display name or email if no name can be extracted
   */
  private static extractNameFromEmail(email: string): string {
    // Try to extract name from email (e.g., "john.doe@example.com" -> "John Doe")
    const localPart = email.split('@')[0];
    if (localPart.includes('.')) {
      return localPart
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    }
    
    // Return capitalized version of local part
    return localPart.charAt(0).toUpperCase() + localPart.slice(1);
  }

  /**
   * Validate if a string is a valid email address
   * @param email - Email string to validate
   * @returns boolean
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
