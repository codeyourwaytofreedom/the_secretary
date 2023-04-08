import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from "jsonwebtoken";
import * as jose from 'jose';


export function middleware(request: NextRequest) {
  console.log("midware triggered")

  const allCookies = request.cookies.getAll()
  console.log(allCookies)


  const response = NextResponse.next()

  return response
}

