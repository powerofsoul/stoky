import { User } from '@prisma/client'
import { auth0UserToUser } from '../models/User'
import SqlDAO from '../services/SqlDAO'

export const getUser = async (props: Partial<User>) => {
    const user = await SqlDAO.user.findFirst({
        where: {
            ...props,
        },
    })

    return user
}

export const createUser = async (user: User) =>
    SqlDAO.user.create({
        data: user,
    })

export const updateUser = async (user: Partial<User>) =>
    SqlDAO.user.update({
        where: {
            id: user.id,
        },
        data: user,
    })

export const ensureAuth0Exists = async (auth0User: any) => {
    try {
        const dbUser = await getUser({ id: auth0User.sub })
        if (dbUser != null) {
            return dbUser
        }
    } catch (e) {
        console.log('[UserService][GetUser] Something went wrong getting the user')
    }

    return createUser(auth0UserToUser(auth0User))
}
