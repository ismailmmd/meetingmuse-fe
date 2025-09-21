import React from 'react';
import { Contact } from '../services/ContactsService';

interface ContactsDropdownProps {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
  visible: boolean;
  position: { top: number; left: number };
  loading?: boolean;
}

export const ContactsDropdown: React.FC<ContactsDropdownProps> = ({
  contacts,
  onSelect,
  visible,
  position,
  loading = false,
}) => {
  console.log('ContactsDropdown render:', { visible, contactsLength: contacts.length, position, loading });

  if (!visible) {
    return null;
  }

  if (loading) {
    return (
      <div
        data-mention-dropdown
        className="absolute z-[9999] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
        style={{
          bottom: '100%',
          left: 0,
          minWidth: '200px',
          maxWidth: '300px',
          marginBottom: '4px',
        }}
      >
        <div className="px-3 py-2 text-gray-500 text-sm flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Searching contacts...</span>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return null;
  }

  // Responsive display: show 1 item on small screens, 2 on larger screens
  const maxVisible = window.innerWidth < 640 ? 1 : 2;
  const displayContacts = contacts.slice(0, maxVisible);

  return (
    <div
      data-mention-dropdown
      className="absolute z-[9999] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
      style={{
        bottom: '100%',
        left: 0,
        minWidth: '200px',
        maxWidth: '300px',
        marginBottom: '4px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {displayContacts.map((contact) => (
        <div
          key={contact.email}
          className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
          onClick={() => onSelect(contact)}
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-blue-600">
                {contact.name?.charAt(0)?.toUpperCase() || contact.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {contact.name || contact.email}
              </div>
              {contact.name && (
                <div className="text-xs text-gray-500 truncate">
                  {contact.email}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {contacts.length > maxVisible && (
        <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500 text-center">
          +{contacts.length - maxVisible} more contacts
        </div>
      )}
    </div>
  );
};