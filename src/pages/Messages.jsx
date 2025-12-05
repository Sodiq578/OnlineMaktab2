// src/pages/Messages.js
import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaUserCircle, 
  FaPaperPlane, 
  FaSearch, 
  FaFilter,
  FaReply,
  FaTrash,
  FaArchive,
  FaStar,
  FaRegStar,
  FaClock,
  FaCheckDouble,
  FaEllipsisV
} from 'react-icons/fa';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "O'qituvchi Ali",
      avatar: "https://i.pravatar.cc/150?img=1",
      subject: "Yangi dars haqida",
      content: "Yangi dars materiallari tayyor. Siz ham ko'rib chiqishingiz mumkin.",
      time: "10:30 AM",
      date: "Bugun",
      unread: true,
      important: true,
      attachments: 2
    },
    {
      id: 2,
      sender: "Platforma Admin",
      avatar: "https://i.pravatar.cc/150?img=2",
      subject: "Yangi kurslar qo'shildi",
      content: "Platformamizga yangi kurslar qo'shildi. Ko'rib chiqing.",
      time: "Kecha, 15:45",
      date: "Kecha",
      unread: false,
      important: false,
      attachments: 0
    },
    {
      id: 3,
      sender: "O'quvchi Markazi",
      avatar: "https://i.pravatar.cc/150?img=3",
      subject: "Test natijalari",
      content: "Oxirgi test natijalaringiz tayyor. Profilingizda ko'rishingiz mumkin.",
      time: "3 kun oldin",
      date: "3 kun",
      unread: false,
      important: true,
      attachments: 1
    },
    {
      id: 4,
      sender: "Texnik Qo'llab-quvvat",
      avatar: "https://i.pravatar.cc/150?img=4",
      subject: "Tizim yangilanishi",
      content: "Platformamizda yangi funksiyalar qo'shildi. Yangiliklarni ko'rib chiqing.",
      time: "1 hafta oldin",
      date: "1 hafta",
      unread: false,
      important: false,
      attachments: 0
    },
    {
      id: 5,
      sender: "Kurs Hamkori",
      avatar: "https://i.pravatar.cc/150?img=5",
      subject: "Loyiha haqida",
      content: "Birgalikda loyiha ustida ishlashni taklif qilaman.",
      time: "2 hafta oldin",
      date: "2 hafta",
      unread: false,
      important: false,
      attachments: 3
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    content: ''
  });
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    // Mark first message as selected by default
    if (messages.length > 0 && !selectedMessage) {
      setSelectedMessage(messages[0]);
    }
  }, [messages]);

  const handleMarkAsRead = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, unread: false } : msg
    ));
  };

  const handleToggleImportant = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, important: !msg.important } : msg
    ));
  };

  const handleDeleteMessage = (messageId) => {
    if (window.confirm("Xabarni o'chirishni istaysizmi?")) {
      setMessages(messages.filter(msg => msg.id !== messageId));
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(messages.length > 1 ? messages[0] : null);
      }
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.to && newMessage.subject && newMessage.content) {
      const newMsg = {
        id: messages.length + 1,
        sender: "Siz",
        avatar: "https://i.pravatar.cc/150?img=8",
        subject: newMessage.subject,
        content: newMessage.content,
        time: "Hozir",
        date: "Bugun",
        unread: false,
        important: false,
        attachments: 0,
        sent: true
      };
      setMessages([newMsg, ...messages]);
      setNewMessage({ to: '', subject: '', content: '' });
      setShowNewMessage(false);
      alert("Xabar yuborildi!");
    }
  };

  const handleReply = () => {
    if (replyContent.trim() && selectedMessage) {
      const replyMsg = {
        id: messages.length + 1,
        sender: "Siz",
        avatar: "https://i.pravatar.cc/150?img=8",
        subject: `Re: ${selectedMessage.subject}`,
        content: replyContent,
        time: "Hozir",
        date: "Bugun",
        unread: false,
        important: false,
        attachments: 0,
        sent: true,
        isReply: true
      };
      setMessages([replyMsg, ...messages]);
      setReplyContent('');
      alert("Javobingiz yuborildi!");
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'unread') return matchesSearch && message.unread;
    if (filter === 'important') return matchesSearch && message.important;
    if (filter === 'with-attachments') return matchesSearch && message.attachments > 0;
    
    return matchesSearch;
  });

  const getMessageCount = (type) => {
    switch(type) {
      case 'all': return messages.length;
      case 'unread': return messages.filter(m => m.unread).length;
      case 'important': return messages.filter(m => m.important).length;
      case 'with-attachments': return messages.filter(m => m.attachments > 0).length;
      default: return 0;
    }
  };

  return (
    <div className="messages-page">
      <div className="messages-container">
        {/* Header */}
        <div className="messages-header">
          <h1 className="page-title">
            <FaEnvelope /> Xabarlar
          </h1>
          <button 
            className="new-message-btn"
            onClick={() => setShowNewMessage(true)}
          >
            <FaPaperPlane /> Yangi xabar
          </button>
        </div>

        <div className="messages-content">
          {/* Left Sidebar - Message List */}
          <div className="messages-sidebar">
            <div className="search-section">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Xabarlarni qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <div className="filter-section">
                <div className="filter-header">
                  <FaFilter /> Filtrlar
                </div>
                <div className="filter-buttons">
                  <button 
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                  >
                    Barchasi <span className="count-badge">{getMessageCount('all')}</span>
                  </button>
                  <button 
                    className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
                    onClick={() => setFilter('unread')}
                  >
                    O'qilmagan <span className="count-badge">{getMessageCount('unread')}</span>
                  </button>
                  <button 
                    className={`filter-btn ${filter === 'important' ? 'active' : ''}`}
                    onClick={() => setFilter('important')}
                  >
                    Muhim <span className="count-badge">{getMessageCount('important')}</span>
                  </button>
                  <button 
                    className={`filter-btn ${filter === 'with-attachments' ? 'active' : ''}`}
                    onClick={() => setFilter('with-attachments')}
                  >
                    Ilovalari bor <span className="count-badge">{getMessageCount('with-attachments')}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="messages-list">
              {filteredMessages.length === 0 ? (
                <div className="no-messages">
                  <FaEnvelope className="empty-icon" />
                  <p>Xabarlar topilmadi</p>
                </div>
              ) : (
                filteredMessages.map(message => (
                  <div
                    key={message.id}
                    className={`message-preview ${selectedMessage?.id === message.id ? 'active' : ''} ${message.unread ? 'unread' : ''}`}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (message.unread) handleMarkAsRead(message.id);
                    }}
                  >
                    <div className="message-avatar">
                      <img src={message.avatar} alt={message.sender} />
                      {message.unread && <span className="unread-dot"></span>}
                    </div>
                    
                    <div className="message-info">
                      <div className="message-header">
                        <span className="sender-name">{message.sender}</span>
                        <span className="message-time">
                          <FaClock /> {message.time}
                        </span>
                      </div>
                      
                      <div className="message-subject">{message.subject}</div>
                      
                      <div className="message-excerpt">
                        {message.content.substring(0, 60)}...
                      </div>
                      
                      <div className="message-meta">
                        {message.attachments > 0 && (
                          <span className="attachment-badge">
                            📎 {message.attachments}
                          </span>
                        )}
                        {message.important && (
                          <span className="important-badge">
                            <FaStar /> Muhim
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="message-actions">
                      <button 
                        className="action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleImportant(message.id);
                        }}
                      >
                        {message.important ? <FaStar /> : <FaRegStar />}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Panel - Message View */}
          <div className="message-view">
            {selectedMessage ? (
              <>
                <div className="message-header">
                  <div className="header-left">
                    <div className="sender-avatar">
                      <img src={selectedMessage.avatar} alt={selectedMessage.sender} />
                    </div>
                    <div className="sender-info">
                      <h3 className="sender-name">{selectedMessage.sender}</h3>
                      <p className="message-subject">{selectedMessage.subject}</p>
                      <div className="message-time">
                        <FaClock /> {selectedMessage.time} • {selectedMessage.date}
                      </div>
                    </div>
                  </div>
                  
                  <div className="header-actions">
                    <button 
                      className="action-btn"
                      onClick={() => handleToggleImportant(selectedMessage.id)}
                    >
                      {selectedMessage.important ? <FaStar /> : <FaRegStar />}
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => setShowNewMessage(true)}
                    >
                      <FaReply />
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                    >
                      <FaTrash />
                    </button>
                    <button className="action-btn">
                      <FaEllipsisV />
                    </button>
                  </div>
                </div>
                
                <div className="message-body">
                  <div className="message-content">
                    {selectedMessage.content}
                    
                    {selectedMessage.attachments > 0 && (
                      <div className="attachments-section">
                        <h4>Ilovalar ({selectedMessage.attachments})</h4>
                        <div className="attachments-list">
                          <div className="attachment-item">
                            <div className="attachment-icon">📄</div>
                            <div className="attachment-info">
                              <div className="attachment-name">Dars materiallari.pdf</div>
                              <div className="attachment-size">2.4 MB</div>
                            </div>
                            <button className="download-btn">Yuklab olish</button>
                          </div>
                          <div className="attachment-item">
                            <div className="attachment-icon">📊</div>
                            <div className="attachment-info">
                              <div className="attachment-name">Test natijalari.xlsx</div>
                              <div className="attachment-size">1.1 MB</div>
                            </div>
                            <button className="download-btn">Yuklab olish</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="message-reply">
                    <h4>Javob yozish</h4>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Xabaringizni bu yerga yozing..."
                      className="reply-textarea"
                      rows="4"
                    />
                    <div className="reply-actions">
                      <button className="send-btn" onClick={handleReply}>
                        <FaPaperPlane /> Yuborish
                      </button>
                      <button className="cancel-btn" onClick={() => setReplyContent('')}>
                        Tozalash
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-message-selected">
                <FaEnvelope className="empty-icon" />
                <h3>Xabarni tanlang</h3>
                <p>Xabarni ko'rish uchun chap paneldan tanlang</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="new-message-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Yangi xabar</h2>
              <button 
                className="close-btn"
                onClick={() => setShowNewMessage(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSendMessage} className="message-form">
              <div className="form-group">
                <label>Qabul qiluvchi:</label>
                <input
                  type="text"
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                  placeholder="Email yoki ism"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Mavzu:</label>
                <input
                  type="text"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  placeholder="Xabar mavzusi"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Xabar:</label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                  placeholder="Xabar matni..."
                  rows="6"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowNewMessage(false)}>
                  Bekor qilish
                </button>
                <button type="submit" className="send-btn">
                  <FaPaperPlane /> Yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;