import { authorize } from '../utils/middleware.utils'
import { body } from 'express-validator'
import { handleRequest } from '../utils/request.utils'
import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { prisma } from '../../database'
import { TRoute } from '../types'

export default {
    method: 'post',
    path: '/api/company',
    validators: [authorize, body('name').not().isEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: {
                uniqueConstraintFailed: 'Name of the company has to be unique.',
            },
            execute: async () => {
                const { name } = req.body
                return prisma.company.create({
                    data: {
                        name,
                    },
                })
            },
        }),
} as TRoute
