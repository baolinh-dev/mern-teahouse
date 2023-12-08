import { useState } from 'react';
import socket from '~/socket'; 
import classNames from 'classnames/bind';
import styles from './ChatContainer.module.scss';
import Header from './Header';

const cx = classNames.bind({ ...styles, container: 'container' });

function ChatContainer() {
    const [message, setMessage] = useState('');
    const handleSendMessage = () => {
        socket.emit('send-msg', { to: 'userId', msg: message });
        setMessage('');
    };
    return (
        <div className={cx('chat-container')}> 
            <Header />
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <button onClick={handleSendMessage}>Gửi</button>
            </div>
        </div>
    );
}

export default ChatContainer;
