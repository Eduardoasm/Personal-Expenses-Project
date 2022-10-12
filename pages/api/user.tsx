import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from '../../utils/connectDb';
import { verify } from 'jsonwebtoken'


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    await connectMongo()

    const { method } = req
    const { myTokenName } = req.cookies

    if(!myTokenName){
        return res.status(401).json({msg: "no hay token"})
    }

    if(method === 'GET'){
        const user = verify(myTokenName, process.env.JWT_SECRET)
        console.log(user)

        return res.status(200).json({msg: "usuario papa"})
    }
}