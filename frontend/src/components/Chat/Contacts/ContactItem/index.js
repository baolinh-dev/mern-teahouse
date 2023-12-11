import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ContactItem.module.scss';
import { useDispatch } from 'react-redux';
import { setUserOnline } from '~/actions/userOnlineActions';

const cx = classNames.bind({ ...styles, container: 'container' });

function ContactItem({ id, isOnline }) {
    const [user, setUser] = useState({});
    const [activeItems, setActiveItems] = useState([]); // Mảng state để lưu trữ các phần tử đã được click
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/admin/user/${id}`);
                const dataUser = response.data.user;
                setUser(dataUser);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleClick = () => {
        const userName = user.name;
        const userAvatarUrl = user.avatar?.url;
        const userId = user._id;

        setActiveItems((prevItems) => [...prevItems, id]); // Push phần tử vào mảng activeItems

        dispatch(setUserOnline(userName, userAvatarUrl, userId));
    };

    const isActive = activeItems.length > 0 && activeItems[activeItems.length - 1] === id; // Kiểm tra phần tử cuối cùng của mảng activeItems

    console.log('activeItems', activeItems);
    return (
        <div className={cx('box', { active: isActive })} onClick={handleClick}>
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

export default ContactItem;
