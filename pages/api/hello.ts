// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from "../.././utils/connectDb"
import User from "../.././models/models"



export default async function handler( req: NextApiRequest, res: NextApiResponse) {

  await connectMongo()

    const { method } = req
    
    if(method === 'POST'){
      try {
        
      } catch (error) {
        
      }
    }

}


