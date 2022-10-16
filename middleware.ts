// import { url } from "inspector";
import { jwtVerify } from "jose"; 
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest} from "next/server";




export async function middleware(req: NextRequest )  {
    
    const jwt = req.cookies.get("myTokenName")

    // console.log("soy jwt", jwt)

        if(jwt === undefined){
            return NextResponse.redirect(new URL("/", req.url))
        }
        try { 
            const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET))
            
            // console.log("soy apayload", payload)
            return NextResponse.next()
          
        } catch (error) {
            console.log("soy error", error)
            return NextResponse.redirect(new URL("/", req.url))
        }


}


export const config = {
  matcher: ['/dashboard'],
}