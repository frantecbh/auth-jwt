import {Router} from 'express'
import { AuthController } from './controller/AuthController'
import { UserController } from './controller/UserController'
import { AuthMiddlwares } from './middlewares/auth'
 
const userController = new UserController()

const authController = new AuthController()


export const router = Router()


router.post("/user", userController.create)
router.get("/user", AuthMiddlwares, userController.index)

//autenticação
router.post("/singin", authController.authenticate)



