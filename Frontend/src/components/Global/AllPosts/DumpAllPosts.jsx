import React, { forwardRef } from "react";
import "../../../css/socialHome.scss";
import SocialSearchBar from "./SocialSearchBar";
import AllPosts from "./Posts";

const DumpAllPosts = forwardRef((props, ref) => {
    const {
        searchTerm,
        handleSearch,
        postsData,
        ShowShareButton,
        handlePostLike,
        handlePostComment,
        height,
        userComment,
        handleCommentChange,
        deletePost
    } = props;

    return (
        <div className="s-main-container">
            <SocialSearchBar
                searchTerm={searchTerm}
                handleSearch={handleSearch}
            />
            <AllPosts
                ref={ref}
                postsData={postsData}
                ShowShareButton={ShowShareButton}
                handlePostLike={handlePostLike}
                handlePostComment={handlePostComment}
                height={height}
                userComment={userComment}
                handleCommentChange={handleCommentChange}
                deletePost={deletePost}
            />
        </div>
    );
});

export default DumpAllPosts;
