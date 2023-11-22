import { Face, Send } from '@mui/icons-material'
import { Avatar, Box, CircularProgress, IconButton, OutlinedInput } from '@mui/material'
import colors from '../../../../css/variables.scss'
import React from 'react'

const PostMessageForm = ({ handleCreateMessage, chat, fbMessages, handleSetMessage }) => {
    return (
        <form onSubmit={(e) => handleCreateMessage(e, chat?.sender?.id)} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '10px' }}>
            <Avatar
                sx={{
                    backgroundColor: colors.primary,
                }}  >
                <Face />
            </Avatar>
            <OutlinedInput endAdornment={
                <Box sx={{ position: 'relative' }}>
                    <IconButton
                        type="submit"
                        sx={{ color: colors.primary }}
                    >
                        <Send />
                    </IconButton>
                    {fbMessages?.loader && (
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
                onChange={(e) => handleSetMessage(chat?.sender?.id, e.target.value)} placeholder="reply ..." value={chat?.sender?.id === fbMessages?.clientId ? fbMessages?.message : ''}
            />

        </form>
    )
}

export default PostMessageForm
