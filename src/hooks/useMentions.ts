import { useState, useEffect, useCallback } from 'react';
import { ContactsService, Contact } from '../services/ContactsService';

export const useMentions = (sessionId: string) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const searchContacts = useCallback(async (searchQuery: string) => {
    console.log('searchContacts called with:', { searchQuery, sessionId });

    if (!searchQuery.trim() || !sessionId) {
      setContacts([]);
      return;
    }

    setLoading(true);
    try {
      const results = await ContactsService.searchContacts(searchQuery, sessionId);
      console.log('Search results:', results);
      setContacts(results);
    } catch (error) {
      console.error('Error searching contacts:', error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        searchContacts(query);
      } else {
        setContacts([]);
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timeoutId);
  }, [query, searchContacts]);

  return {
    contacts,
    loading,
    setQuery,
    query,
  };
};