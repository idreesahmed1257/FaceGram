import styled from "@emotion/styled"
import { Button } from "@mui/material"
import colors from '../../css/variables.scss'

export const StyledButtonMain = styled(Button)({
    borderRadius: '10px',
    padding: '7px 20px',
    color: colors.white,
    backgroundColor: colors.primary,
    "&:hover": {
        backgroundColor: colors.flax,
        color: colors.oxfordBlue
    },

});
