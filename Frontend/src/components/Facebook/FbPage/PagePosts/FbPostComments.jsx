import { Avatar, Box, Card, CardContent, CircularProgress, Collapse, IconButton, OutlinedInput, Typography } from '@mui/material'
import React from 'react'
import { Face, Send } from '@mui/icons-material'

const FbPostComments = ({ post, expanded, comments, handleSetComment, handleCreateComment, postComment }) => {
    return (
        <div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {comments?.map((comment, index) => {
                    return (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} >
                            <div style={{ padding: 5, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Avatar src={comment?.from?.picture?.data?.url} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <b>{comment?.from?.name}</b>
                                    <Typography variant='caption' component='span'>{comment?.message}</Typography>
                                </div>
                            </div>
                            {comment?.comments &&
                                <div style={{ marginLeft: '1rem' }}>
                                    {comment?.comments?.data?.map((reply, index) => {
                                        return (
                                            <div key={index} style={{ padding: 5, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <Avatar src={reply?.from?.picture?.data?.url} />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <b>{reply?.from?.name}</b>
                                                    <Typography variant='caption' component='span' > {reply?.message} </Typography>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    )
                }
                )}
                <form
                    onSubmit={(e) => handleCreateComment(e)}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '10px' }}>
                    <Avatar>
                        <Face />
                    </Avatar>
                    <OutlinedInput endAdornment={
                        <Box sx={{ position: 'relative' }}>
                            <IconButton
                                type="submit"
                            // sx={{ color: colors.purpleColor }}
                            >
                                <Send />
                            </IconButton>
                            {postComment?.loader && (
                                <CircularProgress
                                    size={25}
                                    sx={{
                                        position: 'absolute',
                                        top: '20%',
                                        left: '15%',
                                    }}
                                />
                            )}
                        </Box>
                    }
                        required
                        size="small"
                        fullWidth
                        onChange={(e) => handleSetComment(post?.id, e.target.value)} placeholder="Comment here ..."
                    //  value={chat?.sender?.id === fbMessages?.clientId ? fbMessages?.message : ''}

                    />

                </form>
            </Collapse>
        </div>
    )
}

export default FbPostComments
