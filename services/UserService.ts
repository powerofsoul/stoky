import { User } from "../models/User";
import DynamoDAO from "./DynamoDAO";

const client = DynamoDAO;

export const getUser = async (email: string) => {
    const user = new User();
    user.email = email;

    return await client.get(user);
};

export const ensureUserExists = async (user: User) => {
    try {
        const dbUser = await getUser(user.email);
        return dbUser;
    } catch (e) {
        return await createUser(user);
    }
}

export const createUser = async (user: User) => {
    return await client.put(user);
}

export const updateUser = async (user: User) => {
    return await client.update(user);
}
