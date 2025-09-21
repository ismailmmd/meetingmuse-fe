import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { ContactsDropdown } from './ContactsDropdown';
import { EmailChip } from './EmailChip';
import { useMentions } from '../hooks/useMentions';
import { Contact } from '../services/ContactsService';
import { useAuth } from '../contexts/AuthContext';

interface MentionedContact {
  id: string;
  name: string;
  email: string;
}

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled = false,
}) => {
  const { session } = useAuth();
  const [message, setMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  const [mentions, setMentions] = useState<MentionedContact[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition] = useState({ top: 0, left: 0 });
  const [mentionStart, setMentionStart] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { contacts, setQuery, loading } = useMentions(session?.sessionId || '', 500); // 500ms debounce

  const handleSend = () => {
    if (message.trim() && !disabled) {
      // Send the actual message with emails, not the display version
      onSend(message.trim());
      setMessage('');
      setDisplayMessage('');
      setMentions([]);
      setShowDropdown(false);
      setMentionStart(-1);
    }
  };

  const detectMention = (text: string, cursorPosition: number) => {

    const beforeCursor = text.slice(0, cursorPosition);
    const atIndex = beforeCursor.lastIndexOf('@');


    if (atIndex === -1) {
      console.log('No @ found');
      return null;
    }

    // Check if @ is at the start of a word (preceded by space, start of string, or newline)
    const charBeforeAt = atIndex > 0 ? beforeCursor[atIndex - 1] : ' ';
    const isAtStartOfWord = charBeforeAt === ' ' || charBeforeAt === '\n' || atIndex === 0;


    if (!isAtStartOfWord) {
      console.log('@ is not at start of word, ignoring');
      return null;
    }

    const afterAt = beforeCursor.slice(atIndex + 1);
    const hasSpace = afterAt.includes(' ');

    console.log('afterAt:', afterAt, 'hasSpace:', hasSpace);

    if (hasSpace) {
      console.log('Space found after @, ignoring');
      return null;
    }

    const result = {
      start: atIndex,
      query: afterAt,
    };

    console.log('Mention result:', result);
    return result;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    const cursorPosition = e.target.selectionStart;

    console.log('Input changed:', { newMessage, cursorPosition });
    setDisplayMessage(newMessage);
    setMessage(newMessage); // This will be updated when mentions are selected

    const mention = detectMention(newMessage, cursorPosition);

    if (mention) {
      console.log('Mention detected:', mention);
      setMentionStart(mention.start);
      setQuery(mention.query);
      setShowDropdown(true);

      console.log('Showing dropdown for mention:', mention);
    } else {
      setShowDropdown(false);
      setMentionStart(-1);
      setQuery('');
    }
  };

  const handleContactSelect = (contact: Contact) => {
    if (mentionStart === -1) return;

    const beforeMention = displayMessage.slice(0, mentionStart);
    const afterMention = displayMessage.slice(mentionStart);
    const afterAt = afterMention.indexOf(' ');
    const remainingText = afterAt !== -1 ? afterMention.slice(afterAt) : '';

    const contactName = contact.name || contact.email;

    // Create new mention object
    const newMention: MentionedContact = {
      id: `mention-${Date.now()}`,
      name: contactName,
      email: contact.email,
    };

    // Update display message with contact name
    const newDisplayMessage = `${beforeMention}${contactName}${remainingText}`;
    setDisplayMessage(newDisplayMessage);

    // Update actual message with email (without leading @)
    const newActualMessage = `${beforeMention}${contact.email}${remainingText}`;
    setMessage(newActualMessage);

    // Add to mentions list
    setMentions(prev => [...prev, newMention]);

    setShowDropdown(false);
    setMentionStart(-1);
    setQuery('');

    // Focus back to textarea
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPosition = beforeMention.length + contactName.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  const removeMention = (mentionId: string) => {
    const mentionToRemove = mentions.find(m => m.id === mentionId);
    if (!mentionToRemove) return;

    // Remove from mentions list
    setMentions(prev => prev.filter(m => m.id !== mentionId));

    // Replace the mention in both display and actual message
    const updatedDisplayMessage = displayMessage.replace(mentionToRemove.name, '');
    const updatedActualMessage = message.replace(mentionToRemove.email, '');

    setDisplayMessage(updatedDisplayMessage);
    setMessage(updatedActualMessage);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (showDropdown && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Escape' && showDropdown) {
      setShowDropdown(false);
      setMentionStart(-1);
      setQuery('');
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target && !target.closest('[data-mention-dropdown]') && !target.closest('textarea')) {
        setShowDropdown(false);
        setMentionStart(-1);
        setQuery('');
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDropdown, setQuery]);

  return (
    <div className="border-t border-gray-200/50 p-3 sm:p-4 bg-white/60 backdrop-blur-sm">
      <div className="flex space-x-2 sm:space-x-3 items-end max-w-4xl mx-auto">
        {/* Input Container */}
        <div className="flex-1 relative">
          {/* Mention chips display */}
          {mentions.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 p-2 bg-gray-50 rounded-lg">
              {mentions.map((mention) => (
                <EmailChip
                  key={mention.id}
                  name={mention.name}
                  email={mention.email}
                  onRemove={() => removeMention(mention.id)}
                />
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={displayMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              disabled
                ? 'Connecting...'
                : 'Ask me anything about scheduling...'
            }
            disabled={disabled}
            className={`
              w-full px-3 py-2 sm:px-4 sm:py-3 resize-none rounded-xl sm:rounded-2xl border-2 transition-all duration-200
              min-h-[44px] max-h-[100px] sm:min-h-[52px] sm:max-h-[120px]
              ${disabled 
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white border-gray-200 text-gray-800 focus:border-blue-400 focus:bg-white'
              }
              focus:outline-none focus:ring-0 shadow-sm hover:shadow-md focus:shadow-lg
              placeholder:text-gray-400 text-sm sm:text-base
            `}
            rows={1}
            style={{
              lineHeight: '1.4'
            }}
          />
          <ContactsDropdown
            contacts={contacts}
            onSelect={handleContactSelect}
            visible={showDropdown}
            position={dropdownPosition}
            loading={loading}
          />
        </div>
        
        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className={`
            px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-white transition-all duration-200 shadow-lg
            flex items-center justify-center min-w-[60px] sm:min-w-[80px]
            ${disabled || !message.trim()
              ? 'bg-gray-300 cursor-not-allowed shadow-sm'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl active:scale-95'
            }
          `}
        >
          {disabled ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          )}
        </button>
      </div>
      
      {/* Help Text - Only show on larger screens */}
      <div className="mt-2 text-xs text-gray-500 text-center hidden sm:block">
        Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono">Shift + Enter</kbd> for new line
      </div>
    </div>
  );
};
