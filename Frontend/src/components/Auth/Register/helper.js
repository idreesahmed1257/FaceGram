import { SaveDataToLocalStorage } from "../../Global/helpers/SaveDataToLocalStorage";
import { ErrorToaster, SuccessToaster } from "../../Global/MyToaster";
import { ref, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerService } from "../../../services/auth";
import { logIn } from "../../../redux/auth/actions/index";
import { setUser } from "../../../redux/user/actions/index";

export const YupRegisterSchema = {
    userName: string().matches(/^[A-Za-z ]*$/, 'Username must have only Alphabets').min(6).required(),
    email: string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email must be valid').required(),
    password: string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/, "Password must contain at least 8 characters, one uppercase, one lowercase and one number").required(),
    confirmPassword: string().oneOf([ref('password')], 'Passwords must match').required()
}

export const formRegisterSchema = (userSchema) => {
    return {
        resolver: yupResolver(userSchema),
        mode: 'onChange',
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
}

export const register = async (setShowLoader, dispatch, navigate, registerData) => {

    setShowLoader(true);
    const { confirmPassword, ...restData } = registerData;
    try {
        let res = await registerService(restData);
        if (res?.code === 200) {
            SuccessToaster(res.message);
            dispatch(logIn());
            dispatch(setUser(res?.data?.data));
            console.log("res?.data?", res?.data);
            SaveDataToLocalStorage(res?.data?.data.token, res?.data?.data);
            navigate("/");
        }
        else {
            ErrorToaster(res.message || 'Registration failed');
        }
        setShowLoader(false);

    } catch (err) {
        ErrorToaster(err?.message);
        setShowLoader(false);
    }

};