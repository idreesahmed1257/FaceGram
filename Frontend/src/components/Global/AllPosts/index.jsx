import React, { useCallback, useEffect, useRef, useState } from "react";
import DumpAllPosts from "./DumpAllPosts";
import { DEFAULT_USER_COMMENT, DEFAULT_USER_POST_DATA, createComment, getAllPosts, likePost } from "./helper";
import { useSelector } from "react-redux";
import { deletePostHelper } from "./helper";


const AllPosts = ({ id }) => {
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    const [userComment, setUserComment] = useState(DEFAULT_USER_COMMENT)
    const [postsData, setPostsdata] = useState(DEFAULT_USER_POST_DATA)
    const containerRef = useRef(null);

    useEffect(() => {
        getAllPosts(postsData, setPostsdata, id);
    }, []);

    useEffect(() => {
        getAllPosts(postsData, setPostsdata, id);
    }, []);


    const handlePostLike = (postId) => {
        console.log(postId)
        likePost(postId, auth, user, setPostsdata)
    }

    const handlePostComment = (postId) => {
        console.log(postId)
        console.log(userComment)
        createComment(auth, postId, userComment, setUserComment, setPostsdata, user)
    }

    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            if (
                container.scrollTop + container.clientHeight + 1 >=
                container.scrollHeight && postsData.loader
            ) {
                getAllPosts(postsData, setPostsdata, id);
            }
        }
    }

    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postsData]);

    const handleCommentChange = useCallback((comment, postId) => {
        setUserComment({
            ...userComment,
            postId: postId,
            comment: comment
        })
    }, [])

    const handleSearch = (text) => {
        let newPosts = {
            page: 1,
            list: [],
            search: text,
            loader: true
        }
        setPostsdata({
            page: 1,
            list: [],
            search: postsData?.search,
            loader: true
        })
        if (text?.length > 3 || text?.length === 0)
            getAllPosts(newPosts, setPostsdata, id);
    }


    const updateDeletedPost = (deletedPost) => {
        setPostsdata(prevPosts => ({
            ...prevPosts,
            list: prevPosts.list.filter(post => post._id !== deletedPost._id)
        }))
    }

    const deletePost = async (postId) => {
        deletePostHelper(postId, updateDeletedPost)
    };

    return (
        <>
            <DumpAllPosts
                ref={containerRef}
                handleSearch={handleSearch}
                postsData={postsData}
                ShowShareButton={true}
                handlePostLike={handlePostLike}
                handlePostComment={handlePostComment}
                height={'78vh'}
                userComment={userComment}
                handleCommentChange={handleCommentChange}
                deletePost={deletePost}
            />
        </>
    );
};

export default AllPosts;
