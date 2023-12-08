import ChatContainer from './ChatContainer';
import Contacts from './Contacts';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

const cx = classNames.bind(styles);

function Chat({ userId }) { 

    console.log("userIdChat2", userId);

    return (
        <div className={cx('chat')}>
            <Contacts userId={userId} />
            <ChatContainer />
        </div>
    );
}

export default Chat;
