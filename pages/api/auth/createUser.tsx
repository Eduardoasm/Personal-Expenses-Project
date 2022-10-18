import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from "../../../utils/connectDb"
import UserModel from "../../../models/models"
import User from "../../../models/models"


export default async function createUser( req: NextApiRequest,res: NextApiResponse){

    
    await connectMongo()

    const { method } = req


     if(method === 'POST'){
            try {
            const { email, password, username } = req.body
            let user = await User.findOne({ email })
            if(user){
                res.status(500).json({msg: `$(email) already exists`})
            }
            user = new User({ email, password, username })
            await user.save()
            return res.status(200).json({succes: true, user})
        } catch (error) {
            console.log(error)
            return res.status(400).json({succes: false, error: 'falla del servidor'})
        }
    }
}