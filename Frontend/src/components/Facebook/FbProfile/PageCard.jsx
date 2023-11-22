import { Avatar } from '@mui/material'
import React from 'react'
import '../../../css/Facebook/fbProfile.scss'
import colors from "../../../css/variables.scss"
import { handleName } from '../../Global/helpers/Parsers'
const PageCard = ({ page, handlePage, index }) => {
    return (
        <div className='fbPageCard' onClick={() => handlePage(page?.id, page?.access_token, page?.cover?.source)} >
            <Avatar alt="User Picture"
                src={page?.picture?.data?.url}
                className="avatar" sx={{ bgcolor: colors.vanilla, width: 60, height: 60, fontSize: '60px' }}>
                {handleName(page?.name)}
            </Avatar>
            <div style={{ maxWidth: '290px', overflowWrap: 'break-word' }}>
                <h4>{page?.name}</h4>
                <p>{page?.about}</p>
            </div>
        </div>

    )
}

export default PageCard
