import React from 'react';

function MessageItem({ fromSelf, message }) {
  const messageStyle = {
    'text-align': fromSelf ? 'left' : 'right',
  };

  return (
    <div style={messageStyle}>
      <p>{message}</p>
    </div>
  );
}

export default MessageItem;