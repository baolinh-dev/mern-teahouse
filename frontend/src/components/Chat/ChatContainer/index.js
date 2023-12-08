import { useState, useEffect } from 'react';
import socket from '~/socket';
import classNames from 'classnames/bind';
import styles from './ChatContainer.module.scss';
import Header from './Header';

const cx = classNames.bind({ ...styles, container: 'container' });

function ChatContainer() {
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');

    useEffect(() => {
        socket.on('msg-recieve', (data) => {
            setReceivedMessage(data);
        });
    }, []);

    const handleSendMessage = () => {
        socket.emit('send-msg', { to: '6572675a3a20affbef613367', msg: message });
        setMessage('');
    };

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
        </div>
    );
}

export default ChatContainer;
