import React, { useState, useEffect } from 'react';
import socket from '~/socket';
import classNames from 'classnames/bind';
import styles from './ChatContainer.module.scss';
import Header from './Header';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MessageItem from './MessageItem';

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
        console.log('userSendId', userSendId, 'userOnline', userOnline.userId);
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
    }, [userSendId, userOnline.userId, success]);

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

    console.log('chatMessages', chatMessages);

    return (
        <div className={cx('chat-container')}>
            <Header />
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <button onClick={handleSendMessage}>Gửi</button>
            </div>
            <div>
                <p>Tin nhắn nhận được: {receivedMessage}</p>
            </div>
            <div>
                <h3>Tin nhắn:</h3>
                {chatMessages.map((chatMessage, index) => (
                    <MessageItem key={index} fromSelf={chatMessage.fromSelf} message={chatMessage.message} />
                ))}
            </div>
        </div>
    );
}

export default ChatContainer;
