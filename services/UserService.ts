import { auth0UserToUser, User } from "../models/User";
import DynamoDAO from "./DynamoDAO";

const client = DynamoDAO;

export const getUser = async (id: string) => {
    const user = new User();
    user.id = id;

    return await client.get(user);
};

export const ensureAuth0Exists = async (auth0User: any) => {
    try {
        const dbUser = await getUser(auth0User.sub);
        return dbUser;
    } catch (e) {
        return await createUser(auth0UserToUser(auth0User));
    }
};

export const createUser = async (user: User) => {
    return await client.put(user);
};

export const updateUser = async (user: User) => {
    return await client.update(user);
};
