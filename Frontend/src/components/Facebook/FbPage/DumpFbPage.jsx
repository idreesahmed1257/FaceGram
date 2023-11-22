import React from 'react'
import SmartPageChats from './PageChats'
import SmartPagePosts from './PagePosts'
import { Card } from '@mui/material'
import '../../../css/Facebook/fbPosts.scss'
import '../../../css/Facebook/fbChats.scss'


const DumpFbPage = ({ fbPosts, fbChats, state, handleCreateMessage, fbMessages, handleSetMessage, handleChatPagination, handleCreateComment, handleSetComment, postComment }) => {
    return (
        < >
            {/* <div style={{ display: 'flex', justifyContent: 'center', height: '300px' }}>
                <img src={state?.cover} alt="cover" />
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                <Card className='fb-page-item-container' >
                    <SmartPagePosts fbPosts={fbPosts} handleCreateComment={handleCreateComment} handleSetComment={handleSetComment} postComment={postComment} />
                </Card>
                <Card className='fb-page-item-container'>
                    <SmartPageChats fbChats={fbChats} pageId={state?.pageId} handleCreateMessage={handleCreateMessage} fbMessages={fbMessages} handleSetMessage={handleSetMessage} handleChatPagination={handleChatPagination} />
                </Card>
            </div>
        </>

    )
}

export default DumpFbPage
