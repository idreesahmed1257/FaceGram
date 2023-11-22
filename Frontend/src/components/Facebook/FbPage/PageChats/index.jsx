import React, { memo } from 'react'
import FbChatAccordion from './FbChatAccordion'

const SmartPageChats = ({ fbChats, pageId, handleCreateMessage, fbMessages, handleSetMessage, handleChatPagination }) => {
    return (
        <div>
            {fbChats?.map((chat, i) => (
                <FbChatAccordion key={i} chat={chat} pageId={pageId} handleCreateMessage={handleCreateMessage} fbMessages={fbMessages} handleSetMessage={handleSetMessage} handleChatPagination={handleChatPagination} />
            ))}
        </div>
    )
}

export default memo(SmartPageChats)
