import React, { useState, useRef, KeyboardEvent } from 'react';
import { ContactsDropdown } from './ContactsDropdown';
import { useMentions } from '../hooks/useMentions';
import { Contact } from '../services/ContactsService';
import { useAuth } from '../contexts/AuthContext';

interface MentionedContact {
  id: string;
  name: string;
  email: string;
  startIndex: number;
  endIndex: number;
}

interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress: (e: KeyboardEvent<HTMLDivElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const MentionInput: React.FC<MentionInputProps> = ({
  onChange,
  onKeyPress,
  placeholder,
  disabled = false,
}) => {
  const { session } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mentionStart, setMentionStart] = useState(-1);
  const [mentions, setMentions] = useState<MentionedContact[]>([]);
  const [currentText, setCurrentText] = useState('');
  const inputRef = useRef<HTMLDivElement>(null);

  const { contacts, setQuery } = useMentions(session?.sessionId || '', 500); // 500ms debounce

  const detectMention = (text: string, cursorPosition: number) => {
    const beforeCursor = text.slice(0, cursorPosition);
    const atIndex = beforeCursor.lastIndexOf('@');

    if (atIndex === -1) {
      return null;
    }

    const afterAt = beforeCursor.slice(atIndex + 1);
    const hasSpace = afterAt.includes(' ');

    if (hasSpace) {
      return null;
    }

    return {
      start: atIndex,
      query: afterAt,
    };
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || '';
    const selection = window.getSelection();
    const cursorPosition = selection ? selection.anchorOffset : 0;

    setCurrentText(text);

    const mention = detectMention(text, cursorPosition);

    if (mention) {
      setMentionStart(mention.start);
      setQuery(mention.query);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setMentionStart(-1);
      setQuery('');
    }

    // Update the actual value that will be sent
    updateValue(text, mentions);
  };

  const handleContactSelect = (contact: Contact) => {
    if (mentionStart === -1 || !inputRef.current) return;

    const newMention: MentionedContact = {
      id: `mention-${Date.now()}`,
      name: contact.name || contact.email,
      email: contact.email,
      startIndex: mentionStart,
      endIndex: mentionStart + contact.email.length + 1, // +1 for @
    };

    const beforeMention = currentText.slice(0, mentionStart);
    const afterMention = currentText.slice(mentionStart);
    const afterAt = afterMention.indexOf(' ');
    const remainingText = afterAt !== -1 ? afterMention.slice(afterAt) : '';

    const newText = `${beforeMention}${contact.name || contact.email}${remainingText}`;
    const updatedMentions = [...mentions, newMention];

    setCurrentText(newText);
    setMentions(updatedMentions);
    setShowDropdown(false);
    setMentionStart(-1);
    setQuery('');

    // Update the display
    inputRef.current.textContent = newText;

    // Update the actual value with email
    updateValue(newText, updatedMentions);

    // Place cursor after the mention
    setTimeout(() => {
      if (inputRef.current) {
        const range = document.createRange();
        const selection = window.getSelection();
        const textNode = inputRef.current.firstChild;

        if (textNode) {
          const newCursorPos = beforeMention.length + (contact.name || contact.email).length;
          range.setStart(textNode, Math.min(newCursorPos, textNode.textContent?.length || 0));
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }

        inputRef.current.focus();
      }
    }, 0);
  };

  const updateValue = (displayText: string, currentMentions: MentionedContact[]) => {
    let actualText = displayText;

    // Replace display names with actual emails in reverse order to maintain indices
    const sortedMentions = [...currentMentions].sort((a, b) => b.startIndex - a.startIndex);

    for (const mention of sortedMentions) {
      const displayName = mention.name;
      const actualEmail = `@${mention.email}`;
      actualText = actualText.replace(displayName, actualEmail);
    }

    onChange(actualText);
  };


  return (
    <div className="relative">
      <div
        ref={inputRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onKeyPress={onKeyPress}
        className={`
          w-full px-3 py-2 sm:px-4 sm:py-3 resize-none rounded-xl sm:rounded-2xl border-2 transition-all duration-200
          min-h-[44px] max-h-[100px] sm:min-h-[52px] sm:max-h-[120px]
          ${disabled
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white border-gray-200 text-gray-800 focus:border-blue-400 focus:bg-white'
          }
          focus:outline-none focus:ring-0 shadow-sm hover:shadow-md focus:shadow-lg
          text-sm sm:text-base
        `}
        style={{
          lineHeight: '1.4'
        }}
        suppressContentEditableWarning={true}
      >
        {!currentText && (
          <span className="text-gray-400 pointer-events-none absolute">
            {placeholder}
          </span>
        )}
      </div>

      <ContactsDropdown
        contacts={contacts}
        onSelect={handleContactSelect}
        visible={showDropdown}
        position={{ top: 0, left: 0 }}
      />
    </div>
  );
};