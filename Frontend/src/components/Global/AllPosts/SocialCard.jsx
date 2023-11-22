import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  IconButton,
  OutlinedInput,
  ToggleButton,
  Typography
} from "@mui/material";
import { ModeComment, Favorite, Share } from "@mui/icons-material";
import colors from '../../../css/variables.scss'
import "../../../css/Home/socialCard.scss"
import SocialDropdown from "./SocialDropdown";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../../assets/variables";
import { handleDate, handleName, handleNameUpperCase } from "../helpers/Parsers";
import { useSelector } from "react-redux";
import { StyledButtonMain } from "../styled";

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <ToggleButton value=''  {...other} />;
})(({ theme }) => ({
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

const SocialCard = ({ postData, deletePost, handlePostLike, handlePostComment, userComment, handleCommentChange }) => {

  const user = useSelector(state => state.user)
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded)
  };

  const handleCreateComment = (e) => {
    e.preventDefault();
    handlePostComment(postData?._id)
  }

  const handleDeletePost = () => {
    deletePost(postData?._id)
  }

  const handleEditPost = () => {
    navigate('/createPost', { state: { postId: postData?._id, title: postData?.title, content: postData?.content } })
  }

  const handleIsLiked = () => {
    return postData?.likes?.find(like => like.user?._id === user?.myUser?._id)
  };

  const checkComment = (commentItem) => {
    return userComment.postId === postData?._id ? commentItem : ''
  }

  const checkCommentLoader = (commentItem) => {
    return userComment.postId === postData?._id ? commentItem : false
  }

  const handleShareButton = (postUserId) => {
    return user?.myUser?._id === postUserId ? false : true
  }


  return (
    <>
      <Card className="s-card">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: colors.primary }} src={user && `${IMAGE_URL}${postData?.user?.userProfile}`} aria-label="recipe">
              {handleName(postData?.user?.userName)}
            </Avatar>
          }
          action={
            handleShareButton(postData?.user?._id) ?
              <IconButton>
                <Share />
              </IconButton>
              :
              <SocialDropdown handleDeletePost={handleDeletePost} handleEditPost={handleEditPost} />
          }
          title={handleNameUpperCase(postData?.user?.userName)}
          subheader={handleDate(postData?.createdAt)}
        />
        <CardContent >
          <Typography fontStyle={'bolder'} variant="body1" color="text.secondary">
            {postData?.title}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {postData?.content}
          </Typography>
        </CardContent>
        <CardActions >
          <ToggleButton
            value="check"
            style={{ color: handleIsLiked(user?.myUser?._id) ? colors.primary : colors.black }}
            onChange={() => {
              handlePostLike(postData?._id)
            }}
          >
            <Favorite />
            {postData?.likes?.length}
          </ToggleButton>
          <ExpandMore
            expand={expanded}
            onClick={() => handleExpandClick(postData?.comments?.length)}
            aria-expanded={expanded}
          >
            <ModeComment style={{ color: postData?.comments?.length > 0 ? colors.primary : colors.black }} />
            {postData?.comments?.length}
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {postData?.comments?.map((comment, index) => (
              <Box key={index} display={'flex'} gap={'1rem'} alignItems={'center'}>
                <Avatar src={comment?.user?.userProfile && `${IMAGE_URL}${comment?.user?.userProfile}`} sx={{ bgcolor: colors.purpleColor, width: 24, height: 24, fontSize: '12px' }}>
                  {handleName(comment?.user?.userName)}
                </Avatar>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography style={{ color: 'blueviolet' }}>{handleNameUpperCase(comment?.user?.userName)}</Typography>
                  <Typography fontSize={'12px'}>{comment?.comment}</Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
          <form onSubmit={handleCreateComment} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1rem 1rem' }}>
            <Avatar src={user?.myUser?.userProfile && `${IMAGE_URL}${user?.myUser?.userProfile}`} sx={{ bgcolor: colors.purpleColor }}>
              {handleName(postData?.user?.userName)}
            </Avatar>
            <OutlinedInput required onChange={(e) => handleCommentChange(e.target.value, postData?._id)} placeholder="your thoughts ..." value={checkComment(userComment.comment)} size="small" style={{ width: '100%' }} />

            <Box sx={{ position: 'relative' }}>
              <Button
                variant="contained"
                disabled={checkCommentLoader(userComment.loader)}
                type="submit"
              >
                Post
              </Button>
              {checkComment(userComment.loader) && (
                <CircularProgress
                  size={20}
                  sx={{
                    position: 'absolute',
                    top: '25%',
                    left: '35%',
                  }}
                />
              )}
            </Box>
          </form>
        </Collapse>
      </Card>
    </>
  );
}

export default SocialCard
