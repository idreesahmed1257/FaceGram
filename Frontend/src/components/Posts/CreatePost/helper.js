import { createPostService, updatePostService } from "../../../services/post";
import { ErrorToaster, SuccessToaster } from "../../Global/MyToaster";

export const createPost = async (
  setShowLoader,
  state,
  postData,
  navigate,
  user
) => {
  setShowLoader(true);
  var post;
  try {
    if (state) {
      post = await updatePostService(state, postData);
      navigate("/profile");
    } else {
      post = await createPostService(postData, user);
      navigate("/");
    }
    if (post?.code === 200) {
      SuccessToaster(post?.message);
    } else {
      ErrorToaster(post?.message || "Post failed");
    }
    setShowLoader(false);
  } catch (err) {
    ErrorToaster(err?.message);
    setShowLoader(false);
  }
};
