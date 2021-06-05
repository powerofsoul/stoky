/* eslint import/no-mutable-exports: "off" */

import { Prisma, PrismaClient } from '@prisma/client'

// On local everything is reinitialized due to hot reloading. This means we create unnecessary connections to db
let SqlDAO: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>

if (process.env.NODE_ENV === 'production') {
    SqlDAO = new PrismaClient()
} else {
    if (!global.SqlDAO) {
        global.SqlDAO = new PrismaClient()
    }
    SqlDAO = global.SqlDAO
}

export default SqlDAO
