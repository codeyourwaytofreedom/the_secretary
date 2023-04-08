import { NextApiResponse } from "next";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from "jsonwebtoken";
import * as jose from 'jose';


export async function middleware(request: NextRequest,response:NextResponse) {
   response = NextResponse.next();
  const allCookies = request.cookies.getAll();
  const tokenCookie = allCookies.find(cookie => cookie.name === 'token');
  if (tokenCookie) {
/*     const jwt = tokenCookie.value;
    console.log(jwt) */
    const secret = new TextEncoder().encode(
      'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const jwt =
      'eyJhbGciOiJIUzI1NiJ9.eyJ1cm46ZXhhbXBsZTpjbGFpbSI6dHJ1ZSwiaWF0IjoxNjY5MDU2MjMxLCJpc3MiOiJ1cm46ZXhhbXBsZTppc3N1ZXIiLCJhdWQiOiJ1cm46ZXhhbXBsZTphdWRpZW5jZSJ9.C4iSlLfAUMBq--wnC6VqD9gEOhwpRZpoRarE0m7KEnI'
    
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret)
    
    console.log(protectedHeader)
    console.log(payload)
    console.log("found")
    response.headers.set('Authorization', `Bearer ${tokenCookie}`);
  }
  else{
    console.log("not found")
  }
  return response;
}

