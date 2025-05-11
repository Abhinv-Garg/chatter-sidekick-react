
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
}

interface ChatListProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (contactId: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ 
  contacts, 
  selectedContactId, 
  onSelectContact 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex flex-col h-full bg-white border-r border-gray-300",
      isMobile && selectedContactId ? "hidden" : "flex"
    )}>
      <div className="p-4 bg-white text-gray-800 border-b border-gray-300">
        <h1 className="text-xl font-semibold">Messages</h1>
      </div>
      
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full p-2 pl-8 rounded-md border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-2 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={cn(
              "flex items-center p-3 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200",
              selectedContactId === contact.id && "bg-gray-200"
            )}
            onClick={() => onSelectContact(contact.id)}
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span
                className={cn(
                  "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                  contact.status === "online" ? "bg-gray-800" : "bg-gray-400"
                )}
              />
            </div>
            
            <div className="flex-1 ml-3">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">{contact.name}</h2>
                <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate max-w-[150px]">
                  {contact.lastMessage}
                </p>
                
                {contact.unreadCount && contact.unreadCount > 0 && (
                  <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
