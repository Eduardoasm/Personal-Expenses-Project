import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectDb";
import { verify } from 'jsonwebtoken'
import User from "../../../models/models";
import { jwtVerify } from "jose"
import { NextRequest } from "next/server";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    await connectMongo()

    const { method } = req
    const { myTokenName } = req.cookies
    const { add } = req.body
    const { amountSubtract } = req.body

    interface idUser{
        id: string
    }

    if(!myTokenName){
        return res.status(401).json({msg: "no hay token"})
    }
    
    const user = verify(myTokenName, process.env.JWT_SECRET) as idUser

    console.log(user.id)

    if(method === 'POST'){
        console.log("soy balance", add)
        try {
            const suma = await User.findByIdAndUpdate(user.id, {
                 $inc: {balance: -add}
            }
              );

        console.log(suma)
        res.status(200).json({msg: "se sumo"})
            
        } catch (error) {
        res.status(400).json({msg: "no se sumo"})
        console.log(error)
        }

    }

}