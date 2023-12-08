import classNames from 'classnames/bind';
import styles from './ContactSender.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind({ ...styles, container: 'container' });

function ContactSender() {  
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, []); 

    console.log("userData", userData); 

    return ( 
        <div className={cx('sender')}>  
            <div className={cx('sender-img')}>  
                <img src={userData?.avatar?.url}/>
            </div> 
            <div className={cx('sender-infor')}>  
                <h3>{userData?.name}</h3>
                <p>{userData?.email}</p>
            </div> 

        </div>
     );
}

export default ContactSender;