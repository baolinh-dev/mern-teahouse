import React, { useState, useEffect } from 'react';
import socket from '~/socket';
import Header from './Header';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MessageItem from './MessageItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './ChatContainer.module.scss';
const cx = classNames.bind({ ...styles, container: 'container' });

function ChatContainer() {
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [userSendId, setUserSendId] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [success, setSuccess] = useState(false); // Thêm state success

    const userOnline = useSelector((state) => state.userOnline);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserSendId(response.data.user._id);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, []);

    useEffect(() => {
        socket.on('msg-recieve', (data) => {
            setReceivedMessage(data);
        });
    }, []);

    useEffect(() => {
        const requestBody = {
            from: userSendId,
            to: userOnline.userId,
        };

        axios
            .post('/api/v1/getmsg', requestBody)
            .then((response) => {
                setChatMessages(response.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy tin nhắn:', error);
            });
    }, [userSendId, userOnline.userId, success, receivedMessage]);

    const handleSendMessage = () => {
        socket.emit('send-msg', { to: userOnline?.userId, msg: message });
        setMessage('');

        const requestBody = {
            from: userSendId,
            to: userOnline?.userId,
            message: message,
        };

        axios
            .post('/api/v1/addmsg', requestBody)
            .then((response) => {
                console.log('Tin nhắn đã được gửi thành công');
                setSuccess(!success); // Khi gửi thành công, setSuccess với giá trị mới để re-render
            })
            .catch((error) => {
                console.error('Lỗi khi gửi tin nhắn:', error);
            });
    };

    return (
        <div className={cx('chat')}>
            <div className={cx('chat-container')}>
                <Header /> 
                <div className={cx('chat-content')}>
                    {chatMessages.map((chatMessage, index) => (
                        <MessageItem key={index} fromSelf={chatMessage.fromSelf} message={chatMessage.message} />
                    ))}
                </div>
            </div>
            <div className={cx('send-msg-box')}> 
                
                <input placeholder='Nhập tin nhắn của bạn ...' value={message} onChange={(e) => setMessage(e.target.value)}></input>
                <button onClick={handleSendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
}

export default ChatContainer;
