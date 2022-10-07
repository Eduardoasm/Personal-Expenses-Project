import { NextApiRequest, NextApiResponse } from "next"
import UserModel from "../../models/models"
import jwt from 'jsonwebtoken'
import User from "../../models/models"


function createToken(user: InstanceType<typeof UserModel>){
    return jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {
        expiresIn: 86400
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    const { method } = req

    if(method === 'POST'){
        try {
            const { email, password } = req.body
            let user = await User.findOne({ email })
            if(!user){
                res.status(400).json({msg: "no hay email creado"})
            }
            const logUser = await user.comparePassword(password)
            if(logUser){
                res.status(200).json({token: createToken(user)})
            }
            res.status(400).json({succes: false, error: 'la contraseña no coincide'})
        } catch (error) {
            
        }
    }
}