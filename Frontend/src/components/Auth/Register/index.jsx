import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DumpRegister from "./DumpRegister";
import { YupRegisterSchema, formRegisterSchema, register } from "./helper";
import { object } from 'yup';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";


const SmartRegister = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let userSchema = object(YupRegisterSchema);
    const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm(formRegisterSchema(userSchema))
    const [showLoader, setShowLoader] = useState(false);


    const handleRegister = () => {
        register(setShowLoader, dispatch, navigate, getValues())
    }

    return (
        <>
            {console.log("isValid", isValid)}
            <DumpRegister
                showLoader={showLoader}
                handleRegister={handleRegister}
                control={control}
                errors={errors}
                handleSubmit={handleSubmit}
                isValid={isValid}
            />
        </>
    );
};

export default SmartRegister;
