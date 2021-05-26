import { User } from "../models/User";
import DynamoDAO from "./DynamoDAO";

const client = DynamoDAO;

export const getUser = async (id: string) => {
    const user = new User();
    user.id = id;

    return await client.get(user);
};

export const createUser = async (user: User) => {
    return await client.put(user);
}

export const updateUser = async (user: User) => {
    return await client.update(user);
}