import { NextApiRequest, NextApiResponse } from "next";
import conectarDB from "../../../utils/connectDb";
import { verify } from 'jsonwebtoken'
import User from "../../../models/models"





export default async function handlerUser(req: NextApiRequest, res: NextApiResponse) {

    await conectarDB();

    const { method } = req
    const { myTokenName } = req.cookies

    interface idUser{
        id: string
    }

    const user = verify(myTokenName, process.env.JWT_SECRET) as idUser

    if(method === 'GET'){
        try {
            const user1 = await User.findById(user.id, {
                password: 0
            })
            
            console.log("soy user1", user1)
            res.status(200).send(user1)
            
        } catch (error) {
            console.log(error)
            res.status(400).json({msg: "info usuario no ha sido enviada"})
        }
    }
} 