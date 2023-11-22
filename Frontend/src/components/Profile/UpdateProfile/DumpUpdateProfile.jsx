import { Avatar, Button, Card, CardContent, Container, FormControl, FormHelperText, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { handleName } from '../../Global/helpers/Parsers'
import { StyledButtonMain } from '../../Global/styled'

const DumpUpdateProfile = ({ showLoader, user, handleSubmit, submitForm, handlePictureUpload, handleProfilePicture, control, errors, isValid, isDirty, register }) => {
    return (
        <div className="profile-update-container">
            {showLoader && <span className="loader"></span>}
            <Container style={{ opacity: showLoader ? 0.1 : null }} maxWidth="sm">
                <Card className="user-info-card">
                    <h2 style={{ textAlign: 'center' }} className="profile-update-header">Update Your Profile</h2>
                    <CardContent>
                        <Avatar
                            className="avatar"
                            src={handleProfilePicture()}
                        >
                            {handleName(user?.myUser?.userName)}
                        </Avatar>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <Controller
                                name='userProfile'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <FormControl
                                        error={!!errors?.userProfile}
                                        fullWidth  >
                                        <Button variant="outlined" sx={{ textAlign: 'center' }} component="label">
                                            Upload Photo
                                            <input type="file"
                                                accept="image/*"
                                                onChange={handlePictureUpload}
                                                style={{ display: 'none' }} />
                                        </Button>
                                        <FormHelperText>{errors?.userProfile?.message}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='userName'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <FormControl
                                        error={!!errors?.userName}
                                        fullWidth  >
                                        <TextField
                                            label="userName"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            defaultValue={user?.myUser?.userName}
                                            onChange={onChange}
                                        />
                                        <FormHelperText>{errors?.userName?.message}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                            <Button
                                disabled={!isValid || !isDirty}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Update Profile
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default DumpUpdateProfile
