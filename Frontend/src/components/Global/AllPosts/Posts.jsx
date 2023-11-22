import React, { forwardRef } from 'react'
import SocialCard from './SocialCard'
import PostSkeleton from '../PostSkeleton'
import '../../../css/Home/socialCard.scss'

const Posts = forwardRef((props, ref) => {
    const {
        postsData,
        handlePostLike,
        handlePostComment,
        userComment,
        handleCommentChange,
        deletePost
    } = props
    return (
        <>
            <div ref={ref} className="s-card-container" >
                {postsData.list?.length === 0 ? <div className="no-post">No Posts Found</div> : <>
                    <div className="s-card-inner">
                        {postsData.list?.map((post, index) =>
                            <SocialCard
                                key={index}
                                postData={post}
                                comments={post?.comments}
                                handlePostLike={handlePostLike}
                                handlePostComment={handlePostComment}
                                userComment={userComment}
                                handleCommentChange={handleCommentChange}
                                deletePost={deletePost}
                            />
                        )}
                        <PostSkeleton loading={postsData.loader} />

                    </div>
                </>}
            </div>
        </>
    )
})

export default Posts
