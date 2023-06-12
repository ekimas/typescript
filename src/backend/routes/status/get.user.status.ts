import { Request, Response } from 'express'
import { TRoute } from '../types'
import { prisma } from '../../database'
export default {
    method: 'get',
    path: '/api/user/status',
    validators: [],
    handler: async (req: Request, res: Response) => {
        const allUsers = await prisma.user.findMany()
        res.send(allUsers)
    },
} as TRoute
