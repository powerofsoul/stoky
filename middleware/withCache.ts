import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { sha256 } from "js-sha256";
import DynamoDAO from "../services/DynamoDAO";
import { Cache } from "../models/Cache";
import { CACHE_DURATION } from "../src/Consts";

interface Props {
    includeUser?: boolean;
    cacheDuration?: number;
}

const defaultProps = {
    includeUser: false,
    cacheDuration: CACHE_DURATION,
};

const withCache = (handler: NextApiHandler, props?: Props) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const propsWithDefault = {
            ...defaultProps,
            ...props,
        };

        const body = JSON.stringify(req.body);
        const query = JSON.stringify(req.query);
        const path = req.url;

        const key = propsWithDefault.includeUser
            ? sha256(body + query + path + req.user?.id)
            : sha256(body + query + path);

        try {
            const cachedValue = await DynamoDAO.get(
                Object.assign(new Cache(), { key })
            );

            const addedOn = cachedValue.addedOn;

            if (
                new Date().getTime() - addedOn.getTime() <=
                propsWithDefault.cacheDuration
            ) {
                res.status(cachedValue.status).json(
                    JSON.parse(cachedValue.data)
                );
                return;
            }
        } catch {
            /* Cache not found */
        }

        const oldSend = res.send;
        const validData = (data: any) => {
            if (data == null) return false;
            if (data.constructor == Array && data.length == 0) return false;
            if (data.constructor == Object && Object.keys(data).length == 0) {
                return false;
            }

            return true;
        };

        res.send = function (data: any) {
            if (validData(data)) {
                DynamoDAO.put(
                    Object.assign(new Cache(), {
                        key,
                        data: JSON.stringify(data),
                        status: this.statusCode,
                        addedOn: new Date(),
                    })
                );
            }

            return oldSend.apply(res, [data]);
        };

        return handler(req, res);
    };
};

export default withCache;
