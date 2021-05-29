import Page from "../src/components/Page";
import React from "react";
import { Avatar, Button, Card, Form, Grid, Media, Profile } from "tabler-react";
import { useUser } from "@auth0/nextjs-auth0";
import ensureUseIsLogged from "../src/pageMiddleware/ensureUseIsLogged";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
    ensureUseIsLogged(context);

    return {
        props: {}
    };
}

const component = () => {
    const {user, error, isLoading} = useUser() as any;

    if(isLoading) {
        return <div>Loading</div>
    }

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
                    <Form className="card">
                        <Card.Body>
                            <Card.Title>Edit Profile</Card.Title>
                            <Grid.Row>
                                <Grid.Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Company</Form.Label>
                                        <Form.Input
                                            type="text"
                                            disabled
                                            placeholder="Company"
                                            value="Creative Code Inc."
                                            onChange={() => null}
                                        />
                                    </Form.Group>
                                </Grid.Col>
                                <Grid.Col ignoreCol sm={12} lg={3}>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Input
                                            type="text"
                                            placeholder="Username"
                                            value="michael23"
                                            onChange={() => null}
                                        />
                                    </Form.Group>
                                </Grid.Col>
                                <Grid.Col ignoreCol sm={12} lg={4}>
                                    <Form.Group>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Input
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </Form.Group>
                                </Grid.Col>
                                <Grid.Col ignoreCol sm={12} lg={6}>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Input
                                            type="text"
                                            placeholder="First Name"
                                            value="Chet"
                                            onChange={() => null}
                                        />
                                    </Form.Group>
                                </Grid.Col>
                                <Grid.Col ignoreCol sm={12} lg={6}>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Input
                                            type="text"
                                            placeholder="Last Name"
                                            value="Faker"
                                            onChange={() => null}
                                        />
                                    </Form.Group>
                                </Grid.Col>
                                <Grid.Col ignoreCol lg={12}>
                                    <Form.Group>
                                        <Form.Label>Address</Form.Label>
                                        <Form.Input
                                            type="text"
                                            placeholder="Home Address"
                                            value="Melbourne, Australia"
                                            onChange={() => null}
                                        />
                                    </Form.Group>
                                </Grid.Col>
                                <Grid.Col ignoreCol sm={12} lg={4}>
                                    <Form.Group>
                                        <Form.Label>City</Form.Label>
                                        <Form.Input
                                            type="text"
                                            placeholder="City"
                                            value="Melbourne"
                                            onChange={() => null}
                                        />
                                    </Form.Group>
                                </Grid.Col>
                                <Grid.Col ignoreCol sm={6} lg={3}>
                                    <Form.Group>
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Input
                                            type="number"
                                            placeholder="ZIP Code"
                                        />
                                    </Form.Group>
                                </Grid.Col>
                                <Grid.Col ignoreCol lg={5}>
                                    <Form.Group>
                                        <Form.Label>Country</Form.Label>
                                        <Form.Select>
                                            <option>Germany</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Grid.Col>
                                <Grid.Col ignoreCol lg={12}>
                                    <Form.Group
                                        className="mb=0"
                                        label="About Me"
                                    >
                                        <Form.Textarea
                                            rows={5}
                                            placeholder="Here can be your description"
                                            onChange={() => null}
                                        >
                                            Oh so, your weak rhyme You doubt
                                            I'll bother, reading into it I'll
                                            probably won't, left to my own
                                            devices But that's the difference in
                                            our opinions.
                                        </Form.Textarea>
                                    </Form.Group>
                                </Grid.Col>
                            </Grid.Row>
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <Button type="submit" color="primary">
                                Update Profile
                            </Button>
                        </Card.Footer>
                    </Form>
                </Grid.Col>
            </Grid.Row>
        </Page>
    );
};

export default component;
