import { SaveDataToLocalStorage } from "../../Global/helpers/SaveDataToLocalStorage";
import { ErrorToaster, SuccessToaster } from "../../Global/MyToaster";
import { loginService } from "../../../services/auth";
import { string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { setUser } from "../../../redux/user/actions/index";
import { logIn } from "../../../redux/auth/actions";

export const YupLoginSchema = {
  email: string().matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email must be valid')
    .required(),
  password: string().required(),
}

export const formLoginSchema = (userSchema) => {
  return {
    resolver: yupResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  }
}

export const authenticate = async (
  setShowLoader,
  dispatch,
  navigate,
  LoginData,
) => {
  setShowLoader(true);
  try {
    let res = await loginService(LoginData);
    if (res?.code === 200) {
      SuccessToaster(res.message);
      dispatch(logIn());
      dispatch(setUser(res?.data?.data));
      SaveDataToLocalStorage(res?.data?.data.token, res?.data?.data);
      window.location.href = "/";
      // navigate("/");
    }
    else {
      ErrorToaster(res.message || 'Login failed');
    }

    setShowLoader(false);
  } catch (err) {
    ErrorToaster(err?.message);
    setShowLoader(false);
  }
};


export const errorParser = (err) => {
  if (err?.code === 401 || err?.code === 500) {
    return {
      code: err?.code || 400,
      message: err?.message || ""
    };
  }
  else {
    return {
      code: 404,
      message: err?.message || 'Network Error'
    };
  }
}