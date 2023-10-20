import { message } from 'antd';
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('/');

function Test() {
  const sendMessage = () => {
    socket.emit('placeOrder', { message: 'Order successful' }); 
    console.log(message);
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default Test;