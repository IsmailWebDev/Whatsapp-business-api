// components/MessageList.tsx
import { FC } from 'react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 p-2 rounded-lg ${
            message.sender === 'user'
              ? 'bg-blue-100 ml-auto'
              : 'bg-gray-100'
          }`}
        >
          <p className="text-blue-500">{message.text}</p>
          <small className="text-gray-500">{message.timestamp}</small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
