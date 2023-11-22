import React, { useContext, useEffect, useState } from "react";
import "../../../css/Home/createPost.scss";
import { useLocation, useNavigate } from "react-router-dom";
import DumpCreatePost from "./DumpCreatePost";
import { createPost } from "./helper";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";


const SmartCreatePost = () => {
    const navigate = useNavigate();
    const { state } = useLocation()
    const [showLoader, setShowLoader] = useState(false)

    const user = useSelector(state => state.user)



    let userSchema = object({
        title: string().required(),
        content: string().required(),
    });

    const { control, handleSubmit, formState: { errors, isValid, isDirty }, getValues, setValue } = useForm({
        resolver: yupResolver(userSchema),
        mode: 'onChange',
        defaultValues: {
            title: state?.title || '',
            content: state?.content || '',
        }
    })


    const handleCreatePost = () => {
        const postData = getValues();
        console.log(postData);
        createPost(setShowLoader, state, postData, navigate, user)
    }

    return (
        <>
            <DumpCreatePost
                showLoader={showLoader}
                handleCreatePost={handleCreatePost}
                state={state}
                handleSubmit={handleSubmit}
                control={control}
                errors={errors}
                isValid={isValid}
                isDirty={isDirty}
            />
        </>
    );
};

export default SmartCreatePost;
