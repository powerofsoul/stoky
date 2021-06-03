import { auth0UserToUser } from "../models/User";
import DynamoDAO from "./DynamoDAO";
import SqlDAO from "../services/SqlDAO";
import { User } from "@prisma/client";

const client = DynamoDAO;

export const getUser = async (props: Partial<User>) => {
    const user = await SqlDAO.user.findFirst({
        where: {
            ...props
        }
    })

    return user;
};

export const ensureAuth0Exists = async (auth0User: any) => {
    try {
        const dbUser = await getUser({id: auth0User.sub});
        return dbUser;
    } catch (e) {
        return await createUser(auth0UserToUser(auth0User));
    }
};

export const createUser = async (user: User) => {
    return await SqlDAO.user.create({
        data: user
    });
};

export const updateUser = async (user: Partial<User>) => {
    return await SqlDAO.user.update({
        where: {
            id: user.id
        },
        data: user
    })
};
