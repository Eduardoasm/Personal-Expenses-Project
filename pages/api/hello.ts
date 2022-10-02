// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from "../.././utils/connectDb"
import User from "../.././models/models"

type Data = {
  name: string
}

export default async function handler( req: NextApiRequest,res: NextApiResponse<Data>) {
  console.log("CONNECTING MONGO")
  await connectMongo();
  console.log("MONGO CONNECT")

  console.log("creatin document")
  // interface UserObj {
  //   username: string;
  //   password: string;
  //   email: string;
  // }

  const userTest = await User.create(req.body)
  res.send(userTest)
  console.log("created document")

}


