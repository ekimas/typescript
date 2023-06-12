import express from 'express'
import getUserStatus from './status/get.user.status'
import getCompaniesStatus from './status/get.company.status'
import postUser from './user/post.user'
import loginUser from './user/login.user'
import deleteUser from './user/delete.user'
import getUser from './user/get.user'
import updateUser from './user/update.user'
import postCompany from './company/post.company'
import postEvent from './event/post.event'

const router = express.Router()
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
const apiRoutes = [
    getCompaniesStatus,
    getUserStatus,
    postUser,
    loginUser,
    deleteUser,
    getUser,
    updateUser,
    postEvent,
    postCompany,
]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)
export default router
