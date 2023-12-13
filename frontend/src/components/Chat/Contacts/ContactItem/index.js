import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ContactItem.module.scss';
import { useDispatch } from 'react-redux';
import { setUserOnline } from '~/redux/actions/userOnlineActions';

const cx = classNames.bind({ ...styles, container: 'container' });

function ContactItem({ id, isOnline }) {
    const [user, setUser] = useState({});
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

        dispatch(setUserOnline(userName, userAvatarUrl, userId));
    };

    return (
        <div className={cx('box')} onClick={handleClick}>
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
