import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from "../.././utils/connectDb"
import User from "../.././models/models"

type Data = {
  name: string
}



export default async function createUser( req: NextApiRequest,res: NextApiResponse) {

    await connectMongo()

    const { method } = req

    const user2 = await User.find({req.body.email})

    switch(method){
        case 'POST':
        try {
            const user = new User(req.body)
            await user.save()
            return res.status(200).json({succes: true, user})
        } catch (error) {
            return res.status(400).json({succes: false, error: 'falla del servidor'})
        }
        default: return res.status(500).json({succes: false, error: 'falla del servidor'})
    }
}