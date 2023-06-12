import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { authorize } from '../utils/middleware.utils'
import { handleRequest } from '../utils/request.utils'
import { StatusCodes } from 'http-status-codes'
import { TRoute } from '../types'

const prisma = new PrismaClient()

export default {
    method: 'delete',
    path: '/api/user',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: { uniqueConstraintFailed: 'You need a permission' },
            execute: async () => {
                //const id = parseInt(req.query.id as , 10)
                const { id } = req.query
                const userId = parseInt(id as string, 10)

                return prisma.user.delete({
                    where: {
                        id: userId,
                    },
                })
            },
        }),
} as TRoute
