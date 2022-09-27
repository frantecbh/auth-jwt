import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../utils/prisma";



export class UserController {
  async index(request: Request, response: Response){

    const users = await prisma.user.findMany({
      select:{
        id: true,
        name: true,
        email:true,
        createdAt: true
      }
    })

    return response.status(200).json(users)
  }
 

 async create(request: Request, response: Response){
  const {name, email, password} = request.body

  const emalAlreadyExists = await prisma.user.findFirst({
    where: {
        email: email
    }
  }) 

  if(emalAlreadyExists){
    return response.status(400).json({message: "E-mail ja existe"})
  }

  const passwordHash = await hash(password, 8)


    const user = await prisma.user.create({
      data:{
        name,
        email,
        password: passwordHash
      },
      select:{
        id: true,
        name: true,
        email:true,
        createdAt: true
      }
    })

    return response.status(201).json(user)
 }
}