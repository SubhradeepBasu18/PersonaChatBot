import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, ArrowLeft, Bot, User } from "lucide-react";
import { chatApi } from "../services/api";

const ChatPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const { 
    personaName = 'AI Assistant',
    personaAvatar = '/default-avatar.png'
  } = state || {};

  const [messages, setMessages] = useState([
    {
      id: '1',
      content: `Hi! I'm ${personaName}. How can I help you today?`,
      sender: 'bot'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user'
    };

    // Add user message to the chat
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    try {
      // Call the API to get bot's response
      const response = await chatApi.sendMessage(userInput, personaName);
      console.log("Response in chatpage: ", response);
      console.log('Persona: ', personaName);
      
      
      
      // Add bot's response to the chat
      setMessages(prev => [...prev, {
        id: Date.now().toString() + 1,
        content: response.reply,
        sender: 'bot'
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message to user
      setMessages(prev => [...prev, {
        id: Date.now().toString() + 1,
        content: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        sender: 'bot',
        isError: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-700">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center ml-4">
          <img 
            src={personaAvatar} 
            alt={personaName}
            className="w-10 h-10 rounded-full"
          />
          <h2 className="ml-3 font-semibold">{personaName}</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'
            }`}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700 rounded-lg px-4 py-2">
              <p>Typing...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 rounded-md bg-gray-800 border border-gray-700 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;