import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from "jsonwebtoken";
import * as jose from 'jose';


export async function middleware(request: NextRequest) {

  const user_token = request.cookies.get('token')
  const jwt = user_token?.value;
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET,
  )
  try {
    await jose.jwtVerify((jwt as string), secret);
    console.log("jwt valid")
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next()
  return response
}

export const config = {
  matcher: '/test/:path*',
}