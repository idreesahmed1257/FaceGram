import { Button } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../Global/InputField";

const DumpLogin = ({ showLoader, handleAuthenticate, control, errors, handleSubmit, isValid }) => {
    const navigate = useNavigate();
    return (
        <div>
            <Button onClick={() => navigate("/")}  >
                Home
            </Button>
            <div className="auth-container">
                {showLoader && <span className="loader" />}
                <div className="auth-box" style={{ opacity: showLoader ? 0.1 : null }}>
                    <h2 className="auth-box-header">Login</h2>
                    <form className="auth-form" onSubmit={handleSubmit(handleAuthenticate)}>
                        <InputField control={control} errors={errors} name={'email'} placeHolder={'Email'} label={"Email"} type={'text'} errorName={errors?.email} />
                        <InputField control={control} errors={errors} name={'password'} placeHolder={'Password'} label={"Password"} type={'password'} errorName={errors?.password} />
                        <Button variant="contained" disabled={!isValid} className="button" type="submit">
                            Login
                        </Button>
                    </form>
                    <p className="auth-box-footer">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DumpLogin;
