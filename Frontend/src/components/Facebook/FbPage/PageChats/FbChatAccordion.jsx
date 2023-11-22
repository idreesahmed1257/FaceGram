import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Card, Typography } from '@mui/material'
import React from 'react'
import colors from '../../../../css/variables.scss'
import PostMessageForm from './PostMessageForm'
import { FbChatChip } from './styled'
const FbChatAccordion = ({ chat, pageId, handleCreateMessage, fbMessages, handleSetMessage, handleChatPagination }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
            >
                <Typography>{chat?.sender?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className='fb-chat-container'>
                <Typography onClick={() => handleChatPagination(chat?.pagination, chat?.sender?.id)} variant='caption' className='fb-chat-pagination-btn' >see more</Typography>
                {chat?.messages?.map((message, i) => (
                    <div key={i} style={{ alignSelf: message?.id === pageId ? 'flex-end' : 'flex-start', }}>
                        {message?.text &&
                            <FbChatChip
                                label={message?.text}
                                sx={{
                                    backgroundColor: message?.id === pageId ? colors.vanilla : colors.sandyBrown,
                                }}
                                image={message?.image}
                            />}
                        {message?.image &&
                            <Card>
                                <img src={message?.image} width={200} height={200} alt='No' />
                            </Card>
                        }
                    </div>
                ))}
            </AccordionDetails>
            <PostMessageForm handleCreateMessage={handleCreateMessage} chat={chat} fbMessages={fbMessages} handleSetMessage={handleSetMessage} />
        </Accordion >
    )
}

export default FbChatAccordion
