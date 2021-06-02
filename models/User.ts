import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";
import { object, string, array, number } from "yup";

@table("user")
export class User {
    @hashKey({
        type: "String",
    })
    id!: string;

    @attribute({
        type: "String",
    })
    username!: string;

    @attribute({
        type: "String",
    })
    firstName!: string;

    @attribute({
        type: "String",
    })
    lastName!: string;

    @attribute({
        type: "String",
    })
    picture!: string;

    @attribute({
        type: "String",
    })
    aboutMe!: string;

    @attribute({
        type: "String",
    })
    location!: string;

    @attribute({
        type: "Date",
        defaultProvider: () => new Date(),
    })
    createdAt!: Date;
}

export const auth0UserToUser = (auth0User: any) => {
    const user = new User();
    user.createdAt = new Date();
    user.id = auth0User.sub;
    user.username = auth0User.nickname;
    user.picture = auth0User.picture;
    user.firstName = auth0User.firstName;
    user.lastName = auth0User.lastName;

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
