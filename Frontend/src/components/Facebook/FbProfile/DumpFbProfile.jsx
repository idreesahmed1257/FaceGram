import React from 'react'
import FacebookLogin from 'react-facebook-login';
import { FB_APP_ID } from '../../../assets/variables';
import UserProfileCard from '../../Global/UserProfileCard';
import { Card } from '@mui/material';
import PageCard from './PageCard';
import { useSelector } from 'react-redux';
import '../../../css/Facebook/fbProfile.scss'



const DumpFbProfile = ({ responseFacebook, fbProfile, handlePage }) => {
    const user = useSelector(state => state.user)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {!user?.fbUser?.token ?
                <>
                    <FacebookLogin
                        appId={FB_APP_ID}
                        fields="name,email,picture"
                        scope="read_insights, pages_show_list, business_management, pages_messaging, pages_read_engagement, pages_manage_metadata, pages_read_user_content, pages_manage_ads, pages_manage_posts, pages_manage_engagement, public_profile"
                        callback={responseFacebook}
                        returnScopes={true}
                    />
                </> :
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <UserProfileCard
                        profile_url={fbProfile?.fbProfileData?.picture_url}
                        userName={fbProfile?.fbProfileData?.name}
                        email={''}
                        joiningDate={fbProfile?.fbProfileData?.createdAt}
                        isUserProfile={false}
                        width={"400px"}
                    />
                    <Card className='fbPageCardContainer'>
                        {fbProfile?.fbPages?.map((page, index) => {
                            return (
                                <PageCard key={index} page={page} handlePage={handlePage} />
                            )
                        })
                        }
                    </Card>

                </div>
            }

        </div>
    )
}

export default DumpFbProfile
