import { Avatar, Button, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { handleDate, handleName, handleNameUpperCase } from './helpers/Parsers'
import colors from "../../css/variables.scss"
import '../../css/profile/profileCards.scss'
import { useNavigate } from 'react-router-dom'
import { IMAGE_URL } from '../../assets/variables'
import { StyledButtonMain } from './styled'
import profileBg from '../../assets/img/profileBg.jpg'


const UserProfileCard = ({ profile_url, userName, email, joiningDate, isUserProfile, width, coverPhoto }) => {
    const navigate = useNavigate()
    return (
        <Card className='profile-card-container' sx={{ width: width }}>
            <img src={coverPhoto ? coverPhoto : profileBg} className='profile-cover' alt="cover" />
            <Grid className='profile-picture-container'>
                {isUserProfile ?
                    <Avatar alt="User Picture"
                        src={`${IMAGE_URL}${profile_url}`}
                        className='profile-picture'
                        sx={{ bgcolor: colors.vanilla, }}>
                        {handleName(userName)}
                    </Avatar>
                    :
                    <Avatar alt="User Picture"
                        src={profile_url}
                        className='profile-picture'
                        sx={{ bgcolor: colors.vanilla }}>
                        {handleName(userName)}
                    </Avatar>
                }
            </Grid>
            <Grid className='profile-data'>
                <Typography >
                    {handleNameUpperCase(userName)}
                </Typography>
                {email &&
                    <Typography >
                        {email}
                    </Typography>}
                <Typography  >
                    Joined: {handleDate(joiningDate)}
                </Typography>
            </Grid>
            <Grid>
                {isUserProfile &&
                    <Button variant='contained' onClick={() => navigate('/updateProfile')}>Update Profile</Button>}
            </Grid>
        </Card>
    )
}

export default UserProfileCard
