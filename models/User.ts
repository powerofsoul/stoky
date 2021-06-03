import { User } from ".prisma/client";
import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";
import { object, string, array, number } from "yup";


export const auth0UserToUser = (auth0User: any) => {
    const user: User = {
        createdAt: new Date(),
        id: auth0User.sub,
        email: auth0User.email,
        username: auth0User.nickname,
        picture: auth0User.picture,
        firstName: auth0User.firstName,
        lastName: auth0User.lastName,
        aboutMe: "",
        location: ""
    }

    return user;
};

export const userValidatorSchema = object({
    username: string()
        .required("Required")
        .min(3, "Too Short")
        .max(100, "Too Long"),
    firstName: string()
        .required("Required")
        .min(3, "Too Short")
        .max(20, "Too Long"),
    lastName: string()
        .required("Required")
        .min(3, "Too Short")
        .max(20, "Too Long"),
    location: string().optional().max(50, "Too Long"),
    aboutMe: string().optional().max(255, "Too Long"),
});
