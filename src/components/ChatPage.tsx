
import React, { useState } from 'react';
import ChatList from './ChatList';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data
const mockContacts = [
  {
    id: '1',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online' as const,
    lastMessage: 'Hey, how are you doing?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'offline' as const,
    lastMessage: 'Can you send me that document?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'online' as const,
    lastMessage: 'The meeting is at 2 PM',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '4',
    name: 'Mike Williams',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'offline' as const,
    lastMessage: 'Thanks for your help!',
    lastMessageTime: 'Monday',
    unreadCount: 0,
  },
  {
    id: '5',
    name: 'Lisa Taylor',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'online' as const,
    lastMessage: 'Looking forward to seeing you',
    lastMessageTime: 'Monday',
    unreadCount: 0,
  },
];

const mockMessages = {
  '1': [
    {
      id: '1',
      content: 'Hey there! How are you?',
      timestamp: '10:00 AM',
      sender: 'contact' as const,
      read: true,
    },
    {
      id: '2',
      content: 'I\'m good, thanks! How about you?',
      timestamp: '10:05 AM',
      sender: 'user' as const,
      read: true,
    },
    {
      id: '3',
      content: 'I\'m doing well. Did you get a chance to look at the project proposal I sent over?',
      timestamp: '10:10 AM',
      sender: 'contact' as const,
      read: true,
    },
    {
      id: '4',
      content: 'Yes, I did. It looks great! I have a few comments though.',
      timestamp: '10:15 AM',
      sender: 'user' as const,
      read: true,
    },
    {
      id: '5',
      content: 'Great! What are your thoughts?',
      timestamp: '10:20 AM',
      sender: 'contact' as const,
      read: true,
    },
    {
      id: '6',
      content: 'I think we should focus more on the mobile experience. More and more users are accessing our app from their phones.',
      timestamp: '10:25 AM',
      sender: 'user' as const,
      read: false,
    },
  ],
  '2': [
    {
      id: '1',
      content: 'Hey, can you send me that document we discussed in the meeting?',
      timestamp: 'Yesterday',
      sender: 'contact' as const,
      read: true,
    },
    {
      id: '2',
      content: 'Sure, I\'ll send it over right away.',
      timestamp: 'Yesterday',
      sender: 'user' as const,
      read: true,
    },
    {
      id: '3',
      content: 'Thanks!',
      timestamp: 'Yesterday',
      sender: 'contact' as const,
      read: true,
    },
  ],
  '3': [
    {
      id: '1',
      content: 'Just a reminder that we have a meeting tomorrow at 2 PM',
      timestamp: 'Yesterday',
      sender: 'contact' as const,
      read: true,
    },
    {
      id: '2',
      content: 'Thanks for the reminder! I\'ll be there.',
      timestamp: 'Yesterday',
      sender: 'user' as const,
      read: true,
    },
  ],
  '4': [
    {
      id: '1',
      content: 'Thanks for helping me out with that problem.',
      timestamp: 'Monday',
      sender: 'contact' as const,
      read: true,
    },
    {
      id: '2',
      content: 'No problem at all! Happy to help anytime.',
      timestamp: 'Monday',
      sender: 'user' as const,
      read: true,
    },
  ],
  '5': [
    {
      id: '1',
      content: 'Are we still on for lunch next week?',
      timestamp: 'Monday',
      sender: 'contact' as const,
      read: true,
    },
    {
      id: '2',
      content: 'Absolutely! I\'m looking forward to it.',
      timestamp: 'Monday',
      sender: 'user' as const,
      read: true,
    },
    {
      id: '3',
      content: 'Great! See you then.',
      timestamp: 'Monday',
      sender: 'contact' as const,
      read: true,
    },
  ],
};

export const ChatPage: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, any[]>>(mockMessages);
  const isMobile = useIsMobile();

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
  };

  const handleSendMessage = (message: string) => {
    if (selectedContactId) {
      const newMessage = {
        id: Date.now().toString(),
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'user' as const,
        read: false,
      };
      
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedContactId]: [...(prevMessages[selectedContactId] || []), newMessage],
      }));
    }
  };

  const handleBackClick = () => {
    setSelectedContactId(null);
  };

  const selectedContact = selectedContactId 
    ? mockContacts.find(contact => contact.id === selectedContactId) || null 
    : null;

  return (
    <div className="flex h-screen bg-white text-gray-800">
      {/* Left sidebar - ChatList */}
      <div className={`${isMobile ? 'w-full' : 'w-1/3'} border-r border-gray-300`}>
        <ChatList
          contacts={mockContacts}
          selectedContactId={selectedContactId}
          onSelectContact={handleSelectContact}
        />
      </div>

      {/* Right main chat area */}
      <div 
        className={`${isMobile ? 'w-full' : 'w-2/3'} flex flex-col ${
          isMobile && !selectedContactId ? 'hidden' : 'flex'
        }`}
      >
        {/* Messages component */}
        <Messages 
          messages={selectedContactId ? messages[selectedContactId] || [] : []}
          contact={selectedContact}
          onBackClick={handleBackClick}
          isMobile={isMobile}
        />
        
        {/* Message input component */}
        {selectedContactId && (
          <MessageInput onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
