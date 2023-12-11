import React from 'react';
import classNames from 'classnames/bind';
import styles from './MessageItem.module.scss';
const cx = classNames.bind({ ...styles, container: 'container' });

function MessageItem({ fromSelf, message }) {
  const messageStyle = {
    'text-align': fromSelf ? 'left' : 'right',
  };

  return (
    <div style={messageStyle} className={cx('chat-item')}>
      <p>{message}</p>
    </div>
  );
}

export default MessageItem;