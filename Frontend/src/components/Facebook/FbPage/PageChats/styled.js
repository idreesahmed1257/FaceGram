import styled from "@emotion/styled";
import { Chip } from "@mui/material";

export const FbChatChip = styled(Chip)({
    padding: '7px 5px',
    maxWidth: '300px',
    overflowWrap: 'break-word',
    height: 'auto',
    '& .MuiChip-label': {
        display: 'block',
        whiteSpace: 'normal',
    }
})