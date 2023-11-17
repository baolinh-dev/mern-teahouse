import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '~/socket';
import casual from 'casual-browserify';
import { addNotification } from '~/actions/notificationActions';

const Test = () => {
    const [content, setContent] = useState('');
    const [responseFromServer, setResponseFromServer] = useState('');
    const notifications = useSelector((state) => state.notifications);
    const dispatch = useDispatch();

    console.log('notifications', Array.isArray(notifications));

    useEffect(() => {
        socket.emit('sendNotifications', notifications);
    }, [notifications]);

    const sendNotification = () => {
        const newNotification = {
            authorAvatar: `avatar ${casual.uuid}`,
            content: content,
            id: casual.uuid,
            date: Date.now(),
        };
        const action = addNotification(newNotification);
        dispatch(action);
    };

    return (
        <div>
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={sendNotification}>Send</button>
            <p>{responseFromServer}</p>
        </div>
    );
};

export default Test;