import styled from "@emotion/styled"
import { getAllPagePostsService } from "../../../../services/facebook"
import { ErrorToaster, SuccessToaster } from "../../../Global/MyToaster"
import { IconButton } from "@mui/material"

export const getFbPagePosts = async (pageId, pageToken, setfbPosts) => {
    try {
        let res = await getAllPagePostsService(pageId, pageToken)
        if (res?.code === 200) {
            SuccessToaster(res?.message)
            setfbPosts(res?.data?.data)
            console.log("Response of pages", res?.data)
        }
        else {
            ErrorToaster(res.message || "Failed to get the Page");
        }
    }
    catch (err) {
        ErrorToaster(err.message)
    }
}

export const ExpandComments = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',

}));
