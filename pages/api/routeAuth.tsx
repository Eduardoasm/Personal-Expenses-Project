import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from "../../utils/connectDb"
import UserModel from "../../models/models"
import User from "../../models/models"
import passport from 'passport'
import passportMiddleware from ".././middlewares/passport"

const routeAuth = (passport.authenticate('jwt'), async (req: NextApiRequest,res: NextApiResponse) => {
    
    await connectMongo()
    passport.initialize()
    passport.use(passportMiddleware)

    const { method } = req

    if(method === 'GET'){
        res.send("succes") 
    }
    
})

export default routeAuth