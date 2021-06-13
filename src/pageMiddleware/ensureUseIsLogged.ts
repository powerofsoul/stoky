import { NextPageContext, NextApiResponse, GetServerSidePropsContext } from 'next'
import { getUserFromRequest } from '../../middleware/withUser'

export const redirectToLogin = (res: any) => {
    res?.writeHead(302, {
        Location: '/',
    })
    res?.end()
}

const ensureUseIsLogged = async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx

    const user = await getUserFromRequest(req, res)
    if (!user) {
        redirectToLogin(res)
    }
}

export default ensureUseIsLogged
