import { decodeJWTToken, JWTActions } from './JWTService'
import SqlDAO from './SqlDAO'

export async function executeToken(token: string) {
    if (!token) return ''

    try {
        const tokenObj = await decodeJWTToken(token)
        if (!tokenObj) {
            return 'Invalid token'
        }

        const action = tokenObj.action as JWTActions

        switch (action) {
            case 'SIGNUP':
                return activateUser(tokenObj.email)
            default:
                return ''
        }
    } catch {
        return ''
    }
}

async function activateUser(email: string) {
    try {
        await SqlDAO.user.update({
            where: {
                email,
            },
            data: {
                activated: true,
            },
        })

        return 'Account activated'
    } catch {
        return ''
    }
}
