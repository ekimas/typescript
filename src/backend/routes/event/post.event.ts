import { authorize } from '../utils/middleware.utils'
import { body } from 'express-validator'
import { handleRequest } from '../utils/request.utils'
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { prisma } from '../../database'
import { TRoute } from '../types'

export default {
    method: 'post',
    path: '/api/event',
    validators: [authorize, body('name').not().isEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: {
                uniqueConstraintFailed: 'Name of the event has to be unique.',
            },
            execute: async () => {
                const { name, weather, location, date, userIds } = req.body
                return prisma.event.create({
                    data: {
                        name,
                        weather,
                        location,
                        date,
                        users: {
                            connect: userIds.map((userId: number) => ({
                                id: userId,
                            })),
                        },
                    },
                })
            },
        }),
} as TRoute
