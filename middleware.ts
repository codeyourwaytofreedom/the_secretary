import { NextApiResponse } from "next";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from "jsonwebtoken";
import * as jose from 'jose';


export async function middleware(request: NextRequest, response: NextResponse) {
  console.log("middleware triggered")
  const allCookies = request.cookies.getAll();
  const tokenCookie = allCookies.find(cookie => cookie.name === 'token');
  if (request.url.startsWith("/test")) {
    if (tokenCookie) {
      const jwt = tokenCookie.value;
      const secret = new TextEncoder().encode('skjvwrwr834745');
      try {
        await jose.jwtVerify(jwt, secret);
        response.headers.set('Authorization', `Bearer ${tokenCookie}`);
        return response;
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    return NextResponse.next();
  }
}



export const config = {
  matcher: '/test/:path*',
}