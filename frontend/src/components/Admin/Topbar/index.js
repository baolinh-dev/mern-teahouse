import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind({ ...styles, container: 'container' });

function Topbar() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }, [error]);
    return (
        <div className={cx('topbar')}>
            <div className={cx('search')}>
                <input placeholder="Search ..." />
            </div>
            <div className={cx('info-admin')}>
                <img
                    src={
                        userData?.avatar?.url ||
                        'https://th.bing.com/th/id/R.b9838bf721d3dff150c954530b3856f3?rik=Uulm6lnhid2Giw&riu=http%3A%2F%2Fshackmanlab.org%2Fwp-content%2Fuploads%2F2013%2F07%2Fperson-placeholder.jpg&ehk=GGILj1W77t4L5TSfJq0peMYJY8na6RvFj0vx3uPQHkI%3D&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
                    }
                    alt={userData?.name}
                />

                <span>{userData?.name}</span>
            </div>
        </div>
    );
}

export default Topbar;
