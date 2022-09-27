import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { prisma } from "../utils/prisma";



export class AuthController {


 async authenticate(request: Request, response: Response){
  const {email, password} = request.body

  const result = await prisma.user.findFirst({
    where: {
        email: email
    }, 
    
  })  

  if(!result){
    return response.status(400).json({message: "Email ou password incorreto"})
  }
  const isValuePassword = await compare(password, result.password )

  if(!isValuePassword){
    return response.status(400).json({message: "Email ou password incorreto"})
  }

  const token = sign({id: result.id}, String(process.env.TOKEN_JWT), {
    expiresIn: "1h",
   // subject: result.id,
  })

  const user = {
    id: result.id,
    name: result.name,
    email: result.email,
    createdAt: result.createdAt
  }
    return response.status(201).json({user, token})
 }
}