import { Request, Response} from 'express'
import {User, users} from './users'

import * as jwt from 'jsonwebtoken'
import {apiConfig} from './api-config'

export const handleAuthentication = (req: Request, resp: Response) => {
    const user: User = req.body
    console.log(user)
    if(isValid(user)){
        const dbUser = users[user.email]
        const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, 
           apiConfig.secret)
        resp.json({name: dbUser.name, email: dbUser.email, accessToken: token})
    }else{
        resp.status(403).json({message: 'Dados inválidos !!!'})
    }
} 

function isValid(user: User): boolean {
    console.log("Passou por aqui 2")
    if(!user){
        console.log("Passou por aqui 3")
        return false
    }
    console.log("Passou por aqui 4")
    const dbUser = users[user.email]
    return dbUser !== undefined && dbUser.matches(user)
}