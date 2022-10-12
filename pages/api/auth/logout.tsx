import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../utils/connectDb";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default async function handle(req: NextApiRequest, res:NextApiResponse){
    await connectDb ()

    const { method } = req
    const { myTokenName } = req.cookies

    if(method === 'POST'){
        try {
            if(!myTokenName){
                res.status(401).json("no hay token")
            }
        
            const clearCookie = serialize('myTokenName', null, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 0,
                path: "/"
            })
        
            res.setHeader('Set-Cookie', clearCookie)
            res.status(200).json({msg: "logout succesfully"})
        }
         catch (error) {
            console.log(error)
            res.status(401).json({msg: "no token"})
        }
}
}