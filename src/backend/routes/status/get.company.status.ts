import { Request, Response } from 'express'
import { TRoute } from '../types'
import { prisma } from '../../database'
export default {
    method: 'get',
    path: '/api/company/status',
    validators: [],
    handler: async (req: Request, res: Response) => {
        const allCompanies = await prisma.company.findMany()
        res.send(allCompanies)
    },
} as TRoute
