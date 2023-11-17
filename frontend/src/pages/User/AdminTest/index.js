import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import socket from '~/socket';

const AdminTest = () => {
  const [responseFromServer, setResponseFromServer] = useState(''); 
  
  useEffect(() => {
        
    socket.on('response', (message) => {
      console.log('Received response:', message); 
      setResponseFromServer(message)
    });
  }, []); 



  return (
    <div>
      <p>{responseFromServer}</p>
    </div>
  );
};

export default AdminTest;