import React from "react";
import { Formik, Form, setErrors } from "formik"
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";

interface registerProps { }

const REGISTER_MUT = `
mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`

const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useMutation(REGISTER_MUT)
    return (
        <>
            <Wrapper variant="small">
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await register(values)
                        // if (response.data?.register.errors) {
                        //     setErrors({
                        //         username: "uwu"
                        //     })
                        // }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="username"
                                placeholder="Enter your username"
                                label="Username"
                            />
                            <Box mt="4">
                                <InputField
                                    name="password"
                                    placeholder="Enter your password"
                                    label="Password"
                                    type="password"
                                />
                            </Box>
                            <Button type='submit' mt={4} isLoading={isSubmitting}>Register</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    )
}

export default Register