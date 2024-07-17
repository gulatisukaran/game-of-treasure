import { useState } from 'react';
import axios from 'axios';

interface Message {
  id: number;
  sender: string;
  text: string;
}

const ChatDialog1: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const postData = async (userQuestion: string) => {
    try {
      const res = await axios.post('http://localhost:3000/npc/zara', {
        question: userQuestion,
      });
      return res.data; // Return the response data
    } catch (error) {
      console.error('Error fetching data: ', error);
      return { message: 'An error occurred' }; // Return a default error message
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    setLoading(true);

    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'You',
      text: newMessage.trim(),
    };

    // Post the new message and get the response
    const response = await postData(newMsg.text);
    console.log(response);

    // Update the messages state with the new message and the response from the server
    setMessages((prevMessages) => [
      ...prevMessages,
      newMsg,
      { id: prevMessages.length + 2, sender: 'Zara', text: response.rows[0].response },
    ]);

    setNewMessage('');
    setLoading(false);
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewMessage(e.target.value)
            }
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatDialog1;