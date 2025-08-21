import React, { useState, useEffect, useRef } from 'react';
import { Heart, Send, Smile, Camera, Gift, MapPin, Crown } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 'user123',
      userName: 'Alex',
      userAvatar: '🔥',
      message: "Hey beautiful! How's your day going? 😍",
      timestamp: new Date(Date.now() - 600000),
      isOwn: false,
      reactions: ['❤️', '😍'],
      verified: true,
      mood: 'flirty'
    },
    {
      id: 2,
      userId: 'me',
      userName: 'You',
      userAvatar: '✨',
      message: 'Omg hi! Just got back from the gym 💪 How about you cutie?',
      timestamp: new Date(Date.now() - 300000),
      isOwn: true,
      reactions: ['🔥', '💪'],
      mood: 'energetic'
    },
    {
      id: 3,
      userId: 'user456',
      userName: 'Jordan',
      userAvatar: '👑',
      message: 'Anyone up for coffee later? I know this amazing place ☕✨',
      timestamp: new Date(Date.now() - 120000),
      isOwn: false,
      reactions: ['☕', '😊'],
      verified: true,
      mood: 'chill'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState(12);
  const [isTyping, setIsTyping] = useState(['Alex']);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentMood, setCurrentMood] = useState('happy');
  const messagesEndRef = useRef(null);

  const moods = {
    flirty: { color: 'from-pink-500 to-rose-400', emoji: '😘' },
    energetic: { color: 'from-orange-500 to-amber-400', emoji: '⚡' },
    chill: { color: 'from-blue-500 to-indigo-400', emoji: '😌' },
    happy: { color: 'from-green-500 to-emerald-400', emoji: '😊' },
    romantic: { color: 'from-purple-500 to-pink-400', emoji: '💕' }
  };

  const emojis = ['😍', '🔥', '💕', '✨', '👑', '💎', '🌟', '💫', '🦋', '🌹'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(),
      userId: 'me',
      userName: 'You',
      userAvatar: '✨',
      message: newMessage,
      timestamp: new Date(),
      isOwn: true,
      reactions: [],
      mood: currentMood
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate typing response
    setTimeout(() => {
      const responses = [
        "That's so sweet! 💕",
        "You're amazing! 🔥",
        "Can't wait to meet you! 😍",
        "You made my day! ✨",
        "So cute! 🦋"
      ];
      
      const botMessage = {
        id: Date.now() + 1,
        userId: 'bot',
        userName: 'Secret Admirer',
        userAvatar: '💎',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isOwn: false,
        reactions: ['❤️'],
        verified: true,
        mood: 'romantic'
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  const addReaction = (messageId, emoji) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), emoji] }
        : msg
    ));
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex flex-col">
      {/* Animated Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-4 animate-pulse">✨</div>
          <div className="absolute top-4 right-8 animate-bounce">💫</div>
          <div className="absolute bottom-2 left-1/4 animate-pulse">🌟</div>
          <div className="absolute bottom-4 right-1/3 animate-bounce">💎</div>
        </div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-pink-200 animate-pulse" />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                <span className="text-xs font-bold">3</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">LoveChat</h1>
              <p className="text-pink-200 text-sm">{activeUsers} singles online</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="bg-green-400 rounded-full w-3 h-3 animate-pulse"></div>
            <span className="text-sm font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-white/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} group`}>
            <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
              {/* User Info */}
              <div className={`flex items-center space-x-2 mb-1 ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold">
                    {msg.userAvatar}
                  </div>
                  {msg.verified && (
                    <div className="absolute -top-1 -right-1">
                      <Crown className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-700">{msg.userName}</span>
                {msg.mood && (
                  <span className="text-sm">{moods[msg.mood]?.emoji}</span>
                )}
              </div>

              {/* Message Bubble */}
              <div className={`relative p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
                msg.isOwn 
                  ? `bg-gradient-to-r ${moods[msg.mood]?.color || 'from-blue-500 to-purple-500'} text-white rounded-br-sm` 
                  : 'bg-white/80 text-gray-800 rounded-bl-sm border border-pink-100'
              }`}>
                <p className="break-words">{msg.message}</p>
                <div className={`flex items-center justify-between mt-2 ${msg.isOwn ? 'text-pink-100' : 'text-gray-500'}`}>
                  <span className="text-xs">{formatTime(msg.timestamp)}</span>
                  <div className="flex space-x-1">
                    {msg.reactions?.slice(0, 3).map((reaction, idx) => (
                      <span key={idx} className="text-sm">{reaction}</span>
                    ))}
                    {msg.reactions?.length > 3 && (
                      <span className="text-xs">+{msg.reactions.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Quick Reactions */}
                <div className={`absolute -bottom-2 ${msg.isOwn ? 'left-4' : 'right-4'} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                  <div className="flex space-x-1 bg-white rounded-full px-2 py-1 shadow-lg border">
                    {['❤️', '😍', '🔥', '✨'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => addReaction(msg.id, emoji)}
                        className="hover:scale-125 transition-transform duration-200"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-pink-100">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-600">{isTyping[0]} is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-200/50">
        {/* Mood Selector */}
        <div className="flex justify-center space-x-2 mb-3">
          {Object.entries(moods).map(([mood, config]) => (
            <button
              key={mood}
              onClick={() => setCurrentMood(mood)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                currentMood === mood 
                  ? `bg-gradient-to-r ${config.color} text-white shadow-lg transform scale-105` 
                  : 'bg-white/60 text-gray-600 hover:bg-white/80'
              }`}
            >
              {config.emoji} {mood}
            </button>
          ))}
        </div>

        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Send something sweet... 💕"
              className="w-full p-4 pr-12 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors duration-200"
            >
              <Smile className="h-6 w-6" />
            </button>

            {/* Quick Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-xl border border-pink-200 p-3">
                <div className="grid grid-cols-5 gap-2">
                  {emojis.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setNewMessage(prev => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="hover:scale-125 transition-transform duration-200 text-2xl"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            className={`px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              currentMood ? `bg-gradient-to-r ${moods[currentMood].color} text-white shadow-lg hover:shadow-xl` : 'bg-pink-500 text-white'
            }`}
          >
            <Send className="h-6 w-6" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Camera className="h-4 w-4" />
            <span className="text-sm">Photo</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Gift className="h-4 w-4" />
            <span className="text-sm">Gift</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Meet</span>
          </button>
        </div>
      </div>

      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Heart className="h-4 w-4 text-pink-400 fill-current" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
