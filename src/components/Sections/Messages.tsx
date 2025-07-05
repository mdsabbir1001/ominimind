import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2, Reply, Search } from 'lucide-react';
import { ContactMessage } from '../../types';
import { getMessages, saveMessages } from '../../utils/storage';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import Header from '../Layout/Header';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'read' && message.read) ||
                         (filterStatus === 'unread' && !message.read);
    
    return matchesSearch && matchesFilter;
  });

  const handleMarkAsRead = (id: string) => {
    const updatedMessages = messages.map(message =>
      message.id === id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const updatedMessages = messages.filter(message => message.id !== id);
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
      setSelectedMessages(selectedMessages.filter(msgId => msgId !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedMessages.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedMessages.length} selected messages?`)) {
      const updatedMessages = messages.filter(message => !selectedMessages.includes(message.id));
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
      setSelectedMessages([]);
    }
  };

  const handleSelectMessage = (id: string) => {
    setSelectedMessages(prev => 
      prev.includes(id) 
        ? prev.filter(msgId => msgId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(msg => msg.id));
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="flex-1 overflow-y-auto">
      <Header title="Messages" onSearch={setSearchQuery} />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Messages</h3>
            <p className="text-sm text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread messages` : 'All messages read'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {selectedMessages.length > 0 && (
              <Button
                onClick={handleBulkDelete}
                variant="danger"
                size="sm"
                icon={Trash2}
              >
                Delete Selected ({selectedMessages.length})
              </Button>
            )}
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'read' | 'unread')}
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No messages found</p>
            </div>
          ) : (
            <div>
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                    onChange={handleSelectAll}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Select All ({filteredMessages.length})
                  </span>
                </label>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !message.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedMessages.includes(message.id)}
                        onChange={() => handleSelectMessage(message.id)}
                      />
                      
                      <div className="flex-shrink-0 mt-1">
                        {message.read ? (
                          <MailOpen className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Mail className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      
                      <div 
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => handleViewMessage(message)}
                      >
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-medium ${!message.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.name}
                          </p>
                          <span className="text-xs text-gray-500">
                            {message.email}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${!message.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {message.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`;
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Reply"
                        >
                          <Reply className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message.id);
                          }}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <MessageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMessage(null);
        }}
        message={selectedMessage}
      />
    </div>
  );
};

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: ContactMessage | null;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, message }) => {
  if (!message) return null;

  const handleReply = () => {
    window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Message Details"
      size="lg"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <p className="text-sm text-gray-900">{message.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-sm text-gray-900">{message.email}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <p className="text-sm text-gray-900">{message.subject}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Received
          </label>
          <p className="text-sm text-gray-600">
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleReply} icon={Reply}>
            Reply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Messages;