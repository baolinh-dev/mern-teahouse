import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';
function AdminTest() {
    const [message, setMessage] = useState('');

    const socket = io('/');
    useEffect(() => {
        // Xử lý sự kiện 'orderPlaced' từ máy chủ
        socket.on('orderPlaced', (data) => {
            console.log('Received order placed:', data.message);
            setMessage(data.message);
        });

        // Cleanup khi component unmount
        return () => {
            socket.off('orderPlaced');
        };
    }, []);

    return <div>Thông báo server {message}</div>;
}

export default AdminTest;
