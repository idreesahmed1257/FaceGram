import { CardMedia } from '@mui/material'
import React from 'react'

const FbPostMedia = ({ post }) => {
    return (
        <div>
            {post?.media?.type === 'photo' &&
                <CardMedia
                    component="img"
                    height="194"
                    image={post?.media?.src}
                    alt="Paella dish"
                />
            }
            {post?.media?.type === 'video' &&
                <CardMedia
                    component="video"
                    height="194"
                    src={post?.media?.src}
                    autoPlay
                    muted
                    controls
                />
            }
            {post?.media?.type === 'album' &&
                <>
                    {
                        post.media.src.map((image, index) => {
                            return (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    height="194"
                                    image={image.src}
                                    alt="Paella dish"
                                />
                            )
                        })
                    }
                </>
            }
        </div>
    )
}

export default FbPostMedia
