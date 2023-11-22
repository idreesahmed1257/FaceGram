import styled from '@emotion/styled';
import colors from '../../../../css/variables.scss'
import { Badge } from '@mui/material';

export const FbBadge = styled(Badge)({
    "& .MuiBadge-badge": {
        backgroundColor: colors.primary,
        color: colors.white,
        "&:hover": {
            backgroundColor: colors.flax,
            color: colors.oxfordBlue
        },
    },
    "& .MuiSvgIcon-root": {
        color: colors.oxfordBlue,
    }



});
