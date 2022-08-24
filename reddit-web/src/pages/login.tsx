import React from "react";
import { Formik, Form } from "formik"
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

const Login: React.FC<{}> = ({ }) => {
    const router = useRouter()
    const [, login] = useLoginMutation()
    return (
        <>
            <Wrapper variant="small">
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await login(values) // actually { options: values } idk why this one works
                        if (response.data?.login.errors) {
                            setErrors(toErrorMap(response.data.login.errors))
                        } else if (response.data?.login.user) {
                            router.push("/")
                        }
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
                            <Button type='submit' mt={4} isLoading={isSubmitting}>Login</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    )
}

export default Login