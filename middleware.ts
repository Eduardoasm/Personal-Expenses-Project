import { url } from "inspector";
import { jwtVerify } from "jose"; 
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest} from "next/server";




export async function middleware(req: NextRequest, res: NextResponse)  {
    
    const jwt = req.cookies.get("myTokenName")

        if(jwt === undefined){
            return NextResponse.redirect(new URL("/", req.url))
        }

        try {
            const { payload } = await jwtVerify(jwt, new TextEncoder().encode("myTokenName"))
            
            console.log(payload)
            return NextResponse.next()
          
        } catch (error) {
            console.log(error)
            return NextResponse.redirect(new URL("/", req.url))
        }

}


export const config = {
  matcher: ['/dashboard'],
}