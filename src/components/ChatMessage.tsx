import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex items-start gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`p-2 rounded-full ${isBot ? 'bg-blue-100' : 'bg-gray-100'}`}>
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isBot ? 'bg-blue-50' : 'bg-gray-50'
        }`}
      >
        <p className="text-gray-800">{message.content}</p>
        <span className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};