import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../Global/InputField';
import { StyledButtonMain } from '../../Global/styled';

const DumpRegister = ({ showLoader, handleRegister, control, errors, handleSubmit, isValid }) => {
    const navigate = useNavigate();
    return (
        <>
            <Button style={{ textAlign: 'center' }} onClick={() => navigate('/')}>Home</Button>
            <div className="auth-container">
                {showLoader && <span className="loader" />}
                <div className="auth-box" style={{ opacity: showLoader ? 0.1 : null }}>
                    <h2 className="auth-box-header">Register</h2>
                    <form className="auth-form" onSubmit={handleSubmit(handleRegister)}>
                        <InputField control={control} errors={errors} name={'userName'} placeHolder={'User Name'} label={"User Name"} type={'text'} errorName={errors?.userName} />
                        <InputField control={control} errors={errors} name={'email'} placeHolder={'Email'} label={"Email"} type={'text'} errorName={errors?.email} />
                        <InputField control={control} errors={errors} name={'password'} placeHolder={'Password'} label={"Password"} type={'password'} errorName={errors?.password} />
                        <InputField control={control} errors={errors} name={"confirmPassword"} placeHolder={'Confirm Password'} label={"Confirm Password"} type={'password'} errorName={errors?.confirmPassword} />
                        <Button variant='contained' disabled={!isValid} className="button" type="submit">
                            Register
                        </Button>
                    </form>
                    {console.log("Error in red:", errors?.userName)}
                    <p className="auth-box-footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default DumpRegister
