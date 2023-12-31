import AdminLayout from '~/layouts/AdminLayout';
import Chat from '~/components/Chat';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ChatAdmin() {  
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        axios
            .get('/api/v1/me')
            .then((response) => {
                setUserId(response.data.user._id);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }, []); 

    if (userId === null) {
        return <div>Loading...</div>;
    }

    return (
        <AdminLayout>
            <Chat userId={userId}/>
        </AdminLayout>
    );
}

export default ChatAdmin;