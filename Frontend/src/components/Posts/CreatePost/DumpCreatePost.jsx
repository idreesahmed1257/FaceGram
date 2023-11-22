import { Button, Container, FormControl, FormHelperText, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const DumpCreatePost = ({ showLoader, handleCreatePost, state, control, errors, isValid, isDirty, handleSubmit }) => {
    return (
        <div className="create-post-container">
            {showLoader && <span className="loader"></span>}
            <Container maxWidth="sm" style={{ opacity: showLoader ? 0.1 : null }}>
                <h2>Create a New Post</h2>
                <form className="create-post-form" onSubmit={handleSubmit(handleCreatePost)}>
                    <Controller
                        name={'title'}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <FormControl
                                error={errors?.title}
                                fullWidth >
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    onChange={onChange}
                                    value={value}
                                />
                                <FormHelperText>{errors?.title?.message}</FormHelperText>
                            </FormControl>

                        )}
                    />
                    <Controller
                        name={'content'}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <FormControl
                                error={errors?.content}
                                fullWidth >
                                <TextField
                                    label="Content"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required
                                    value={value}
                                    margin="normal"
                                    onChange={onChange}
                                />
                                <FormHelperText>{errors?.content?.message}</FormHelperText>
                            </FormControl>

                        )}
                    />
                    <Button disabled={!isValid || !isDirty} variant="contained" type="submit" color="primary">
                        {state ? "Update Post" : "Create Post"}
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default DumpCreatePost
