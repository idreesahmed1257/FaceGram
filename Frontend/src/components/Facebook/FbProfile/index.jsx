import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFacebookUser, getFbProfile } from './helper';
import DumpFbProfile from './DumpFbProfile';
import { useNavigate } from 'react-router-dom';


const SmartFbProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [fbProfile, setfbProfile] = useState({
        fbProfileData: useSelector(state => state.user?.fbUser),
        fbPages: []
    })

    const responseFacebook = (faceBookData) => {
        console.log("faceBookData", faceBookData)
        if (faceBookData?.accessToken) {
            createFacebookUser(user?.myUser?._id, dispatch, faceBookData, setfbProfile);
        }
    }

    useEffect(() => {
        if (user?.myUser?._id) {
            getFbProfile(user?.myUser?._id, setfbProfile, dispatch)
        }
    }, [user?.myUser?._id])

    const handlePage = (pageId, access_token, cover) => {
        // window.open(`https://www.facebook.com/${pageId}`, '_blank');
        navigate('/fb-page', { state: { pageId: pageId, access_token: access_token, cover: cover } })

    }


    return (
        <div>
            {console.log("fbProfileData", user)}
            <DumpFbProfile responseFacebook={responseFacebook} fbProfile={fbProfile} handlePage={handlePage} />
        </div>
    )
}

export default SmartFbProfile
