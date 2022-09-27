
import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";

type TokenProps ={
  id: string
  iat: number
  exp: number
}


export function AuthMiddlwares(request: Request, response:Response, next: NextFunction){

 
  const {authorization} = request.headers || "";

  if(!authorization){
    return response.status(401).json({message: "Token not provider"})
  }

  const [,token] = authorization.split(" ")

  //const payload = decode(token);
 

  try {
    const decode = verify(token, String(process.env.TOKEN_JWT))
    const { id }  = decode as TokenProps;

    request.userId = id

    next()
  } catch (error) {
    return response.status(401).json({message: "Token not provider"})
  }

}