import { object, string } from 'yup'
import { User } from '.prisma/client'

export const auth0UserToUser = (auth0User: any) => {
    const user: User = {
        id: 0,
        createdAt: new Date(),
        auth0Id: auth0User.sub,
        email: auth0User.email,
        username: auth0User.nickname,
        picture: auth0User.picture,
        firstName: auth0User.firstName,
        lastName: auth0User.lastName,
        aboutMe: '',
        location: '',
    }

    return user
}

export default User
