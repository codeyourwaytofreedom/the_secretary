import { NextApiResponse } from "next";

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


interface ResponseWithCookies extends NextApiResponse {
  cookies: any;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.cookies.set("xxx","yyy")

  return response;
}


export const config = {
  matcher: '/',
}