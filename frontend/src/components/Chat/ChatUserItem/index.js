import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ChatUserItem.module.scss';

const cx = classNames.bind({ ...styles, container: 'container' });

function ChatUserItem({ id, isOnline }) {
    const [user, setUser] = useState({});  
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/admin/user/${id}`); 
                console.log( "response.data",  response.data); 
                const dataUser = response.data.user;
                setUser(dataUser);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className={cx('box')}>
            <div className={cx('box-image')}>
                <img src={user.avatar?.url} alt="User Avatar" />
            </div>

            {isOnline ? (
                <div className={cx('status')}>
                    <h3>{user.name}</h3>

                    <div className={cx('status-box')}>
                        <FontAwesomeIcon icon={faCircle} color="green" />
                        <p>Online</p>
                    </div>
                </div>
            ) : (
                <div className={cx('status')}>
                    <h3>{user.name}</h3>
                    <div className={cx('status-box')}>
                        <FontAwesomeIcon icon={faCircle} color="black" />
                        <p>Offline</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatUserItem;
