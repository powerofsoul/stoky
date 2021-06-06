import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { sha256 } from 'js-sha256'
import DynamoDAO from '../services/DynamoDAO'
import { Cache } from '../models/Cache'
import { CACHE_DURATION } from '../src/Consts'

interface Props {
    includeUser: boolean
    cacheDuration: number
    caseSensitive: boolean
}

const defaultProps = {
    includeUser: false,
    cacheDuration: CACHE_DURATION,
    caseSensitive: false,
}

export const getCachedValue = async (inputKey: string, props?: Partial<Props>) => {
    const propsWithDefault = {
        ...defaultProps,
        ...props,
    } as Props

    const keyString = propsWithDefault.caseSensitive ? inputKey.toLowerCase() : inputKey
    const key = sha256(keyString)

    try {
        const cachedValue = await DynamoDAO.get(Object.assign(new Cache(), { key }))

        const { addedOn } = cachedValue

        if (new Date().getTime() - addedOn.getTime() <= propsWithDefault.cacheDuration) {
            return cachedValue
        }
    } catch {
        /* Cache not found */
    }

    return undefined
}

export const setCacheValue = async (inputKey: string, status: any, data: any, props?: Partial<Props>) => {
    const propsWithDefault = {
        ...defaultProps,
        ...props,
    } as Props

    const keyString = propsWithDefault.caseSensitive ? inputKey.toLowerCase() : inputKey
    const key = sha256(keyString)

    await DynamoDAO.put(
        Object.assign(new Cache(), {
            key,
            data: JSON.stringify(data),
            status,
            addedOn: new Date(),
        })
    )
}

const withCache =
    (handler: NextApiHandler, props?: Partial<Props>) => async (req: NextApiRequest, res: NextApiResponse) => {
        const propsWithDefault = {
            ...defaultProps,
            ...props,
        } as Props

        const body = JSON.stringify(req.body)
        const query = JSON.stringify(req.query)
        const path = req.url

        const keyString = propsWithDefault.includeUser ? body + query + path + req.user?.id : body + query + path

        const cachedValue = await getCachedValue(keyString, props)

        if (cachedValue) {
            res.status(cachedValue.status).json(JSON.parse(cachedValue.data))
            return
        }

        const oldSend = res.send
        const validData = (data: any) => {
            if (data === null) return false
            if (data.constructor === Array && data.length === 0) return false
            if (data.constructor === Object && Object.keys(data).length === 0) {
                return false
            }

            return true
        }

        res.send = function (data: any) {
            if (validData(data)) {
                setCacheValue(keyString, this.status, data)
            }

            return oldSend.apply(res, [data])
        }

        return handler(req, res)
    }

export default withCache
