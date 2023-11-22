import { setFbUser } from "../../../redux/user/actions"
import { createFacebookUserService, getAllPagesService, getFacebookProfileService } from "../../../services/facebook"
import { ErrorToaster, SuccessToaster } from "../../Global/MyToaster"

export const createFacebookUser = async (userId, dispatch, faceBookData, setfbProfile) => {
    try {
        let res = await createFacebookUserService(userId, faceBookData)
        if (res?.code === 200) {
            SuccessToaster(res?.message)
            console.log("res?.data?.data", res?.data?.data)
            localStorage.setItem("fbUser", JSON.stringify(res?.data?.data?.user))
            dispatch(setFbUser(res?.data?.data?.user))
            setfbProfile({
                fbProfileData: res?.data?.data?.user,
                fbPages: res?.data?.data?.pages
            })
        }
        else {
            ErrorToaster(res.message || 'Failed to authenticate user with facebook');
        }
    }
    catch (err) {
        ErrorToaster(err.message)
    }
}

export const getFbProfile = async (userId, setfbProfile, dispatch) => {
    try {
        let res = await getFacebookProfileService(userId)
        if (res?.code === 200) {
            SuccessToaster(res?.message)
            console.log("res?.data?.data", res?.data?.data)
            localStorage.setItem("fbUser", JSON.stringify(res?.data?.data?.user))
            setfbProfile({
                fbProfileData: res?.data?.data?.user,
                fbPages: res?.data?.data?.pages
            })
            dispatch(setFbUser(res?.data?.data?.user))
        }
        else {
            ErrorToaster(res.message || "Failed to get the User's Facebook Profile");
        }

    }
    catch (err) {
        ErrorToaster(err.message)

    }
}

export const getAllPages = async (userId, setfbPages) => {
    try {
        let res = await getAllPagesService(userId)
        if (res?.code === 200) {
            SuccessToaster(res?.message)
            console.log("Response of pages", res?.data?.data)
            setfbPages(res?.data?.data)
        }
        else {
            ErrorToaster(res.message || "Failed to get the User's Facebook Profile");
        }

    }
    catch (err) {
        ErrorToaster(err.message)

    }
}