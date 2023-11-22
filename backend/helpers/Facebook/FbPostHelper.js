const dayjs = require("dayjs");

const fbPostParser = (posts) => {
    let parsedPosts = [];
    posts.forEach(post => {
        let parsedPost = {
            id: post.id,
            message: post.message,
            full_picture: post.full_picture, //will remove later
            likes: post.likes?.data?.length,
            comments: post?.comments?.data,
            post_impressions: post.insights?.data[0]?.values[0]?.value,
            post_engaged_users: post.insights?.data[1]?.values[0]?.value,
            from: {
                id: post.from?.id,
                name: post.from?.name,
                picture: post.from?.picture?.data?.url
            },
            created_time: dayjs(post.created_time).format("DD MMM YYYY"),
            media: mediaParser(post?.attachments?.data[0])

        }
        parsedPosts.push(parsedPost);
    });
    return parsedPosts;
}

var counter = 0;
const mediaParser = (media) => {
    if (media?.media_type === "photo") {
        return {
            type: 'photo',
            src: media?.media?.image?.src
        }
    }
    else if (media?.media_type === "video") {
        return {
            type: `video`,
            src: media?.media?.source
        }
    }
    else if (media?.media_type === "album") {
        return {
            type: `album`,
            src: media?.subattachments?.data?.map(media => mediaParser(media))
        }
    }
    else {
        return {
            type: `other`,
            src: media?.media?.image?.src
        }
    }

    counter++;
}



module.exports = {
    fbPostParser,
}