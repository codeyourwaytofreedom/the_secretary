import { NextApiResponse } from "next";

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';



export function middleware(request: NextRequest) {
    console.log("hello middleware");
  return NextResponse.next();
}

/* export const config = {
  matcher: '/about/:path*',
} */