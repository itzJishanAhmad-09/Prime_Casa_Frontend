// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react';

// Rule-based response engine
const getResponse = (message) => {
  const lower = message.toLowerCase();

  // Price related
  if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
    if (lower.includes('2 bhk') || lower.includes('2bhk')) {
      return '2 BHK prices start from ₹1.2 Cr in Sector 150 and go up to ₹2.5 Cr in premium projects like Max Estate 128.';
    }
    if (lower.includes('3 bhk') || lower.includes('3bhk')) {
      return '3 BHK prices range from ₹1.8 Cr to ₹3.5 Cr depending on the sector and builder.';
    }
    if (lower.includes('commercial')) {
      return 'Commercial spaces start at ₹90 Lakhs in Gaur Yamuna City and go up to ₹2.8 Cr in Sector 72.';
    }
    return 'Prices vary by sector and project. Please check our Projects section for detailed listings.';
  }

  // RERA
  if (lower.includes('rera') || lower.includes('registered') || lower.includes('verified')) {
    return 'All projects on Prime Casa are 100% RERA verified. You can find RERA IDs on each project detail page.';
  }

  // Sectors
  if (lower.includes('sector') || lower.includes('location')) {
    if (lower.includes('150')) {
      return 'Sector 150 is one of the most premium sectors in Noida, with luxury projects and green surroundings. Prices: ₹13,000–15,000/sq ft.';
    }
    if (lower.includes('128')) {
      return 'Sector 128 is known as the Green Luxury Belt with projects like Max Estate 128 and L&T Green Reserve. Prices: ₹11,500–14,000/sq ft.';
    }
    if (lower.includes('107')) {
      return 'Sector 107 is an upcoming metro-connected area with residential projects like Ace Mahagun Medalleo. Prices: ₹8,000–10,500/sq ft.';
    }
    return 'We cover all major Noida sectors. Use the Sectors section to view detailed price breakdowns.';
  }

  // Amenities
  if (lower.includes('amenities') || lower.includes('facilities') || lower.includes('clubhouse')) {
    return 'Amenities vary by project. Common amenities include swimming pools, gyms, clubhouses, landscaped gardens, kids play areas, and more. Check each project page for full details.';
  }

  // Investment
  if (lower.includes('investment') || lower.includes('return') || lower.includes('appreciation')) {
    return 'Noida real estate has shown strong appreciation. For example, Greater Noida West has seen 98% growth in 5 years. We offer ROI calculators and market insights to help you decide.';
  }

  // Contact / WhatsApp
  if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('call')) {
    return 'You can reach us on WhatsApp at +91 8130504183 or email us at hr@theprimecasa.in. We\'re available Tue–Sun, 11 AM – 7 PM.';
  }

  // Default fallback
  return 'I\'m a bot . I can answer common questions about prices, RERA, sectors, amenities, and investment. If you need more help, please contact us on WhatsApp.';
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi!  Welcome to Prime Casa. Ask me anything about Noida real estate, prices, RERA, sectors, or investment.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate delay and respond
    setTimeout(() => {
      const reply = getResponse(input);
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--red)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 4px 18px rgba(192,57,43,0.4)',
          zIndex: 999,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '160px',
            right: '24px',
            width: '360px',
            maxWidth: '90vw',
            height: '450px',
            background: 'var(--bg)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            zIndex: 999,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              background: 'var(--red)',
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: 600 }}>💬 Prime Casa Bot</span>
            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '12px',
              overflowY: 'auto',
              background: 'var(--bg1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '8px 14px',
                  borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '2px 12px 12px 12px',
                  background: msg.sender === 'user' ? 'var(--red)' : 'var(--bg)',
                  color: msg.sender === 'user' ? '#fff' : 'var(--txt)',
                  border: msg.sender === 'bot' ? '1px solid var(--border)' : 'none',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--txt3)', fontSize: '13px', fontStyle: 'italic' }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '10px 12px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '8px',
              background: 'var(--bg)',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: 'var(--red)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;