import React, { useContext, useState } from "react";
import "../../../css/updateProfile.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';


import DumpUpdateProfile from "./DumpUpdateProfile";
import { YupUpdateUserSchema, callUpdateApi, formUpdateUserSchema, pictureUpload, setPicture } from "./helper";
import { useDispatch, useSelector } from "react-redux";


const SmartUpdateProfile = () => {
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()
    const [profilePicture, setProfilePicture] = useState()
    const [showLoader, setShowLoader] = useState(false)


    let userSchema = object(YupUpdateUserSchema);

    const { register, control, handleSubmit, formState: { errors, isValid, isDirty }, getValues, setValue } = useForm(formUpdateUserSchema(userSchema, user))

    const handlePictureUpload = (e) => {
        setValue("userProfile", e.target.files[0], { shouldDirty: true })
        pictureUpload(e, setProfilePicture)
    }

    const handleProfilePicture = () => {
        return setPicture(profilePicture, user)
    }
    const submitForm = (d) => {
        const updatedValues = getValues();
        callUpdateApi(setShowLoader, user, dispatch, updatedValues);
    }


    return (
        <>
            <DumpUpdateProfile
                showLoader={showLoader}
                user={user}
                submitForm={submitForm}
                handlePictureUpload={handlePictureUpload}
                handleProfilePicture={handleProfilePicture}
                handleSubmit={handleSubmit}
                control={control}
                errors={errors}
                isValid={isValid}
                isDirty={isDirty}
                register={register}
            />
        </>

    );
};

export default SmartUpdateProfile;
