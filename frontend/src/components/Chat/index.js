import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";  
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

const cx = classNames.bind(styles);

function Chat() {
    return (    
        <div className={cx('chat')}> 
            <Contacts /> 
            <ChatContainer /> 
        </div>

    );
}

export default Chat;