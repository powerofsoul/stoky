import { User } from '@prisma/client'
import { Field, Formik } from 'formik'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { toast } from 'react-toastify'
import { Button, Card, Form, Grid } from 'tabler-react'
import { getUserFromRequest } from '../middleware/withUser'
import SqlDAO from '../services/SqlDAO'
import { post } from '../src/Api'
import { FormInput, FormTextarea } from '../src/components/Form/Form'
import Page from '../src/components/Page'
import Profile from '../src/components/Profile'
import ensureUseIsLogged from '../src/pageMiddleware/ensureUseIsLogged'
import UserValidator from '../validators/UserValidator'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    ensureUseIsLogged(context)

    const user = await getUserFromRequest(context.req, context.res)

    const followers = (
        await SqlDAO.followers.findMany({
            where: {
                followerId: user?.id,
            },
            select: {
                follower: {
                    select: {
                        picture: true,
                        username: true,
                    },
                },
            },
        })
    )?.map((f) => f.follower)

    return {
        props: {
            user,
            followers,
        },
    }
}

const component = ({ user, followers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const onSubmit = async (values: User) => {
        await post('auth/me', values)
            .then(() => {
                toast('Profile updated', {
                    type: 'success',
                })
            })
            .catch((err) => {
                toast('Something went wrong', {
                    type: 'error',
                })
            })
    }

    if (!user) {
        window.location.href = '/'
        return
    }

    return (
        <Page user={user}>
            <Grid.Row>
                <Grid.Col ignoreCol xs={12} sm={12} md={12} xl={4}>
                    <Profile user={user} followers={followers} />
                </Grid.Col>
                <Grid.Col ignoreCol xl={8}>
                    <Formik
                        initialValues={{
                            username: '',
                            aboutMe: '',
                            firstName: '',
                            lastName: '',
                            location: '',
                            ...user,
                        }}
                        validateOnChange={false}
                        validationSchema={UserValidator}
                        onSubmit={onSubmit}
                        enableReinitialize
                    >
                        {({ errors, isSubmitting, handleSubmit }) => (
                            <Form className="card" onSubmit={handleSubmit}>
                                <Card.Body>
                                    <Card.Title>Edit Profile</Card.Title>
                                    <Grid.Row>
                                        <Grid.Col ignoreCol sm={12}>
                                            <Form.Group>
                                                <Form.Label>Display Name</Form.Label>
                                                <Field
                                                    component={FormInput}
                                                    type="text"
                                                    error={errors.username}
                                                    name="username"
                                                    placeholder="Username"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col ignoreCol sm={12} lg={6}>
                                            <Form.Group>
                                                <Form.Label>First Name</Form.Label>
                                                <Field
                                                    component={FormInput}
                                                    type="text"
                                                    error={errors.firstName}
                                                    name="firstName"
                                                    placeholder="First Name"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col ignoreCol sm={12} lg={6}>
                                            <Form.Group>
                                                <Form.Label>Last Name</Form.Label>
                                                <Field
                                                    component={FormInput}
                                                    type="text"
                                                    name="lastName"
                                                    error={errors.lastName}
                                                    placeholder="Last Name"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col ignoreCol lg={12}>
                                            <Form.Group>
                                                <Form.Label>Location</Form.Label>
                                                <Field
                                                    component={FormInput}
                                                    type="text"
                                                    name="location"
                                                    error={errors.location}
                                                    placeholder="Location"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col ignoreCol lg={12}>
                                            <Form.Group>
                                                <Field
                                                    component={FormTextarea}
                                                    className="mb=0"
                                                    name="aboutMe"
                                                    label="About Me"
                                                    error={errors.aboutMe}
                                                    rows={5}
                                                    placeholder="Here can be your description"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                    </Grid.Row>
                                </Card.Body>
                                <Card.Footer className="text-right">
                                    <Button type="submit" color="primary" disabled={isSubmitting}>
                                        Update Profile
                                    </Button>
                                </Card.Footer>
                            </Form>
                        )}
                    </Formik>
                </Grid.Col>
            </Grid.Row>
        </Page>
    )
}

export default component
