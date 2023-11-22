import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SampleWebhook = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            cors: {
                origin: 'http://localhost:5000', // Change this to your server's origin
            },
        });
        setSocket(socket);
        // Listen for incoming messages
        socket.on('notification', (notification) => {
            console.log('Received message:', message);
            setReceivedMessage(oldMessages => [...oldMessages, notification]);
        });

        socket.on('connection', (data) => {
            console.log('Connected!', data);
        }
        );

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
        if (socket && message.trim() !== '') {
            // Send a message to the server
            socket.emit('message', message);
        }
    };

    const urls = 'https://scontent.flhe7-1.fna.fbcdn.net/v/t39.25447-2/380927078_1483851615737190_234568853450217171_n.mp4?_nc_cat=101&vs=c54ed00bb222faec&_nc_vs=HBksFQAYJEdHWjh0QlptbFhRZ2prVUZBTk5XUlNFaFcwRURibWRqQUFBRhUAAsgBABUAGCRHSEh1clJhU1pXTWc2bjhBQUlfLWJEMnh6bEZkYnY0R0FBQUYVAgLIAQBLB4gScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AHXVzZV9sYW5jem9zX2Zvcl92cW1fdXBzY2FsaW5nABFkaXNhYmxlX3Bvc3RfcHZxcwAVACUAHIwXQAAAAAAAAAAREQAAACaUw7HInu1QFQIoAkMzGAt2dHNfcHJldmlldxwXQC4U%2FfO2RaIYIWRhc2hfZ2VuMmh3YmFzaWNfaHEyX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX2hkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUHdW5tdXRlZBNvZW1fcm9pX3JlYWNoX2NvdW50ATIRb2VtX2lzX2V4cGVyaW1lbnQADG9lbV92aWRlb19pZA83NDc5OTE1OTA2NzM2MjUSb2VtX3ZpZGVvX2Fzc2V0X2lkEDIxNjcyNjM2OTAxMzc1NDMVb2VtX3ZpZGVvX3Jlc291cmNlX2lkDzE3Nzc5ODU2ODYyMDIzNBxvZW1fc291cmNlX3ZpZGVvX2VuY29kaW5nX2lkDzY4OTg4NTAwMjY2OTg1Mg52dHNfcmVxdWVzdF9pZAAlAhwAJcQBGweIAXMDNzM2AmNkCjIwMjMtMDktMjEDcmNiATADYXBwC1NodXR0bGUgUHJvAmN0GUNPTlRBSU5FRF9QT1NUX0FUVEFDSE1FTlQTb3JpZ2luYWxfZHVyYXRpb25fcwYxNS4wNDUCdHMVcHJvZ3Jlc3NpdmVfZW5jb2RpbmdzAA%3D%3D&ccb=1-7&_nc_sid=ee8e61&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=RKfgsmuhcqMAX8jiXo3&_nc_ht=scontent.flhe7-1.fna&edm=AKIiGfEEAAAA&oh=00_AfC49y7U8lsv0XA_DdzFi8Nr6bBhWzr0xkWqNIFyjVyH1A&oe=6523D491&_nc_rid=215975288666863'


    const url2 = 'https://www.w3schools.com/tags/movie.mp4'


    const handleSocketConn = () => {
        console.log("object")
        socket.emit('notification', "Hello");
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <video controls muted autoPlay type="video/mp4" >
                <source src={urls} />
            </video>



        </div>
    );
};

export default SampleWebhook;
