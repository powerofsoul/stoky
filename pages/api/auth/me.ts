import { CallbackOptions } from "@auth0/nextjs-auth0/dist/auth0-session";
import { NextApiRequest, NextApiResponse } from "next";
import withErrorHandling from "../../../middleware/withErrorHandeling";
import withUser from "../../../middleware/withUser";
import { updateUser } from "../../../services/UserService";
import { userValidatorSchema } from "../../../models/User";

export default withErrorHandling(
    withUser(
        async (
            req: NextApiRequest,
            res: NextApiResponse<any>,
            options?: CallbackOptions | undefined
        ) => {
            switch (req.method) {
                case "POST":
                    await saveUser(req, res);
                default:
                    await getUser(req, res);
            }
        }
    )
);

function getUser(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(401).json({
            message: "Please authenticate.",
        });
    }
}

async function saveUser(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const user = await userValidatorSchema.validate(req.body, {
            stripUnknown: true,
        });
        const savedUser = await updateUser(
            {
                ...req.user,
                ...user,
                id: req.user?.id,
            }
        );

        res.status(200).json(savedUser);
    } catch (error) {
        res.status(400).json(error);
    }
}
