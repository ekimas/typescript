import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { authorize } from '../utils/middleware.utils'
import { handleRequest } from '../utils/request.utils'
import { StatusCodes } from 'http-status-codes'
import { TRoute } from '../types'

const prisma = new PrismaClient()

export default {
    method: 'put',
    path: '/api/user',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: { uniqueConstraintFailed: 'You need a permission' },
            execute: async () => {
                try {
                    const { name, email, companyId } = req.body
                    const { id } = req.query
                    const userId = parseInt(id as string, 10)

                    if (!name && !email && !companyId) {
                        return res
                            .status(400)
                            .send('At least one field is required')
                    } else {
                        return prisma.user.update({
                            where: {
                                id: userId,
                            },
                            data: {
                                name,
                                email,
                                company: companyId
                                    ? {
                                          connect: { id: companyId },
                                      }
                                    : undefined,
                            },
                        })
                    }
                } catch (e) {
                    return res
                        .status(500)
                        .json({ error: 'Failed to update user' })
                }
            },
        }),
} as TRoute
