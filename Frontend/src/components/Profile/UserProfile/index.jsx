import React from "react";
import UserProfileCard from "../../Global/UserProfileCard";
import AllPosts from "../../Global/AllPosts";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";


const SmartUserProfile = () => {
    const user = useSelector(state => state.user)
    return (
        <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'flex-start'}>
            <AllPosts id={user?.myUser?._id} />
            <UserProfileCard profile_url={user?.myUser?.userProfile} userName={user?.myUser?.userName} email={user?.myUser?.email} joiningDate={user?.myUser?.createdAt} isUserProfile={true} width={"300px"}
            />
        </Box>

    );
};

export default SmartUserProfile;
