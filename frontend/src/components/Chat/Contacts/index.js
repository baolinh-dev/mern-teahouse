import axios from 'axios';
import React, { useState, useEffect } from 'react';
import socket from '~/socket';
import ChatUserItem from './ContactItem';

import classNames from 'classnames/bind';
import styles from './Contacts.module.scss';
import ContactSender from './ContactSender';

const cx = classNames.bind({ ...styles, container: 'container' });

function Contacts({userId}) {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [error, setError] = useState([]);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserRole(response.data.user.role);
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }, [error]);

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

    useEffect(() => {
        socket.emit('add-user', userId);
    }, [userId]);

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
        <div className={cx('contacts')}>
            <div className={cx('contact-scroll')}>
                {userRole === 'admin' && (
                    <>
                        {users.map((user) => (
                            <div key={user._id} className={cx('contact-item')}>
                                <ChatUserItem id={user._id} isOnline={user.isOnline} />
                            </div>
                        ))}
                    </>
                )}
            </div>

            <ContactSender />
        </div>
    );
}

export default Contacts;
