import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from "../.././utils/connectDb"
import User from "../.././models/models"
import mongoose from 'mongoose'
import UserModel from "../.././models/models"

type Data = {
  name: string
}

interface userCreate extends mongoose.Document{
    email: string;
    password: string
}


export default async function createUser( req: NextApiRequest,res: NextApiResponse) {

    await connectMongo()

    const { method } = req

    // switch(method){
    //     case 'POST':
     if(method === 'POST'){
            try {
            const { email, password } = req.body
            // const user2 = await User.findOne({email: req.body.email})
            let userFind = await User.findOne({ email })
            if(userFind){
                res.status(500).json({msg: `$(email) already exists`})
            }
            const user = new User({email, password})
            await user.save()
            return res.status(200).json({succes: true, user})
        } catch (error) {
            return res.status(400).json({succes: false, error: 'falla del servidor'})
        }
    }
}