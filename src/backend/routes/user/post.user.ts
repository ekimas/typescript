import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../utils/request.utils'
import { createHash } from '../utils/hash.utils'
import { authorize } from '../utils/middleware.utils'
import axios from 'axios'

const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'

export default {
    method: 'post',
    path: '/api/user',
    validators: [
        authorize,
        body('email').isEmail(),
        body('password').not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: { uniqueConstraintFailed: 'Email must be unique.' },
            execute: async () => {
                const { email, name, password, companyId, eventIds } = req.body
                const passwordHash = createHash(password, SALT)

                const externalApiResponse = await axios.get(
                    'https://api.capy.lol/v1/capybara?json=true',
                    {
                        headers: {
                            authority: 'api.capy.lol',
                            accept: '*/*',
                            'accept-language': 'en-US,en;q=0.9',
                            'sec-ch-ua':
                                '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"macOS"',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'cross-site',
                            'user-agent':
                                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        },
                    },
                )

                const externalApiData = externalApiResponse.data

                const newUser = await prisma.user.create({
                    data: {
                        name,
                        email,
                        password: passwordHash,
                        company: {
                            connect: companyId ? { id: companyId } : undefined,
                        },
                        events: {
                            connect: eventIds
                                ? eventIds.map((eventId: number) => ({
                                      id: eventId,
                                  }))
                                : [],
                        },
                    },
                })

                return { ...newUser, externalData: externalApiData }
            },
        }),
} as TRoute
