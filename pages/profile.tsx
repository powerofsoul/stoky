import { useUser } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import { Formik, Field } from "formik";
import { NextPageContext } from "next";
import React from "react";
import { toast } from "react-toastify";
import { Button, Card, Form, Grid, Profile, Loader } from "tabler-react";
import { userValidatorSchema } from "../models/User";
import { post } from "../src/Api";
import { FormInput, FormTextarea } from "../src/components/Form/Form";
import Page from "../src/components/Page";
import ensureUseIsLogged from "../src/pageMiddleware/ensureUseIsLogged";

export async function getServerSideProps(context: NextPageContext) {
    ensureUseIsLogged(context);

    return {
        props: {},
    };
}

const component = () => {
    const { user, error, isLoading } = useUser() as any;

    if (isLoading) {
        return <Loader className="m-auto" allowFullScreen={true} />;
    }

    const onSubmit = async (values: User) => {
        await post("auth/me", values)
            .then(() => {
                toast("Profile updated", {
                    type: "success"
                })
            })
            .catch((err) => {
                toast("Something went wrong", {
                    type: "error"
                })
            });
    };

    return (
        <Page>
            <Grid.Row>
                <Grid.Col ignoreCol xs={12} sm={12} md={12} xl={4}>
                    <Profile
                        name={user?.name || ""}
                        avatarURL={user?.picture || ""}
                    >
                        {user.description}
                    </Profile>
                </Grid.Col>
                <Grid.Col ignoreCol xl={8}>
                    <Formik
                        initialValues={{
                            username: "",
                            aboutMe: "",
                            firstName: "",
                            lastName: "",
                            location: "",
                            ...user,
                        }}
                        validateOnChange={false}
                        validationSchema={userValidatorSchema}
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
                                                <Form.Label>
                                                    Display Name
                                                </Form.Label>
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
                                                <Form.Label>
                                                    First Name
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Last Name
                                                </Form.Label>
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
                                                <Form.Label>
                                                    Location
                                                </Form.Label>
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
                                    <Button
                                        type="submit"
                                        color="primary"
                                        disabled={isSubmitting}
                                    >
                                        Update Profile
                                    </Button>
                                </Card.Footer>
                            </Form>
                        )}
                    </Formik>
                </Grid.Col>
            </Grid.Row>
        </Page>
    );
};

export default component;
