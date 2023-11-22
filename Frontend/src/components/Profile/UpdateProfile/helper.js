import { SaveDataToLocalStorage } from "../../Global/helpers/SaveDataToLocalStorage"
import { IMAGE_URL } from "../../../assets/variables"
import { ErrorToaster, SuccessToaster } from "../../Global/MyToaster"
import { setUser } from "../../../redux/user/actions/index"
import { string } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { updateService } from "../../../services/auth"


export const YupUpdateUserSchema = {
    userName: string().matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Username must have only Alphabets and cannot end with space').required(),
}

export const formUpdateUserSchema = (userSchema, user) => {
    return {
        resolver: yupResolver(userSchema),
        mode: 'onChange',
        defaultValues: {
            userName: user?.myUser?.userName,
            userProfile: user?.myUser?.userProfile
        }
    }
}
export const setPicture = (profilePicture, user) => {
    if (profilePicture) {
        return profilePicture
    }
    else if (user?.myUser?.userProfile) {
        return `${IMAGE_URL}${user?.myUser?.userProfile}`
    }
}


export const pictureUpload = (event, setProfilePicture) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setProfilePicture(e.target.result);
        };
        reader.readAsDataURL(file);
    }
};


export const callUpdateApi = async (setShowLoader, user, dispatch, updatedValues) => {
    try {
        setShowLoader(true)
        let formData = new FormData();
        formData.append('userId', user?.myUser?._id);
        formData.append('userName', updatedValues.userName);
        formData.append('userProfile', updatedValues.userProfile);
        let res = await updateService(formData)
        if (res?.code === 200) {
            SuccessToaster(res?.message)
            SaveDataToLocalStorage(null, res.data?.data)
            dispatch(setUser(res?.data?.data))
        }
        else {
            ErrorToaster(res.message || 'Failed to Update the User');
        }
        setShowLoader(false);
    }
    catch (err) {
        ErrorToaster(err.message)
        setShowLoader(false)
    }
}
