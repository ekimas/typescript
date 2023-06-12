import { Request, Response } from 'express'
import { TRoute } from '../types'
import { prisma } from '../../database'
export default {
    method: 'get',
    path: '/api/user',
    validators: [],
    handler: async (req: Request, res: Response) => {
        const { id } = req.query
        const userId = parseInt(id as string, 10)

        const allUsers = await prisma.user.findFirst({
            where: { id: userId },
        })
        res.send(allUsers)
    },
} as TRoute
