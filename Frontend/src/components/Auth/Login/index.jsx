import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { YupLoginSchema, authenticate, formLoginSchema } from "./helper";
import DumpLogin from "./DumpLogin";
import { object } from 'yup';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
const SmartLogin = () => {

    const dispatch = useDispatch()

    let userSchema = object(YupLoginSchema);

    const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm(formLoginSchema(userSchema))

    const [showLoader, setShowLoader] = useState(false)
    const navigate = useNavigate()

    const handleAuthenticate = () => {
        authenticate(setShowLoader, dispatch, navigate, getValues())
    }
    return (
        <>
            <DumpLogin
                showLoader={showLoader}
                handleAuthenticate={handleAuthenticate}
                control={control}
                errors={errors}
                handleSubmit={handleSubmit}
                isValid={isValid}
            />
        </>

    )
}

export default SmartLogin;