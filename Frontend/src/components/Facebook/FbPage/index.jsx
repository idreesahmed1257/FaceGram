import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getFbPagePosts } from './PagePosts/helper'
import DumpFbPage from './DumpFbPage'
import { getFbPageChats, sendMessageToClient, fbChatsSetter, getNextFbChats, createComment } from './PageChats/helper'
import { io } from 'socket.io-client'

const SmartFbPage = () => {

    const { state } = useLocation()
    // const [socket, setSocket] = useState(null);
    const [fbPosts, setfbPosts] = useState([])
    const [fbChats, setfbChats] = useState([])
    const [fbMessages, setfbMessages] = useState({
        clientId: '',
        message: '',
        loader: false
    })

    const [postComment, setPostComment] = useState({
        objectId: '',
        comment: '',
        loader: false
    })

    const handleSetComment = useCallback((objectId, comment) => {
        setPostComment({
            ...postComment,
            objectId: objectId,
            comment: comment
        })
    }, [postComment])

    const handleCreateComment = useCallback((e) => {
        e.preventDefault();
        setPostComment({
            ...postComment,
            loader: true
        })
        console.log("Post Comment", postComment)
        createComment(state?.access_token, postComment, setfbPosts)
        setPostComment({
            objectId: '',
            comment: '',
            loader: false
        })
    }, [postComment])


    useEffect(() => {
        getFbPagePosts(state?.pageId, state?.access_token, setfbPosts)
        getFbPageChats(state?.pageId, state?.access_token, setfbChats)
    }, [state])


    useEffect(() => {
        const socket = io('http://localhost:5000', {
            cors: {
                origin: 'http://localhost:5000', // Change this to your server's origin
            },
        });
        // setSocket(socket);
        // Listen for incoming messages
        socket.on('notification', (notification) => {
            console.log('Received message:', notification);
            fbChatsSetter(fbChats, setfbChats, notification);
        });

        socket.on('message', (data) => {
            console.log('Connected! with Hello World wala thingL  :', data);
        }
        );

        socket.on('connection', (data) => {
            console.log('Connected!', data);
        }
        );

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleCreateMessage = useCallback((e, clientId) => {
        e.preventDefault();
        setfbMessages({
            ...fbMessages,
            loader: true
        })
        sendMessageToClient(state?.pageId, clientId, fbMessages?.message, state?.access_token, fbChats, setfbChats)
        setfbMessages({
            message: '',
            clientId: '',
            loader: false
        })
    }, [fbChats, fbMessages, state?.access_token, state?.pageId])

    const handleSetMessage = useCallback((clientId, message) => {
        setfbMessages({
            ...fbMessages,
            message: message,
            clientId: clientId
        })
    }, [fbMessages])

    const handleChatPagination = useCallback((pagination, senderId) => {
        console.log("Pagination", pagination)
        console.log("sendId:", senderId)
        getNextFbChats(pagination, state?.access_token, senderId, fbChats, setfbChats)
    }, [fbChats, state?.access_token])

    return (
        <>
            <DumpFbPage fbPosts={fbPosts} fbChats={fbChats} state={state} handleCreateMessage={handleCreateMessage} fbMessages={fbMessages} handleSetMessage={handleSetMessage} handleChatPagination={handleChatPagination} handleSetComment={handleSetComment} handleCreateComment={handleCreateComment} postComment={postComment} />
        </>
    )
}

export default SmartFbPage
