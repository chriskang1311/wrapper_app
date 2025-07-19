import React, { useState, useEffect, useRef } from "react";
import { 
  PlusIcon, 
  TrashIcon, 
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

// Profile Form Component
function ProfileForm({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState(profile);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-claude-600 rounded-full flex items-center justify-center">
          {formData.avatar ? (
            <img 
              src={formData.avatar} 
              alt={formData.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <UserIcon className="h-10 w-10 text-white" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-claude-900">Profile Picture</h4>
          <p className="text-sm text-claude-600">Upload a profile picture</p>
          <button
            type="button"
            className="mt-2 px-3 py-1 text-sm bg-claude-600 text-white rounded-lg hover:bg-claude-700 transition-colors"
          >
            Upload Image
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-claude-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-claude-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claude-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-claude-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-claude-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-claude-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claude-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-claude-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-2.5 h-5 w-5 text-claude-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-claude-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claude-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-claude-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-2.5 h-5 w-5 text-claude-400" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-claude-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claude-500 focus:border-transparent"
              placeholder="Enter your location"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-claude-700 mb-2">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-claude-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-claude-500 focus:border-transparent resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>

      {/* Join Date (Read-only) */}
      <div>
        <label className="block text-sm font-medium text-claude-700 mb-2">
          Member Since
        </label>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-claude-400" />
          <input
            type="text"
            value={new Date(formData.joinDate).toLocaleDateString()}
            className="w-full pl-10 pr-3 py-2 border border-claude-300 rounded-lg bg-claude-50 text-claude-600"
            readOnly
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-claude-300 text-claude-700 rounded-lg hover:bg-claude-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-claude-600 text-white rounded-lg hover:bg-claude-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Software developer passionate about AI and technology.",
    joinDate: "2024-01-15",
    avatar: null
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation]);

  // Load conversations from localStorage on component mount
  useEffect(() => {
    const savedConversations = localStorage.getItem('chatConversations');
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      setConversations(parsed);
      
      // If there are saved conversations, load the most recent one
      if (parsed.length > 0) {
        const mostRecent = parsed[parsed.length - 1];
        setCurrentConversation(mostRecent.messages);
        setCurrentConversationId(mostRecent.id);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('chatConversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  // Sort conversations by last message time (most recent first)
  const sortedConversations = [...conversations].sort((a, b) => {
    const aLastMessage = a.messages[a.messages.length - 1];
    const bLastMessage = b.messages[b.messages.length - 1];
    
    if (!aLastMessage && !bLastMessage) return 0;
    if (!aLastMessage) return 1;
    if (!bLastMessage) return -1;
    
    return new Date(bLastMessage.timestamp) - new Date(aLastMessage.timestamp);
  });

  const createNewConversation = () => {
    const newId = Date.now();
    const newConversation = {
      id: newId,
      title: "New Chat",
      messages: [],
      createdAt: new Date().toISOString()
    };
    
    setConversations(prev => [...prev, newConversation]);
    setCurrentConversation([]);
    setCurrentConversationId(newId);
    setSidebarOpen(false);
    inputRef.current?.focus();
  };

  const loadConversation = (conversationId) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation.messages);
      setCurrentConversationId(conversationId);
      setSidebarOpen(false);
    }
  };

  const updateConversationTitle = (conversationId, title) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, title: title }
          : conv
      )
    );
  };

  const generateTitleForConversation = async (conversationId) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (!conversation || conversation.messages.length < 2) return;

    try {
      const res = await fetch("http://localhost:5001/generate-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          conversation: conversation.messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      const data = await res.json();
      if (res.ok && data.title) {
        updateConversationTitle(conversationId, data.title);
      }
    } catch (err) {
      console.error("Failed to generate title:", err);
    }
  };

  const confirmDeleteConversation = (conversationId) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    setConversationToDelete(conversation);
    setShowDeleteModal(true);
  };

  const deleteConversation = () => {
    if (!conversationToDelete) return;
    
    setConversations(prev => prev.filter(conv => conv.id !== conversationToDelete.id));
    
    // If we're deleting the current conversation, create a new one
    if (conversationToDelete.id === currentConversationId) {
      createNewConversation();
    }
    
    setShowDeleteModal(false);
    setConversationToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setConversationToDelete(null);
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  const updateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setShowProfileModal(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    // Add user message to current conversation
    const updatedConversation = [...currentConversation, userMessage];
    setCurrentConversation(updatedConversation);
    
    // Update the conversation in the conversations list
    if (currentConversationId) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentConversationId 
            ? { ...conv, messages: updatedConversation }
            : conv
        )
      );
    }

    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input.trim() })
      });

      const data = await res.json();
      
      if (res.ok) {
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString()
        };

        const finalConversation = [...updatedConversation, assistantMessage];
        setCurrentConversation(finalConversation);

        // Generate a title for the conversation after the first exchange
        if (currentConversationId && conversations.find(conv => conv.id === currentConversationId)?.title === "New Chat") {
          // Wait a moment for the conversation to be updated, then generate title
          setTimeout(() => {
            generateTitleForConversation(currentConversationId);
          }, 500);
        }

        // Update the conversation in the conversations list
        setConversations(prev => 
          prev.map(conv => 
            conv.id === currentConversationId 
              ? { ...conv, messages: finalConversation }
              : conv
          )
        );
      } else {
        const errorMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "Error: " + (data.error || "Something went wrong"),
          timestamp: new Date().toISOString(),
          isError: true
        };

        const finalConversation = [...updatedConversation, errorMessage];
        setCurrentConversation(finalConversation);
        
        setConversations(prev => 
          prev.map(conv => 
            conv.id === currentConversationId 
              ? { ...conv, messages: finalConversation }
              : conv
          )
        );
      }
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Error: Failed to connect to backend. Make sure the Flask server is running on port 5001.",
        timestamp: new Date().toISOString(),
        isError: true
      };

      const finalConversation = [...updatedConversation, errorMessage];
      setCurrentConversation(finalConversation);
      
      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentConversationId 
            ? { ...conv, messages: finalConversation }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen bg-claude-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-claude-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-claude-200">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-6 w-6 text-claude-600" />
              <h1 className="text-lg font-semibold text-claude-900">Wrapper Application</h1>
            </div>
            <button
              onClick={createNewConversation}
              className="p-2 text-claude-600 hover:text-claude-900 hover:bg-claude-100 rounded-lg transition-colors relative group"
              title="Start a new chat"
            >
              <PlusIcon className="h-5 w-5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-claude-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                Start a new chat
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-claude-900"></div>
              </div>
            </button>
          </div>

          {/* Profile Section */}
          <div className="p-4 border-b border-claude-200 bg-claude-50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-claude-600 rounded-full flex items-center justify-center">
                {userProfile.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-6 w-6 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-claude-900 text-sm truncate">
                  {userProfile.name}
                </h3>
                <p className="text-claude-600 text-xs truncate">
                  {userProfile.email}
                </p>
              </div>
              <button
                onClick={openProfileModal}
                className="p-1.5 text-claude-600 hover:text-claude-900 hover:bg-claude-100 rounded-lg transition-colors"
                title="Edit Profile"
              >
                <Cog6ToothIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-2">
            {sortedConversations.length === 0 ? (
              <div className="text-center py-8">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-claude-400 mx-auto mb-4" />
                <p className="text-claude-600 text-sm">No conversations yet</p>
                <p className="text-claude-500 text-xs mt-1">Start a new chat to begin</p>
              </div>
            ) : (
              <div className="space-y-1">
                {sortedConversations.map((conversation) => {
                  const lastMessage = conversation.messages[conversation.messages.length - 1];
                  const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp) : new Date(conversation.createdAt);
                  
                  return (
                    <div
                      key={conversation.id}
                      className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        conversation.id === currentConversationId
                          ? 'bg-claude-100 text-claude-900'
                          : 'hover:bg-claude-50 text-claude-700'
                      }`}
                    >
                      <button
                        onClick={() => loadConversation(conversation.id)}
                        className="flex-1 text-left min-w-0"
                      >
                        <div className="font-medium text-sm truncate">
                          {conversation.title}
                        </div>
                        <div className="text-xs text-claude-500 mt-1">
                          {lastMessageTime.toLocaleDateString()} • {lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </button>
                      <button
                        onClick={() => confirmDeleteConversation(conversation.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-claude-400 hover:text-red-500 transition-all"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-claude-200 bg-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-claude-600 hover:text-claude-900 hover:bg-claude-100 rounded-lg"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <SparklesIcon className="h-5 w-5 text-claude-600" />
            <span className="font-semibold text-claude-900">Wrapper Application</span>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-white">
          {currentConversation.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md mx-auto px-4">
                <SparklesIcon className="h-16 w-16 text-claude-400 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-claude-900 mb-2">
                  Welcome to Wrapper Application
                </h2>
                <p className="text-claude-600 mb-8">
                  I'm here to help you with any questions or tasks. What would you like to know?
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
              {currentConversation.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-claude-600 text-white ml-3' 
                        : 'bg-claude-100 text-claude-600 mr-3'
                    }`}>
                      {message.role === 'user' ? (
                        <UserIcon className="h-4 w-4" />
                      ) : (
                        <SparklesIcon className="h-4 w-4" />
                      )}
                    </div>
                    <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-claude-600 text-white'
                          : message.isError
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : 'bg-claude-50 text-claude-900'
                                             }`}>
                         <div className="max-w-none">
                           <p className="whitespace-pre-wrap">{message.content}</p>
                         </div>
                      </div>
                      <div className={`text-xs text-claude-500 mt-2 ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-3xl">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-claude-100 text-claude-600 flex items-center justify-center mr-3">
                      <SparklesIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block px-4 py-3 rounded-2xl bg-claude-50">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-claude-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-claude-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-claude-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-claude-200 bg-white p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message Wrapper Application..."
                  className="w-full px-4 py-3 border border-claude-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-claude-500 focus:border-transparent resize-none"
                  rows="1"
                  disabled={isLoading}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 bg-claude-600 text-white rounded-xl hover:bg-claude-700 disabled:bg-claude-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="text-xs text-claude-500 mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <TrashIcon className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-claude-900">
                Delete Conversation
              </h3>
            </div>
            
            <p className="text-claude-600 mb-6">
              Are you sure you want to delete this conversation? This cannot be undone.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 border border-claude-300 text-claude-700 rounded-lg hover:bg-claude-50 transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={deleteConversation}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-claude-900">
                Edit Profile
              </h3>
              <button
                onClick={closeProfileModal}
                className="p-2 text-claude-400 hover:text-claude-600 hover:bg-claude-100 rounded-lg transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ProfileForm 
              profile={userProfile} 
              onSave={updateProfile} 
              onCancel={closeProfileModal} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;