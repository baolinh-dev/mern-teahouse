import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import socket from '~/socket';

const Test = () => {
  const [message, setMessage] = useState('');  
  const [responseFromServer, setResponseFromServer] = useState(''); 
  

  const sendMessage = () => {
    // Emit the 'orderSuccessNoti' event with the message
    socket.emit('orderSuccessNoti', { message }); 
    console.log(socket.id);
  };  

  useEffect(() => {
    // Lắng nghe sự kiện 'response' từ server
    socket.on('response', (message) => {
      console.log('Received response:', message); 
      setResponseFromServer(message)
      // TODO: Hiển thị message lên giao diện
    });
  }, []); 



  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button> 
      <p>{responseFromServer}</p>
    </div>
  );
};

export default Test;