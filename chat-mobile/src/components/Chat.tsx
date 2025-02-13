import React, { useState, useRef, useEffect } from 'react';
import { NavBar, List, Input, Button, Avatar, SpinLoading } from 'antd-mobile';
import { SendOutline } from 'antd-mobile-icons';
import styles from './Chat.module.css';
import { post } from '../fetch';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}
interface response{
  sessionId: string,
  openid: string,
  respMessage: string,
}
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const url=new URLSearchParams(window.location.search).get('headImgUrl')||''
  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 生成 sessionId
  function generateSessionId() {
    // 检查 localStorage 中是否已经有 sessionId
    let sessionId = window.localStorage.getItem('sessionId');
    
    if (!sessionId) {
      // 如果没有 sessionId，生成一个新的，并保存到 localStorage
      const randomPart = Math.random().toString(36).substr(2, 12); 
      sessionId = `sessionId_${randomPart}`;
      window.localStorage.setItem('sessionId', sessionId); // 保存 sessionId 到 localStorage
    }
    
    return sessionId;
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      // 获取 openid 和生成 sessionId
      const openid = new URLSearchParams(window.location.search).get('openid') || '';
     const sessionid = generateSessionId();
      const reqMessage = userMessage;

      // 发送请求并等待响应
      const response:response = await post('/chatBot/textChat', {
        sessionId: sessionid,
        openid: openid,
        reqMessage: reqMessage.content,
      });

      // AI 响应
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.respMessage || 'AI 没有回应。',
        role: 'assistant',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <NavBar className={styles.navbar}>AI 助手</NavBar>
      
      <div className={styles.messageList}>
        <List>
          {messages.map(message => (
            <List.Item
              key={message.id}
              className={`${styles.messageItem} ${
                message.role === 'user' ? styles.userMessage : styles.aiMessage
              }`}
            >
              <div className={styles.messageContent}>
                <Avatar
                  className={styles.avatar}
                  src={message.role === 'user' ? url : '/ai-avatar.png'}
                />
                <div className={styles.bubble}>{message.content}</div>
              </div>
            </List.Item>
          ))}
        </List>
        {loading && (
          <div className={styles.loading}>
            <SpinLoading />
            <span>AI 正在思考...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <Input
          className={styles.input}
          placeholder="输入消息..."
          value={inputValue}
          onChange={val => setInputValue(val)}
          onEnterPress={handleSend}
        />
        <Button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={loading || !inputValue.trim()}
        >
          <SendOutline />
        </Button>
      </div>
    </div>
  );
};

export default Chat;