import { errorParser } from "../components/Auth/Login/helper";
import { privateAxiosInstance, publicAxiosInstance } from "../utils/http";

export const loginService = async LoginData => {
  let response = {
    code: 400,
    message: "Network Problem"
  };
  try {
    console.log("response in service", LoginData);
    let res = await publicAxiosInstance.post(`login`, LoginData);
    console.log("response in service", res);
    if (res) {
      response = {
        code: res?.status,
        message: res?.data?.message,
        data: res?.data
      };
    }
    return response;
  } catch (err) {
    console.log("Error in service", err);
    response = errorParser(err?.response?.data);
    return response;
  }
};


export const registerService = async registerData => {
  let response = {
    code: 400,
    message: "Network Problem"
  };
  try {
    let res = await publicAxiosInstance.post(`register`, registerData);
    console.log("response in service", res);
    if (res) {
      response = {
        code: res?.status,
        message: res?.data?.message,
        data: res?.data
      };
    }
    return response;
  } catch (err) {
    response = errorParser(err?.response?.data);
    return response;
  }
};

export const updateService = async formData => {
  let response = {
    code: 400,
    message: "Network Problem"
  };
  try {
    let res = await privateAxiosInstance.put(`updateUser`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    console.log("response in service", res);
    if (res) {
      response = {
        code: res?.status,
        message: res?.data?.message,
        data: res?.data
      };
    }
    return response;
  } catch (err) {
    console.log("Error in service update", err);
    response = errorParser(err?.response?.data);
    return response;
  }
}



