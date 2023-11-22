import React, { memo } from 'react'
import FbPost from './FbPost'
const SmartPagePosts = ({ fbPosts, postComment, handleCreateComment, handleSetComment }) => {
    return (
        <div className='fb-posts-container'>
            {fbPosts?.map((post, i) => (
                <FbPost key={i} post={post} handleCreateComment={handleCreateComment} handleSetComment={handleSetComment} postComment={postComment} />
            ))}
        </div>
    )
}

export default memo(SmartPagePosts)
