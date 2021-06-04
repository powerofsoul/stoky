import { object, string } from 'yup'
import { User } from '.prisma/client'

export const auth0UserToUser = (auth0User: any) => {
    const user: User = {
        createdAt: new Date(),
        id: auth0User.sub,
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

export const userValidatorSchema = object({
    username: string()
        .required('Required')
        .min(3, 'Too Short')
        .max(100, 'Too Long'),
    firstName: string()
        .nullable()
        .required('Required')
        .min(3, 'Too Short')
        .max(20, 'Too Long'),
    lastName: string()
        .nullable()
        .required('Required')
        .min(3, 'Too Short')
        .max(20, 'Too Long'),
    location: string().optional().max(50, 'Too Long'),
    aboutMe: string().optional().max(255, 'Too Long'),
})

export default User
