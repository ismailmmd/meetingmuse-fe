import { useState, useEffect, useCallback } from 'react';
import { ContactsService, Contact } from '../services/ContactsService';

export const useMentions = (sessionId: string, debounceDelay: number = 300) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const searchContacts = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim() || !sessionId) {
        setContacts([]);
        return;
      }

      setLoading(true);
      try {
        const results = await ContactsService.searchContacts(
          searchQuery,
          sessionId
        );
        setContacts(results);
      } catch (error) {
        console.error('Error searching contacts:', error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    },
    [sessionId]
  );

  useEffect(() => {
    // Debounce the API call - waits 300ms after user stops typing
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        searchContacts(query);
      } else {
        setContacts([]);
        setLoading(false);
      }
    }, debounceDelay); // Configurable debounce delay

    // Cleanup function: cancel the timeout if query changes before 300ms
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, searchContacts, debounceDelay]);

  return {
    contacts,
    loading,
    setQuery,
    query,
  };
};
