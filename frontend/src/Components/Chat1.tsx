import { useState } from 'react';

interface Message {
  id: number;
  sender: string;
  text: string;
}

const ChatDialog1: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Zara', text: 'Hey Bob, how are you?' },
    { id: 2, sender: 'You', text: 'Hi Alice! I\'m doing great, thanks for asking. How about you?' },
  ]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [currentSender, setCurrentSender] = useState<'Zara' | 'You'>('Zara');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: messages.length + 1,
      sender: currentSender,
      text: newMessage.trim(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setCurrentSender(currentSender === 'Zara' ? 'You' : 'Zara');
  };

  return (
    <div className="flex flex-col h-[500px] w-[300px] border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'Zara' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${
                message.sender === 'Zara'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              <p className="font-bold text-xs">{message.sender}</p>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatDialog1;