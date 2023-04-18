// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from './mongodb';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import console from 'console';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    console.log(decodedToken)

  } catch (jwt_verf_error) {
    console.log(jwt_verf_error)
  }
  
  res.status(200).json({ result:"will display appointments found" });
}