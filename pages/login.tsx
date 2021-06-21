import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { Form, Card, Button, Grid } from 'tabler-react'
import { Field, Formik } from 'formik'
import { toast } from 'react-toastify'
import { getUserFromRequest } from '../middleware/withUser'
import Page from '../src/components/Page'
import { FormInput } from '../src/components/Form/Form'
import LoginValidator from '../validators/LoginValidator'
import { post } from '../src/Api'
import ApiResponse from '../models/ApiResponse'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req, res } = context
    const user = await getUserFromRequest(req, res)

    return {
        props: {
            user,
        },
    }
}

const Login = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const initialValues = {
        email: '',
        password: '',
    }

    const onSubmit = async (body: typeof initialValues) => {
        const response = await post<ApiResponse, typeof initialValues>('auth/login', body)
        toast(response.message, {
            type: response.success ? 'success' : 'error',
        })

        if (response.success) {
            window.location.href = '/'
        }
    }

    return (
        <Page user={user}>
            <Formik
                initialValues={initialValues}
                validateOnChange={false}
                validationSchema={LoginValidator}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ errors, isSubmitting, handleSubmit }) => (
                    <Form className="card" onSubmit={handleSubmit}>
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            <Grid.Row>
                                <Grid.Col ignoreCol sm={12}>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Field
                                            component={FormInput}
                                            type="text"
                                            error={errors.email}
                                            name="email"
                                            placeholder="Email"
                                        />
                                    </Form.Group>
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col ignoreCol sm={12}>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Field
                                            component={FormInput}
                                            type="password"
                                            error={errors.password}
                                            name="password"
                                            placeholder="Password"
                                        />
                                    </Form.Group>
                                </Grid.Col>
                            </Grid.Row>
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <Button type="submit" color="primary" disabled={isSubmitting}>
                                Login
                            </Button>
                        </Card.Footer>
                    </Form>
                )}
            </Formik>
            <small>
                You don&apos;t have an account yet? Sign up <a href="/signup">here</a>
            </small>
        </Page>
    )
}

export default Login
