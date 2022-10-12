import { NextApiRequest, NextApiResponse } from "next"
import UserModel from "../../../models/models"
import jwt from 'jsonwebtoken'
import User from '../../../models/models'
import connectMongo from "../../../utils/connectDb"
import { serialize } from 'cookie'


// function createToken(user: InstanceType<typeof UserModel>){
//     const refreshToken = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {
//         expiresIn: 86400
//     })

    


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    await connectMongo()

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
            const refreshToken = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {
                expiresIn: 86400})
                const serialized = serialize('myTokenName', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 86400,
                    path: "/"
                })

                res.setHeader('Set-Cookie', serialized)
                return res.status(200).json({succes: true, token: refreshToken})
            }
            res.status(400).json({succes: false, error: 'la contraseña no coincide'})
      
        } catch (error) {
                console.log(error)
        }
    }
}