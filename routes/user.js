import {Router} from 'express'
import { createUser, deleteUser, getAllUser, getOneUser, updateUser } from '../controllers/user.js'


const routerUser = Router()
routerUser.get('/', getAllUser)
routerUser.post('/', createUser)
routerUser.get('/:id', getOneUser)
routerUser.delete('/:id', deleteUser)
routerUser.put('/:id', updateUser)


export default routerUser