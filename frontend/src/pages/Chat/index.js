import axios from 'axios';
import React, { useState, useEffect } from 'react';
import socket from '~/socket';
import ChatUserItem from './ChatUserItem';

import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function Chat() {
    const [chatStarted, setChatStarted] = useState(false);
    const [message, setMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userRole, setUserRole] = useState('');
    const [error, setError] = useState([]);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserId(response.data.user._id);
                setUserRole(response.data.user.role);
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }, [error]);

    console.log('role', userRole);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socket.on('onlineUsers', (onlineUsers) => {
            setOnlineUsers(onlineUsers);
        });

        socket.on('msg-recieve', (message) => {
            console.log('Received message:', message);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });
    }, []);

    console.log('onlineUsers', onlineUsers);

    console.log('userId', userId);
    console.log();

    const handleStartChat = () => {
        // Emit sự kiện 'add-user' đến server
        socket.emit('add-user', userId);

        setChatStarted(true);
    };

    const handleSendMessage = () => {
        // Gửi tin nhắn tới server
        socket.emit('send-msg', { to: userId, msg: message });

        setMessage('');
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/v1/admin/users?page=all');
                const users = response.data.users;
                const updatedUsers = users.map((user) => ({
                    ...user,
                    isOnline: onlineUsers.some((onlineUser) => onlineUser.userId === user._id),
                }));
                const sortedUsers = [
                    ...updatedUsers.filter((user) => user.isOnline),
                    ...updatedUsers.filter((user) => !user.isOnline),
                ];
                setUsers(sortedUsers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, [onlineUsers]);

    return (
        <div>
            {chatStarted ? (
                <>
                    <div>
                        {userRole === 'admin' && (
                            <>
                                {users.map((user) => (
                                    <div key={user._id} className={cx('chat')}>
                                        <ChatUserItem id={user._id} isOnline={user.isOnline} />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <div>
                        {/* Hiển thị cửa sổ chat */}
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        <button onClick={handleSendMessage}>Gửi</button>
                    </div>
                </>
            ) : (
                <button onClick={handleStartChat}>Bắt đầu chat</button>
            )}
        </div>
    );
}

export default Chat;
