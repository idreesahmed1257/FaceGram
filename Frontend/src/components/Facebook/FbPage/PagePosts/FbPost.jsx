import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { AutoGraph, ExpandMore, Favorite, Groups3 } from '@mui/icons-material';
import { handleName } from '../../../Global/helpers/Parsers';
import FbPostMedia from './FbPostMedia';
import FbPostComments from './FbPostComments';
import { ExpandComments } from './helper';
import { FbBadge } from './styled';

const FbPost = ({ post, postComment, handleCreateComment, handleSetComment }) => {

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card sx={{ width: 400 }}>
            <CardHeader
                avatar={
                    <Avatar src={post?.from?.picture} >
                        {handleName(post?.from?.name)}
                    </Avatar>
                }
                title={post?.from?.name}
                subheader={post?.created_time}
            />
            <FbPostMedia post={post} />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post?.message}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }} >
                <FbBadge badgeContent={post?.likes}>
                    <Favorite color="action" />
                </FbBadge>
                <FbBadge badgeContent={post?.post_engaged_users}>
                    <Groups3 />
                </FbBadge>
                <FbBadge badgeContent={post?.post_impressions}>
                    <AutoGraph />
                </FbBadge>
                {/* <Typography>Engagement : {post?.post_engaged_users}</Typography> */}
                <ExpandComments
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <FbBadge badgeContent={post?.comments?.length} color="primary">
                        <ExpandMore color="action" />
                    </FbBadge>
                </ExpandComments>
            </CardActions>

            <FbPostComments expanded={expanded} post={post} comments={post?.comments} handleSetComment={handleSetComment} handleCreateComment={handleCreateComment} postComment={postComment} />
            <Divider />
        </Card>
    );
}


export default FbPost;