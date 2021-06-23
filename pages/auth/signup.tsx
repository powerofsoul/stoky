import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { Form, Card, Button, Grid } from 'tabler-react'
import { Field, Formik } from 'formik'
import { toast } from 'react-toastify'
import { getUserFromRequest } from '../../middleware/withUser'
import Page from '../../src/components/Page'
import { FormInput } from '../../src/components/Form/Form'
import SignUpValidator from '../../validators/SignUpValidator'
import { post } from '../../src/Api'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req, res } = context
    const user = await getUserFromRequest(req, res)

    return {
        props: {
            user,
        },
    }
}

const SignUp = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    }

    const onSubmit = async (data: typeof initialValues) => {
        try {
            const response = await post<any, any>('auth/signup', data)

            toast(response.message, {
                type: response.success ? 'success' : 'error',
            })
        } catch (err) {
            toast('Something went wrong', {
                type: 'error',
            })
        }
    }

    return (
        <Page user={user}>
            <Formik
                initialValues={initialValues}
                validateOnChange={false}
                validationSchema={SignUpValidator}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ errors, isSubmitting, handleSubmit }) => (
                    <Form className="card" onSubmit={handleSubmit}>
                        <Card.Body>
                            <Card.Title>Sign up</Card.Title>
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
                            <Grid.Row>
                                <Grid.Col ignoreCol sm={12}>
                                    <Form.Group>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Field
                                            component={FormInput}
                                            type="password"
                                            error={errors.confirmPassword}
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                        />
                                    </Form.Group>
                                </Grid.Col>
                            </Grid.Row>
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <Button type="submit" color="primary" disabled={isSubmitting}>
                                Sign Up
                            </Button>
                        </Card.Footer>
                    </Form>
                )}
            </Formik>
            <small>
                You already have an account? Log in <a href="/auth/login">here</a>
            </small>
        </Page>
    )
}

export default SignUp
